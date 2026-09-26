import React, { useEffect, useMemo, useState } from "react";
import {
  Filter,
  Search,
  Siren,
  Download,
  RefreshCw,
  PhoneCall,
  MapPin,
  User,
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import StatsCard from "../../components/admin/StatsCard";
import { adminApi } from "../../services/adminApi";
import { emergencyApi } from "../../services/emergencyApi";

const getCitizen = (emergency) => {
  return emergency?.citizen || emergency?.reportedBy || null;
};

const getCitizenName = (emergency) => {
  const citizen = getCitizen(emergency);

  if (!citizen) return "Citizen";

  return citizen.fullName || citizen.name || citizen.username || "Citizen";
};

function EmergencyPage() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const [serviceFilter, setServiceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchEmergencies = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await adminApi.getEmergencies();

      if (result?.success) {
        setEmergencies(result.data || []);
      } else {
        setEmergencies([]);
        setError(result?.message || "Failed to load emergency incidents.");
      }
    } catch (err) {
      console.error("Error fetching emergencies:", err);

      setEmergencies([]);
      setError(
        err?.message || "Unable to connect to the emergency dispatch server.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const getEmergencyId = (emergency) => {
    return emergency?.id || emergency?._id || "";
  };

  const getLocationText = (emergency) => {
    if (typeof emergency?.location === "string") {
      return emergency.location;
    }

    if (emergency?.location?.address) {
      return emergency.location.address;
    }

    return "Location unavailable";
  };

  const getCoordinates = (emergency) => {
    if (
      emergency?.location?.coordinates?.lat != null &&
      emergency?.location?.coordinates?.lng != null
    ) {
      return {
        lat: emergency.location.coordinates.lat,
        lng: emergency.location.coordinates.lng,
      };
    }

    if (
      emergency?.coordinates?.lat != null &&
      emergency?.coordinates?.lng != null
    ) {
      return {
        lat: emergency.coordinates.lat,
        lng: emergency.coordinates.lng,
      };
    }

    return null;
  };

  const getCitizenPhone = (emergency) => {
    const citizen = getCitizen(emergency);

    return citizen?.phone || citizen?.mobile || "";
  };

  const formatDateTime = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatType = (type) => {
    if (!type) return "Unknown";

    const labels = {
      fire: "Fire",
      crime: "Police",
      medical: "Medical",
      utility: "Utility",
    };

    return labels[type.toLowerCase()] || type;
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    const labels = {
      open: "Open",
      responding: "Responding",
      resolved: "Resolved",
    };

    return labels[status.toLowerCase()] || status;
  };

  const isToday = (value) => {
    if (!value) return false;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return false;

    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const filteredEmergencies = useMemo(() => {
    const searchLower = searchText.trim().toLowerCase();

    return emergencies.filter((emergency) => {
      const type = emergency?.type?.toLowerCase() || "";
      const status = emergency?.status?.toLowerCase() || "";

      const id = String(getEmergencyId(emergency)).toLowerCase();

      const location = getLocationText(emergency).toLowerCase();

      const citizenName = getCitizenName(emergency).toLowerCase();

      const matchesService = serviceFilter
        ? type === serviceFilter.toLowerCase()
        : true;

      const matchesStatus = statusFilter
        ? status === statusFilter.toLowerCase()
        : true;

      const matchesSearch = searchLower
        ? id.includes(searchLower) ||
          location.includes(searchLower) ||
          citizenName.includes(searchLower)
        : true;

      return matchesService && matchesStatus && matchesSearch;
    });
  }, [emergencies, serviceFilter, statusFilter, searchText]);

  const stats = useMemo(() => {
    const active = emergencies.filter(
      (emergency) =>
        emergency?.status === "open" || emergency?.status === "responding",
    ).length;

    const critical = emergencies.filter(
      (emergency) => emergency?.priority?.toLowerCase() === "critical",
    ).length;

    const resolvedToday = emergencies.filter(
      (emergency) =>
        emergency?.status === "resolved" &&
        isToday(emergency?.resolvedAt || emergency?.updatedAt),
    ).length;

    return {
      active,
      critical,
      resolvedToday,
    };
  }, [emergencies]);

  const handleStatusChange = async (emergency, newStatus) => {
    const emergencyId = getEmergencyId(emergency);

    if (!emergencyId) {
      alert("Emergency ID is missing.");
      return;
    }

    const currentStatus = emergency?.status;

    if (currentStatus === newStatus) {
      return;
    }

    try {
      setUpdatingId(emergencyId);
      setError("");

      const result = await emergencyApi.updateStatus(emergencyId, newStatus);

      if (!result?.success) {
        throw new Error(
          result?.message || "Failed to update emergency status.",
        );
      }

      await fetchEmergencies();
    } catch (err) {
      console.error("Emergency status update error:", err);

      alert(
        err?.message || "Failed to update emergency status. Please try again.",
      );

      await fetchEmergencies();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenLocation = (emergency) => {
    const coordinates = getCoordinates(emergency);

    if (coordinates) {
      const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    const address = getLocationText(emergency);

    if (address && address !== "Location unavailable") {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address,
      )}`;

      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCallCitizen = (emergency) => {
    const phone = getCitizenPhone(emergency);

    if (!phone) {
      alert("Citizen phone number is not available.");
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  const handleExportLogs = () => {
    if (!filteredEmergencies.length) {
      alert("There are no emergency records to export.");
      return;
    }

    const headers = [
      "Incident ID",
      "Service Type",
      "Location",
      "Priority",
      "Status",
      "Citizen",
      "Reported At",
      "Resolved At",
    ];

    const rows = filteredEmergencies.map((emergency) => [
      getEmergencyId(emergency),
      formatType(emergency?.type),
      getLocationText(emergency),
      emergency?.priority || "",
      formatStatus(emergency?.status),
      getCitizenName(emergency),
      formatDateTime(emergency?.reportedAt || emergency?.createdAt),
      formatDateTime(emergency?.resolvedAt),
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const stringValue = String(value ?? "");
            return `"${stringValue.replace(/"/g, '""')}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `emergency-logs-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Siren className="w-6 h-6 text-rose-500" />
            Emergency Services
          </h2>

          <p className="text-sm text-slate-500">
            Live dispatch and incident monitoring system
          </p>
        </div>

        <button
          onClick={fetchEmergencies}
          disabled={loading}
          className="flex items-center justify-center gap-2 p-2 px-3 hover:bg-slate-100 rounded-xl transition-all active:scale-95 disabled:opacity-50"
          title="Refresh Feed"
        >
          <RefreshCw
            className={`w-5 h-5 text-slate-600 ${
              loading ? "animate-spin" : ""
            }`}
          />

          <span className="text-sm font-medium text-slate-700">Refresh</span>
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />

          <div className="flex-1">
            <p className="font-semibold text-rose-700">Emergency feed error</p>

            <p className="text-sm text-rose-600 mt-1">{error}</p>
          </div>

          <button
            onClick={fetchEmergencies}
            className="text-sm font-semibold text-rose-700 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Incidents"
          value={stats.active}
          badgeColor="bg-rose-100 text-rose-600"
          change="Urgent Response"
        />

        <StatsCard
          title="Critical Alerts"
          value={stats.critical}
          badgeColor="bg-amber-100 text-amber-600"
          change="Immediate Action"
        />

        <StatsCard
          title="Resolved Today"
          value={stats.resolvedToday}
          badgeColor="bg-emerald-100 text-emerald-600"
          change="Cases Closed"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <Filter className="w-4 h-4 text-slate-400" />

              <select
                className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <option value="">All Services</option>
                <option value="fire">Fire</option>
                <option value="crime">Police</option>
                <option value="medical">Medical</option>
                <option value="utility">Utility</option>
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <select
                className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="responding">Responding</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:max-w-md px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
            <Search className="w-4 h-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search by ID, location or citizen..."
              className="bg-transparent w-full text-sm outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/30">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Siren className="w-4 h-4 text-rose-500" />
              Live Emergency Queue
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              {filteredEmergencies.length} incident
              {filteredEmergencies.length === 1 ? "" : "s"} displayed
            </p>
          </div>

          <button
            onClick={handleExportLogs}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <Download size={14} />
            Export Logs
          </button>
        </div>

        {loading ? (
          <div className="p-20 text-center">
            <RefreshCw className="w-8 h-8 text-slate-300 animate-spin mx-auto mb-3" />

            <p className="text-slate-400 font-medium">
              Connecting to emergency dispatch server...
            </p>
          </div>
        ) : filteredEmergencies.length === 0 ? (
          <div className="p-20 text-center">
            <Siren className="w-10 h-10 text-slate-200 mx-auto mb-3" />

            <p className="text-slate-500 font-medium">
              No emergency incidents found.
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Try changing the filters or search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="px-6 py-4">Incident ID</th>

                  <th className="px-6 py-4">Service Type</th>

                  <th className="px-6 py-4">Citizen</th>

                  <th className="px-6 py-4">Location</th>

                  <th className="px-6 py-4">Priority</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4">Reported At</th>

                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {filteredEmergencies.map((emergency) => {
                  const emergencyId = getEmergencyId(emergency);

                  const citizenPhone = getCitizenPhone(emergency);

                  const coordinates = getCoordinates(emergency);

                  const currentStatus = emergency?.status || "open";

                  const isUpdating = updatingId === emergencyId;

                  return (
                    <tr
                      key={emergencyId}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">
                          {emergencyId || "—"}
                        </div>

                        {emergency?.createdAt && (
                          <div className="text-[10px] text-slate-400 mt-1">
                            {formatDateTime(emergency.createdAt)}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="capitalize inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">
                          <Siren size={12} />

                          {formatType(emergency?.type)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <User size={14} className="text-slate-500" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              {getCitizenName(emergency)}
                            </p>

                            {citizenPhone ? (
                              <p className="text-[11px] text-slate-400">
                                {citizenPhone}
                              </p>
                            ) : (
                              <p className="text-[11px] text-slate-400">
                                Phone unavailable
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 max-w-[260px]">
                        <div className="flex items-start gap-2">
                          <MapPin
                            size={15}
                            className="text-rose-500 shrink-0 mt-0.5"
                          />

                          <div>
                            <p className="text-slate-700 font-medium text-sm line-clamp-2">
                              {getLocationText(emergency)}
                            </p>

                            {coordinates && (
                              <button
                                onClick={() => handleOpenLocation(emergency)}
                                className="text-xs text-sky-600 hover:underline mt-1"
                              >
                                Open in Maps
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            emergency?.priority === "critical"
                              ? "bg-rose-600 text-white"
                              : emergency?.priority === "high"
                                ? "bg-rose-100 text-rose-600"
                                : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {emergency?.priority || "Medium"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                currentStatus === "open"
                                  ? "bg-rose-500 animate-pulse"
                                  : currentStatus === "responding"
                                    ? "bg-sky-500 animate-pulse"
                                    : "bg-emerald-500"
                              }`}
                            />

                            <span className="capitalize text-xs font-medium text-slate-700">
                              {formatStatus(currentStatus)}
                            </span>
                          </div>

                          <select
                            value={currentStatus}
                            disabled={isUpdating}
                            onChange={(event) =>
                              handleStatusChange(emergency, event.target.value)
                            }
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50"
                          >
                            <option value="open">Open</option>

                            <option value="responding">Responding</option>

                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-400 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock3 size={13} />

                          {formatDateTime(
                            emergency?.reportedAt || emergency?.createdAt,
                          )}
                        </div>

                        {emergency?.resolvedAt && (
                          <div className="flex items-center gap-1.5 text-emerald-500 mt-1">
                            <CheckCircle2 size={13} />

                            {formatDateTime(emergency.resolvedAt)}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenLocation(emergency)}
                            title="View Location"
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <MapPin size={16} />
                          </button>

                          <button
                            onClick={() => handleCallCitizen(emergency)}
                            disabled={!citizenPhone}
                            title={
                              citizenPhone
                                ? "Call Citizen"
                                : "Citizen phone unavailable"
                            }
                            className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <PhoneCall size={16} />
                          </button>
                        </div>
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

export default EmergencyPage;
