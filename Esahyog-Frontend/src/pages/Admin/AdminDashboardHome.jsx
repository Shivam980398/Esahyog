import { useCallback, useEffect, useState } from "react";
import { UserPlus, AlertCircle } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard.jsx";
import AddOfficerModal from "../../components/admin/AddOfficerModal.jsx";
import { adminApi } from "../../services/adminApi.js";

function AdminDashboardHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState({
    summary: [],
    prioritySummary: [],
    overdue: [],
    overdueCount: 0,
    activeServices: 0,
  });

  const fetchStats = useCallback(async () => {
    try {
      const json = await adminApi.getComplaintStats();

      setData({
        summary: json.summary || [],
        prioritySummary: json.prioritySummary || [],
        overdue: json.overdue || [],
        overdueCount: json.overdueCount || 0,
        activeServices: json.activeServices || 0,
      });
    } catch (e) {
      console.error("Stats Error", e);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(fetchStats, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchStats]);

  const getStatusCount = (status) => {
    return data.summary?.find((item) => item._id === status)?.count || 0;
  };

  const getPriorityCount = (priority) => {
    return (
      data.prioritySummary?.find((item) => item._id === priority)?.count || 0
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">System Overview</h2>

          <p className="text-sm text-slate-500">
            Global monitoring and staff management
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-medium text-sm"
        >
          <UserPlus size={18} />
          Add Officer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Pending"
          value={getStatusCount("Pending")}
          badgeColor="bg-amber-100 text-amber-600"
          change="New"
        />

        <StatsCard
          title="Active Services"
          value={data.activeServices || 0}
          badgeColor="bg-blue-100 text-blue-600"
          change="In Progress"
        />

        <StatsCard
          title="Resolved"
          value={getStatusCount("Resolved")}
          badgeColor="bg-emerald-100 text-emerald-600"
          change="Completed"
        />

        <StatsCard
          title="Critical"
          value={getPriorityCount("critical")}
          badgeColor="bg-rose-100 text-rose-600"
          change="Active"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <AlertCircle className="text-rose-500" size={18} />

          <div>
            <h3 className="font-bold text-slate-700">Delayed Resolutions</h3>

            <p className="text-xs text-slate-500 mt-0.5">
              Complaints that have remained unresolved for more than 5 days.
            </p>
          </div>

          <span className="ml-auto px-2.5 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold">
            {data.overdueCount ?? data.overdue?.length ?? 0}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 text-left text-slate-500">
                <th className="px-6 py-3 font-semibold uppercase text-[10px]">
                  Citizen
                </th>

                <th className="px-6 py-3 font-semibold uppercase text-[10px]">
                  Dept
                </th>

                <th className="px-6 py-3 font-semibold uppercase text-[10px]">
                  Assigned Officer
                </th>

                <th className="px-6 py-3 font-semibold uppercase text-[10px]">
                  Created
                </th>

                <th className="px-6 py-3 font-semibold uppercase text-[10px]">
                  Priority
                </th>
              </tr>
            </thead>

            <tbody>
              {data.overdue.length > 0 ? (
                data.overdue.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="border-t border-slate-100 hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {complaint.citizen?.fullName || "Unknown"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">
                        {complaint.department}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {complaint.assignedOfficer?.fullName || "Unassigned"}
                    </td>

                    <td className="px-6 py-4 text-rose-500 text-xs font-bold">
                      {complaint.createdAt
                        ? new Date(complaint.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          complaint.priority === "critical"
                            ? "bg-rose-100 text-rose-600"
                            : complaint.priority === "high"
                              ? "bg-orange-100 text-orange-600"
                              : complaint.priority === "medium"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {complaint.priority || "medium"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No delayed complaints.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddOfficerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchStats}
      />
    </div>
  );
}

export default AdminDashboardHome;
