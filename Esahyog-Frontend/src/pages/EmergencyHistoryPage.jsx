import React, { useEffect, useState } from "react";
import {
  Siren,
  MapPin,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { emergencyApi } from "../services/emergencyApi";

function EmergencyHistoryPage() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmergencies = async () => {
    setLoading(true);

    try {
      const result = await emergencyApi.getMine();

      if (result.success) {
        setEmergencies(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching emergency history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const activeEmergencies = emergencies.filter(
    (item) => item.status === "open" || item.status === "responding",
  );

  const pastEmergencies = emergencies.filter(
    (item) => item.status === "resolved",
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Siren className="w-6 h-6 text-red-600" />
                My Emergency Reports
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Track your active and previous emergency reports.
              </p>
            </div>

            <button
              onClick={fetchEmergencies}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium hover:bg-slate-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />

              <h2 className="text-lg font-bold text-slate-800">
                Active Emergencies
              </h2>
            </div>

            {loading ? (
              <LoadingState />
            ) : activeEmergencies.length === 0 ? (
              <EmptyState message="You have no active emergency reports." />
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {activeEmergencies.map((emergency) => (
                  <EmergencyCard key={emergency._id} emergency={emergency} />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-500" />

              <h2 className="text-lg font-bold text-slate-800">
                Past Emergencies
              </h2>
            </div>

            {loading ? (
              <LoadingState />
            ) : pastEmergencies.length === 0 ? (
              <EmptyState message="You have no resolved emergency reports." />
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {pastEmergencies.map((emergency) => (
                  <EmergencyCard key={emergency._id} emergency={emergency} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function EmergencyCard({ emergency }) {
  const isResolved = emergency.status === "resolved";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-800 capitalize">
            {emergency.type} Emergency
          </h3>

          <p className="text-xs text-slate-400 mt-1 font-mono">
            #{emergency._id}
          </p>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
            isResolved
              ? "bg-emerald-100 text-emerald-700"
              : emergency.status === "responding"
                ? "bg-sky-100 text-sky-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {emergency.status}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex gap-3">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />

          <p className="text-sm text-slate-700">
            {emergency.location?.address || "Location unavailable"}
          </p>
        </div>

        <div className="flex gap-3">
          <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />

          <p className="text-xs text-slate-500">
            Reported {new Date(emergency.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-5 p-3 bg-slate-50 rounded-xl">
        <p className="text-xs text-slate-600">{emergency.details}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase text-slate-400">
          Priority
        </span>

        <span className="text-xs font-bold text-red-600 uppercase">
          {emergency.priority}
        </span>
      </div>

      {emergency.resolvedAt && (
        <p className="text-[10px] text-emerald-600 mt-3">
          Resolved on {new Date(emergency.resolvedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white rounded-2xl p-10 text-center text-slate-400">
      Loading emergency reports...
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

export default EmergencyHistoryPage;
