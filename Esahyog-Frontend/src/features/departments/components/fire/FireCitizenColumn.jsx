import { Flame, ShieldCheck, Bell } from "lucide-react";
import StatsCard from "../../../../components/StatsCard.jsx";
import FireCitizenFeed from "./FireCitizenFeed.jsx";

const FireCitizenColumn = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-red-500/40 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xs text-red-300 uppercase tracking-wide">
            Emergency coverage near you
          </p>
          <p className="text-lg font-semibold text-slate-50">
            2 stations within 5 km • Median response 6:12
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            No large fires active in your area. Call 101 or 112 in an emergency.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          COMMUNITY SAFE
        </span>
      </div>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={<Flame className="w-5 h-5 text-red-400" />}
          title="Active incidents"
          value="3"
          change="1 fire • 2 medical"
          badgeColor="bg-red-500/15 text-red-300"
        />
        <StatsCard
          icon={<ShieldCheck className="w-5 h-5 text-amber-300" />}
          title="Inspections"
          value="12"
          change="this week in your ward"
          badgeColor="bg-amber-500/15 text-amber-300"
        />
        <StatsCard
          icon={<Bell className="w-5 h-5 text-sky-300" />}
          title="Alerts enabled"
          value="On"
          change="SMS + app notifications"
          badgeColor="bg-sky-500/15 text-sky-300"
        />
      </div>

      <FireCitizenFeed />
    </div>
  );
};

export default FireCitizenColumn;
