import { CarFront, TrafficCone, AlertTriangle } from "lucide-react";
import StatsCard from "../../../../components/StatsCard.jsx";
import TrafficCitizenFeed from "./TrafficCitizenFeed.jsx";

const TrafficCitizenColumn = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xs text-emerald-300 uppercase tracking-wide">
            Your route today
          </p>
          <p className="text-lg font-semibold text-slate-50">
            Mostly smooth • +6 min delay at Ring Road
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Diversions near City Mall due to construction. Speed checks active.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          DRIVE SAFE
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={<CarFront className="w-5 h-5 text-emerald-300" />}
          title="Average speed"
          value="34 km/h"
          change="on your corridor"
          badgeColor="bg-emerald-500/15 text-emerald-300"
        />
        <StatsCard
          icon={<TrafficCone className="w-5 h-5 text-amber-300" />}
          title="Road works"
          value="2"
          change="affecting your trip"
          badgeColor="bg-amber-500/15 text-amber-300"
        />
        <StatsCard
          icon={<AlertTriangle className="w-5 h-5 text-red-300" />}
          title="Crashes reported"
          value="1"
          change="within 5 km radius"
          badgeColor="bg-red-500/15 text-red-300"
        />
      </div>

      <TrafficCitizenFeed />
    </div>
  );
};

export default TrafficCitizenColumn;
