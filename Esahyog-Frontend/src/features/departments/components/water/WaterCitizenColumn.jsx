import { useState, useEffect } from "react";
import { Droplets, CircleFadingPlus, PhoneCall } from "lucide-react";
import StatsCard from "../../../../components/StatsCard.jsx";
import WaterCitizenFeed from "./WaterCitizenFeed.jsx";
import { complaintsApi } from "../../../complaints/services/complaintsApi.js";
import { departmentsApi } from "../../../../services/departmentsApi.js";

const WaterCitizenColumn = () => {
  const [supplyData, setSupplyData] = useState({
    status: "Loading...",
    message: "Fetching supply schedules...",
    nextSchedule: "",
    isSafe: true,
  });

  const [stats, setStats] = useState({
    quality: "Checking...",
    qualityNote: "Fetching reports...",
    openRequests: 0,
    requestsNote: "No active tickets",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitizenData = async () => {
      try {
        const [supplyResult, complaintsResult] = await Promise.allSettled([
          departmentsApi.getWaterZoneStatus(),
          complaintsApi.getMine(),
        ]);

        const supply =
          supplyResult.status === "fulfilled" ? supplyResult.value : {};
        const complaints =
          complaintsResult.status === "fulfilled" ? complaintsResult.value : [];

        setSupplyData({
          status: supply.currentStatus || "Normal Pressure",
          message: supply.summary || "Timely supply confirmed.",
          nextSchedule: supply.nextTime || "TBD",
          isSafe: supply.waterQualityIndex > 90,
        });

        const activeComplaints = Array.isArray(complaints)
          ? complaints.filter((c) => c.status !== "Resolved").length
          : 0;

        setStats({
          quality: supply.qualityLabel || "Compliant",
          qualityNote: `Last test: ${supply.lastTestDate || "Recent"}`,
          openRequests: activeComplaints,
          requestsNote:
            activeComplaints > 0
              ? `${activeComplaints} tickets in progress`
              : "All clear",
        });
      } catch (err) {
        console.error("Failed to fetch water dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCitizenData();
  }, []);

  return (
    <div className="space-y-4">
      <div
        className={`p-4 rounded-xl border bg-slate-900/80 shadow-md flex items-center justify-between transition-colors ${
          supplyData.isSafe ? "border-sky-500/40" : "border-rose-500/40"
        }`}
      >
        <div>
          <p className="text-xs text-sky-300 uppercase tracking-wide">
            Today&apos;s water supply
          </p>
          <p className="text-lg font-semibold text-slate-50">
            {loading ? "Detecting Status..." : supplyData.status}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Next scheduled supply:{" "}
            <span className="text-sky-200 font-medium">
              {supplyData.nextSchedule}
            </span>{" "}
            • {supplyData.message}
          </p>
        </div>

        {loading ? (
          <div className="h-6 w-20 bg-slate-800 animate-pulse rounded-full" />
        ) : (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              supplyData.isSafe
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                : "bg-rose-500/20 text-rose-300 border-rose-400/40"
            }`}
          >
            {supplyData.isSafe ? "SAFE TO USE" : "BOIL BEFORE USE"}
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={
            <CircleFadingPlus
              className={`w-5 h-5 ${
                loading ? "animate-spin" : "text-blue-300"
              }`}
            />
          }
          title="Supply status"
          value={loading ? "..." : "On schedule"}
          change="Zone-wide uptime: 99%"
          badgeColor="bg-sky-500/15 text-white"
        />
        <StatsCard
          icon={<Droplets className="w-5 h-5 text-emerald-300" />}
          title="Water quality"
          value={stats.quality}
          change={stats.qualityNote}
          badgeColor="bg-emerald-500/15 text-emerald-200"
        />
        <StatsCard
          icon={<PhoneCall className="w-5 h-5 text-amber-300" />}
          title="My requests"
          value={stats.openRequests}
          change={stats.requestsNote}
          badgeColor="bg-amber-500/15 text-amber-200"
        />
      </div>

      <WaterCitizenFeed />
    </div>
  );
};

export default WaterCitizenColumn;
