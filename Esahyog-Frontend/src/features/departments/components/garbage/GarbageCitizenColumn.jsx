import { Trash2, MapPin, Route } from "lucide-react";
import MapCard from "../../../../components/MapCard.jsx";
import StatsCard from "../../../../components/StatsCard.jsx";
import GarbageIncidentFeed from "./GarbageIncidentFeed.jsx";

const GarbageCitizenColumn = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/80 border border-emerald-500/40 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xs text-emerald-300 uppercase tracking-wide">
            Your area collection
          </p>
          <p className="text-lg font-semibold text-blue-900">
            Morning pickup on schedule
          </p>
          <p className="text-[11px] text-slate-900 mt-1">
            Last truck passed 12 minutes ago. Next sweep tomorrow 7:30 AM.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          ON TIME
        </span>
      </div>

      <MapCard
        title="Nearby collection points"
        subtitle="Smart bins and dumpsters within 1 km"
      />

      {/* Quick stats for citizens */}
      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={<Trash2 className="w-5 h-5 text-emerald-400" />}
          title="Bins near you"
          value="8"
          change="3 currently almost full"
          badgeColor="bg-emerald-500/15 text-emerald-300"
        />
        <StatsCard
          icon={<MapPin className="w-5 h-5 text-amber-300" />}
          title="Overflow alerts"
          value="1"
          change="needs attention"
          badgeColor="bg-amber-500/15 text-amber-300"
        />
        <StatsCard
          icon={<Route className="w-5 h-5 text-sky-300" />}
          title="Truck ETA"
          value="24 min"
          change="for your street"
          badgeColor="bg-sky-500/15 text-sky-300"
        />
      </div>

      <GarbageIncidentFeed />
    </div>
  );
};

export default GarbageCitizenColumn;
