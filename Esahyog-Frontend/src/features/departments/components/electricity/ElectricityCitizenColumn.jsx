import { Bolt, PlugZap, PhoneCall } from "lucide-react";
import StatsCard from "../../../../components/StatsCard.jsx";
import ElectricityCitizenFeed from "./ElectricityCitizenFeed.jsx";

const ElectricityCitizenColumn = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-400/50 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xs text-amber-300 uppercase tracking-wide">
            Power status in your area
          </p>
          <p className="text-lg font-semibold text-slate-50">
            Power ON • No active outage reported
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Last interruption: 7 days ago • Average restoration 26 minutes.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          GRID STABLE
        </span>
      </div>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={<Bolt className="w-5 h-5 text-amber-300" />}
          title="Current supply"
          value="24 x 7"
          change="no load‑shedding today"
          badgeColor="bg-amber-500/15 text-amber-300"
        />
        <StatsCard
          icon={<PlugZap className="w-5 h-5 text-sky-300" />}
          title="Voltage quality"
          value="Within limits"
          change="230V ± 5%"
          badgeColor="bg-sky-500/15 text-sky-300"
        />
        <StatsCard
          icon={<PhoneCall className="w-5 h-5 text-emerald-300" />}
          title="Service tickets"
          value="2"
          change="billing / fuse issue"
          badgeColor="bg-emerald-500/15 text-emerald-300"
        />
      </div>

      <ElectricityCitizenFeed />
    </div>
  );
};

export default ElectricityCitizenColumn;
