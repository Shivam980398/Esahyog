import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  LocateFixed,
  MapPin,
  RefreshCw,
  Siren,
  XCircle,
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { emergencyApi } from "../services/emergencyApi";
import { useLocation } from "../context/useLocation";

const EmergencyReport = () => {
  const {
    userLocation,
    locationAddress,
    loading: locationLoading,
    error: locationError,
    getCurrentLocation,
  } = useLocation();

  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [toast, setToast] = useState(null);

  const toastTimerRef = useRef(null);

  const [formData, setFormData] = useState({
    type: "",
    location: {
      address: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    },
    details: "",
  });

  const showToast = (message, type = "success") => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({
      message,
      type,
    });

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!locationAddress) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: locationAddress,
      },
    }));
  }, [locationAddress]);

  useEffect(() => {
    if (!userLocation) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
      },
    }));
  }, [userLocation]);

  const loadEmergencies = useCallback(async () => {
    try {
      setLoading(true);

      const response = await emergencyApi.getMine();

      const payload = response?.data ?? response;

      if (payload?.success === false) {
        throw new Error(
          payload?.message || "Unable to load your emergency reports.",
        );
      }
      const data = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.emergencies)
            ? payload.emergencies
            : Array.isArray(payload?.results)
              ? payload.results
              : [];

      setEmergencies(data);
    } catch (err) {
      showToast(
        err?.message || "Unable to load your emergency reports.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmergencies();
  }, [loadEmergencies]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationAddressChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: value,
      },
    }));
  };

  const handleOpenForm = () => {
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCloseForm = () => {
    if (submitting) {
      return;
    }

    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      type: "",
      location: {
        address: "",
        coordinates: {
          lat: null,
          lng: null,
        },
      },
      details: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userLocation) {
      showToast(
        "Your current location could not be detected. Please allow location access and try again.",
        "error",
      );

      getCurrentLocation();
      return;
    }

    if (!formData.location.address.trim()) {
      showToast("Please provide the emergency location.", "error");
      return;
    }

    if (!formData.type) {
      showToast("Please select the emergency type.", "error");
      return;
    }

    if (!formData.details.trim()) {
      showToast("Please describe the emergency.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const emergencyData = {
        type: formData.type,

        location: {
          address: formData.location.address.trim(),

          coordinates: {
            lat: userLocation.lat,
            lng: userLocation.lng,
          },
        },

        details: formData.details.trim(),
      };

      const response = await emergencyApi.create(emergencyData);

      const payload = response?.data ?? response;

      if (payload?.success === false) {
        throw new Error(
          payload?.message || "Failed to submit emergency report.",
        );
      }

      setShowForm(false);

      resetForm();

      showToast(
        "Emergency reported successfully. Help has been notified.",
        "success",
      );

      await loadEmergencies();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Emergency submission error:", err);

      showToast(
        err?.message ||
          "Unable to submit the emergency report. Please try again.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getEmergencyId = (emergency) => {
    return emergency?.id || emergency?._id || "—";
  };

  const getLocationText = (emergency) => {
    if (typeof emergency?.location === "string") {
      return emergency.location;
    }

    if (emergency?.location?.address) {
      return emergency.location.address;
    }

    return "Location not provided";
  };

  const formatType = (type) => {
    if (!type) {
      return "Emergency";
    }

    const labels = {
      fire: "Fire Emergency",
      crime: "Police / Crime",
      medical: "Medical Emergency",
      utility: "Utility Emergency",
    };

    return labels[type.toLowerCase()] || type;
  };

  const formatDateTime = (value) => {
    if (!value) {
      return "—";
    }

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

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return {
          label: "Open",
          icon: AlertTriangle,
          wrapper: "bg-rose-50 border-rose-200 text-rose-700",
          iconColor: "text-rose-500",
          dot: "bg-rose-500 animate-pulse",
        };

      case "responding":
        return {
          label: "Responding",
          icon: Clock3,
          wrapper: "bg-sky-50 border-sky-200 text-sky-700",
          iconColor: "text-sky-500",
          dot: "bg-sky-500 animate-pulse",
        };

      case "resolved":
        return {
          label: "Resolved",
          icon: CheckCircle2,
          wrapper: "bg-emerald-50 border-emerald-200 text-emerald-700",
          iconColor: "text-emerald-500",
          dot: "bg-emerald-500",
        };

      default:
        return {
          label: status || "Unknown",
          icon: AlertTriangle,
          wrapper: "bg-slate-50 border-slate-200 text-slate-700",
          iconColor: "text-slate-500",
          dot: "bg-slate-400",
        };
    }
  };

  const activeEmergencies = emergencies.filter(
    (emergency) =>
      emergency?.status === "open" || emergency?.status === "responding",
  );

  const previousEmergencies = emergencies.filter(
    (emergency) => emergency?.status === "resolved",
  );

  const EmergencyCard = ({ emergency }) => {
    const statusConfig = getStatusConfig(emergency?.status);

    const StatusIcon = statusConfig.icon;

    return (
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
     
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <Siren className="w-5 h-5 text-rose-500" />
              </div>

              <div>
                <h3 className="font-bold text-slate-800">
                  {formatType(emergency?.type)}
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Emergency ID: {getEmergencyId(emergency)}
                </p>
              </div>
            </div>

        
            <div
              className={`inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border text-xs font-semibold ${statusConfig.wrapper}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />

              <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.iconColor}`} />

              {statusConfig.label}
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
       
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-slate-500" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="text-sm text-slate-700 font-medium mt-1 break-words">
                {getLocationText(emergency)}
              </p>
            </div>
          </div>

        
          {emergency?.details && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-slate-500" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Details
                </p>

                <p className="text-sm text-slate-600 mt-1 break-words">
                  {emergency.details}
                </p>
              </div>
            </div>
          )}

         
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
              <Clock3 className="w-4 h-4 text-slate-500" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Reported
              </p>

              <p className="text-sm text-slate-600 mt-1">
                {formatDateTime(emergency?.createdAt || emergency?.reportedAt)}
              </p>
            </div>
          </div>

         
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Priority
            </span>

            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                emergency?.priority === "critical"
                  ? "bg-rose-100 text-rose-700"
                  : emergency?.priority === "high"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-amber-100 text-amber-700"
              }`}
            >
              {emergency?.priority || "Medium"}
            </span>
          </div>

         
          {emergency?.status === "resolved" && emergency?.resolvedAt && (
            <div className="flex items-center gap-2 pt-2 text-emerald-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Resolved on {formatDateTime(emergency.resolvedAt)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header dashboardName="Emergency" />

      {toast && (
        <div className="fixed top-6 right-6 z-[10000] w-[calc(100%-2rem)] sm:w-auto sm:min-w-[360px] max-w-md">
          <div
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-sm ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200"
                : "bg-rose-50 border-rose-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <p
                className={`text-sm font-semibold ${
                  toast.type === "success"
                    ? "text-emerald-800"
                    : "text-rose-800"
                }`}
              >
                {toast.type === "success"
                  ? "Emergency Report"
                  : "Emergency Error"}
              </p>

              <p
                className={`text-sm mt-0.5 ${
                  toast.type === "success"
                    ? "text-emerald-700"
                    : "text-rose-700"
                }`}
              >
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className={`shrink-0 ${
                toast.type === "success"
                  ? "text-emerald-400 hover:text-emerald-600"
                  : "text-rose-400 hover:text-rose-600"
              }`}
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <section>
           
            <button
              type="button"
              onClick={handleCloseForm}
              disabled={submitting}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-5 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Emergency Center
            </button>

            
            <div className="mb-7">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                  <Siren className="w-6 h-6 text-rose-600" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Report an Emergency
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    Provide the emergency type, location and details.
                  </p>
                </div>
              </div>
            </div>

         
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <form className="space-y-5" onSubmit={handleSubmit}>
               
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Emergency Type *
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-rose-500/60"
                  >
                    <option value="" disabled>
                      Select Emergency Type
                    </option>

                    <option value="fire">Fire Emergency</option>

                    <option value="crime">Police / Crime</option>

                    <option value="medical">Medical Emergency</option>

                    <option value="utility">Utility Emergency</option>
                  </select>
                </div>

               
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Emergency Location *
                  </label>

                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

                    <input
                      name="location"
                      type="text"
                      value={formData.location.address}
                      onChange={handleLocationAddressChange}
                      placeholder="Address / Landmark"
                      required
                      disabled={submitting}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-32 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-rose-500/60"
                    />

                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={locationLoading || submitting}
                      className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-medium hover:bg-indigo-700 disabled:bg-slate-400"
                    >
                      <LocateFixed size={12} />

                      {locationLoading ? "Detecting..." : "Use Current"}
                    </button>
                  </div>

                  {locationError && (
                    <p className="text-[10px] text-red-500">{locationError}</p>
                  )}

                  {userLocation && (
                    <p className="text-[10px] text-emerald-600">
                      Current location detected.
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Emergency Details *
                  </label>

                  <div className="relative">
                    <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />

                    <textarea
                      name="details"
                      rows={5}
                      value={formData.details}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="Describe what happened in detail..."
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-3 pt-2.5 pb-2 text-xs text-slate-800 focus:ring-2 focus:ring-rose-500/60 outline-none resize-none"
                    />
                  </div>
                </div>

              
                <div className="mt-3 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    disabled={submitting}
                    className="px-6 py-2 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting || locationLoading}
                    className={`px-6 py-2 rounded-xl text-xs font-semibold text-white transition-all ${
                      submitting || locationLoading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-rose-600 hover:bg-rose-500 shadow-md"
                    }`}
                  >
                    {submitting
                      ? "Submitting..."
                      : locationLoading
                        ? "Detecting Location..."
                        : "Submit Emergency"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <section>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <Siren className="w-6 h-6 text-rose-600" />
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                      Emergency Services
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                      Report an emergency or track your previous emergency
                      reports.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
               
                <button
                  type="button"
                  onClick={loadEmergencies}
                  disabled={loading}
                  title="Refresh emergency reports"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />

                  <span className="hidden sm:inline">Refresh</span>
                </button>

               
                <button
                  type="button"
                  onClick={handleOpenForm}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 shadow-sm transition-colors"
                >
                  <Siren className="w-4 h-4" />
                  Report Emergency
                </button>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Active Emergencies
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Emergencies that are currently open or being responded to.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                  {activeEmergencies.length} Active
                </span>
              </div>

              {loading ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
                  <RefreshCw className="w-7 h-7 text-slate-300 animate-spin mx-auto mb-3" />

                  <p className="text-sm font-medium text-slate-400">
                    Loading your emergency reports...
                  </p>
                </div>
              ) : activeEmergencies.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                  </div>

                  <h3 className="font-bold text-slate-700">
                    No active emergencies
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    You currently have no open emergency reports.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {activeEmergencies.map((emergency) => (
                    <EmergencyCard
                      key={getEmergencyId(emergency)}
                      emergency={emergency}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Previous Emergencies
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Your resolved emergency reports.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  {previousEmergencies.length} Resolved
                </span>
              </div>

              {loading ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
                  <RefreshCw className="w-7 h-7 text-slate-300 animate-spin mx-auto mb-3" />

                  <p className="text-sm font-medium text-slate-400">
                    Loading previous emergencies...
                  </p>
                </div>
              ) : previousEmergencies.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-7 h-7 text-slate-400" />
                  </div>

                  <h3 className="font-bold text-slate-700">
                    No previous emergencies
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    Your resolved emergency reports will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {previousEmergencies.map((emergency) => (
                    <EmergencyCard
                      key={getEmergencyId(emergency)}
                      emergency={emergency}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EmergencyReport;
