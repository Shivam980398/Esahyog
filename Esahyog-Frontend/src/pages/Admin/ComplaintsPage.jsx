import React, { useEffect, useMemo, useState } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Download,
  RefreshCw,
  Search,
  UserCheck,
  XCircle,
} from "lucide-react";

import StatsCard from "../../components/admin/StatsCard";
import { adminApi } from "../../services/adminApi";

const COMPLAINT_STATUSES = [
  "Pending",
  "Accepted",
  "Scheduled",
  "On the Way",
  "Inter-Dept Forwarded",
  "Resolved",
  "Rejected",
];

const PRIORITIES = ["low", "medium", "high", "critical"];

function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [officersLoading, setOfficersLoading] = useState(false);

  const [departmentFilter, setDepartmentFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [searchText, setSearchText] = useState("");

  const [selectedOfficer, setSelectedOfficer] = useState({});

  const [updatingComplaint, setUpdatingComplaint] = useState({});

  const fetchAllComplaints = async () => {
    setLoading(true);

    try {
      const result = await adminApi.getComplaints();

      if (result?.success) {
        setComplaints(result.data || []);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.error("Error fetching complaints:", err);

      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOfficers = async () => {
    setOfficersLoading(true);

    try {
      const result = await adminApi.getOfficers();

      if (result?.success) {
        setOfficers(result.data || []);
      } else {
        setOfficers([]);
      }
    } catch (err) {
      console.error("Error fetching officers:", err);

      setOfficers([]);
    } finally {
      setOfficersLoading(false);
    }
  };

  useEffect(() => {
    fetchAllComplaints();
    fetchOfficers();
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesDepartment = departmentFilter
        ? complaint.department?.toLowerCase().trim() ===
          departmentFilter.toLowerCase().trim()
        : true;

      const matchesStatus = statusFilter
        ? complaint.status?.toLowerCase().trim() ===
          statusFilter.toLowerCase().trim()
        : true;

      const searchLower = searchText.trim().toLowerCase();

      const matchesSearch = searchText.trim()
        ? complaint.title?.toLowerCase().includes(searchLower) ||
          complaint.description?.toLowerCase().includes(searchLower) ||
          complaint.citizen?.fullName?.toLowerCase().includes(searchLower) ||
          complaint._id?.toLowerCase().includes(searchLower)
        : true;

      return matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [complaints, departmentFilter, statusFilter, searchText]);

  const stats = useMemo(() => {
    return {
      pending: complaints.filter((complaint) => complaint.status === "Pending")
        .length,

      resolved: complaints.filter(
        (complaint) => complaint.status === "Resolved",
      ).length,

      critical: complaints.filter(
        (complaint) => complaint.priority?.toLowerCase() === "critical",
      ).length,
    };
  }, [complaints]);

  const getComplaintId = (complaint) => complaint?._id || complaint?.id;

  const getCitizenName = (complaint) =>
    complaint?.citizen?.fullName ||
    complaint?.citizen?.name ||
    "Unknown Citizen";

  const getOfficerName = (complaint) =>
    complaint?.assignedOfficer?.fullName ||
    complaint?.assignedOfficer?.name ||
    "Unassigned";

  const getLocationText = (complaint) => {
    if (typeof complaint?.location === "string") {
      return complaint.location;
    }

    if (complaint?.location?.address) {
      return complaint.location.address;
    }

    return "Location not provided";
  };

  const formatDate = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDepartmentOfficers = (department) => {
    if (!department) {
      return [];
    }

    return officers.filter(
      (officer) =>
        officer.department?.toLowerCase().trim() ===
        department?.toLowerCase().trim(),
    );
  };

  const setComplaintUpdating = (complaintId, value) => {
    setUpdatingComplaint((previous) => ({
      ...previous,
      [complaintId]: value,
    }));
  };

  const handleAssignOfficer = async (complaint) => {
    const complaintId = getComplaintId(complaint);

    const officerId = selectedOfficer[complaintId];

    if (!officerId) {
      alert("Please select an officer first.");
      return;
    }

    const officer = officers.find((item) => item._id === officerId);

    if (!officer) {
      alert("Selected officer not found.");
      return;
    }

    if (
      officer.department?.toLowerCase().trim() !==
      complaint.department?.toLowerCase().trim()
    ) {
      alert("Officer must belong to the complaint department.");
      return;
    }

    try {
      setComplaintUpdating(complaintId, "assign");

      const result = await adminApi.assignComplaint(complaintId, officerId);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to assign complaint.");
      }

      const updatedComplaint = result.data;

      setComplaints((previous) =>
        previous.map((item) =>
          getComplaintId(item) === complaintId ? updatedComplaint : item,
        ),
      );

      setSelectedOfficer((previous) => ({
        ...previous,
        [complaintId]: "",
      }));

      alert("Complaint assigned successfully.");
    } catch (err) {
      console.error("Complaint assignment error:", err);

      alert(err?.message || "Failed to assign complaint.");
    } finally {
      setComplaintUpdating(complaintId, false);
    }
  };

  const handlePriorityChange = async (complaint, priority) => {
    const complaintId = getComplaintId(complaint);

    const oldPriority = complaint.priority || "medium";

    if (oldPriority === priority) {
      return;
    }

    try {
      setComplaintUpdating(complaintId, "priority");

      const result = await adminApi.updateComplaintPriority(
        complaintId,
        priority,
      );

      if (!result?.success) {
        throw new Error(result?.message || "Failed to update priority.");
      }

      setComplaints((previous) =>
        previous.map((item) =>
          getComplaintId(item) === complaintId
            ? {
                ...item,
                priority: result?.data?.priority || priority,
              }
            : item,
        ),
      );
    } catch (err) {
      console.error("Priority update error:", err);

      alert(err?.message || "Failed to update priority.");
    } finally {
      setComplaintUpdating(complaintId, false);
    }
  };

  const handleStatusChange = async (complaint, status) => {
    const complaintId = getComplaintId(complaint);

    if (complaint.status === status) {
      return;
    }

    try {
      setComplaintUpdating(complaintId, "status");

      const result = await adminApi.updateComplaintStatus(complaintId, status);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to update status.");
      }

      setComplaints((previous) =>
        previous.map((item) =>
          getComplaintId(item) === complaintId
            ? {
                ...item,
                status: result?.data?.status || status,
              }
            : item,
        ),
      );
    } catch (err) {
      console.error("Status update error:", err);

      alert(err?.message || "Failed to update status.");
    } finally {
      setComplaintUpdating(complaintId, false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Complaints Management
          </h2>

          <p className="text-sm text-slate-500">
            Monitor and manage citizen grievances across all departments
          </p>
        </div>

        <button
          onClick={() => {
            fetchAllComplaints();
            fetchOfficers();
          }}
          className="p-2 hover:bg-slate-100 rounded-full transition-all active:scale-90"
          title="Refresh Data"
        >
          <RefreshCw
            className={`w-5 h-5 text-slate-600 ${
              loading ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Pending Issues"
          value={stats.pending}
          icon={<AlertTriangle className="w-5 h-5" />}
        />

        <StatsCard
          title="Resolved"
          value={stats.resolved}
          icon={<CheckCircle2 className="w-5 h-5" />}
        />

        <StatsCard
          title="Critical Priority"
          value={stats.critical}
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search complaint, citizen or ID..."
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Departments</option>

            <option value="Water">Water</option>

            <option value="Electricity">Electricity</option>

            <option value="PWD">PWD</option>

            <option value="Fire">Fire</option>

            <option value="Garbage">Garbage</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>

            {COMPLAINT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-400">
            Loading complaints...
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="p-20 text-center text-slate-400">
            No complaints found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1300px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="px-5 py-4">Citizen</th>

                  <th className="px-5 py-4">Department</th>

                  <th className="px-5 py-4">Issue</th>

                  <th className="px-5 py-4">Assigned Officer</th>

                  <th className="px-5 py-4">Priority</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredComplaints.map((complaint) => {
                  const complaintId = getComplaintId(complaint);

                  const departmentOfficers = getDepartmentOfficers(
                    complaint.department,
                  );

                  const isUpdating = Boolean(updatingComplaint[complaintId]);

                  const assignedOfficer = complaint.assignedOfficer;

                  return (
                    <tr
                      key={complaintId}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Citizen */}

                      <td className="px-5 py-4 align-top">
                        <div className="font-semibold text-slate-800 text-sm">
                          {getCitizenName(complaint)}
                        </div>

                        <div className="text-xs text-slate-400 mt-1">
                          {complaintId}
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                          {complaint.department || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top max-w-[300px]">
                        <div className="font-semibold text-slate-800 text-sm">
                          {complaint.title || "Untitled complaint"}
                        </div>

                        <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {complaint.description || "No description"}
                        </div>

                        <div className="text-xs text-slate-400 mt-2">
                          {getLocationText(complaint)}
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top min-w-[260px]">
                        {assignedOfficer ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                <UserCheck className="w-4 h-4 text-indigo-600" />
                              </div>

                              <div>
                                <div className="text-sm font-semibold text-slate-800">
                                  {getOfficerName(complaint)}
                                </div>

                                <div className="text-xs text-slate-400">
                                  {assignedOfficer.department ||
                                    complaint.department}
                                </div>
                              </div>
                            </div>

                            <div className="text-xs text-emerald-600 font-medium mt-2">
                              Assigned
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
                              <AlertTriangle className="w-4 h-4" />
                              Unassigned
                            </div>

                            <div className="flex gap-2">
                              <select
                                value={selectedOfficer[complaintId] || ""}
                                onChange={(e) =>
                                  setSelectedOfficer((previous) => ({
                                    ...previous,
                                    [complaintId]: e.target.value,
                                  }))
                                }
                                disabled={officersLoading || isUpdating}
                                className="flex-1 min-w-0 px-2.5 py-2 border border-slate-200 rounded-lg text-xs bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                                <option value="">
                                  {officersLoading
                                    ? "Loading officers..."
                                    : departmentOfficers.length === 0
                                      ? "No officers"
                                      : "Select officer"}
                                </option>

                                {departmentOfficers.map((officer) => (
                                  <option key={officer._id} value={officer._id}>
                                    {officer.fullName}
                                  </option>
                                ))}
                              </select>

                              <button
                                type="button"
                                onClick={() => handleAssignOfficer(complaint)}
                                disabled={
                                  !selectedOfficer[complaintId] || isUpdating
                                }
                                className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                              >
                                {updatingComplaint[complaintId] === "assign"
                                  ? "..."
                                  : "Assign"}
                              </button>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* ------------------------------------------------
                            PRIORITY
                        ------------------------------------------------- */}

                      <td className="px-5 py-4 align-top">
                        <div className="relative inline-block">
                          <select
                            value={complaint.priority || "medium"}
                            onChange={(e) =>
                              handlePriorityChange(complaint, e.target.value)
                            }
                            disabled={isUpdating}
                            className={`appearance-none pr-8 pl-3 py-2 rounded-lg border text-xs font-bold uppercase outline-none cursor-pointer ${
                              complaint.priority?.toLowerCase() === "critical"
                                ? "bg-rose-50 border-rose-200 text-rose-700"
                                : complaint.priority?.toLowerCase() === "high"
                                  ? "bg-orange-50 border-orange-200 text-orange-700"
                                  : complaint.priority?.toLowerCase() === "low"
                                    ? "bg-slate-50 border-slate-200 text-slate-600"
                                    : "bg-amber-50 border-amber-200 text-amber-700"
                            }`}
                          >
                            {PRIORITIES.map((priority) => (
                              <option key={priority} value={priority}>
                                {priority}
                              </option>
                            ))}
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" />
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="relative inline-block">
                          <select
                            value={complaint.status || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(complaint, e.target.value)
                            }
                            disabled={isUpdating}
                            className={`appearance-none pr-8 pl-3 py-2 rounded-lg border text-xs font-semibold outline-none cursor-pointer ${
                              complaint.status === "Resolved"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : complaint.status === "Rejected"
                                  ? "bg-rose-50 border-rose-200 text-rose-700"
                                  : complaint.status === "Pending"
                                    ? "bg-amber-50 border-amber-200 text-amber-700"
                                    : "bg-sky-50 border-sky-200 text-sky-700"
                            }`}
                          >
                            {COMPLAINT_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" />
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top text-sm text-slate-500">
                        {formatDate(complaint.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintsPage;
