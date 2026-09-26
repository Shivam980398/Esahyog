import { Droplets, AlertTriangle, CreditCard } from "lucide-react";
import StatsCard from "../../../../components/StatsCard.jsx";
import SewerCitizenFeed from "./SewerCitizenFeed.jsx";

const SewerCitizenColumn = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-400/50 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xs text-cyan-300 uppercase tracking-wide">
            Sewer service near you
          </p>
          <p className="text-lg font-semibold text-slate-50">
            Network operating normally • No overflow alerts
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Last blockage cleared 3 days ago. Backflow risk currently low.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          SAFE OPERATION
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={<Droplets className="w-5 h-5 text-cyan-300" />}
          title="Treatment quality"
          value="Compliant"
          change="within discharge norms"
          badgeColor="bg-cyan-500/15 text-cyan-300"
        />
        <StatsCard
          icon={<AlertTriangle className="w-5 h-5 text-amber-300" />}
          title="Open complaints"
          value="1"
          change="manhole odour issue"
          badgeColor="bg-amber-500/15 text-amber-300"
        />
        <StatsCard
          icon={<CreditCard className="w-5 h-5 text-emerald-300" />}
          title="Bill status"
          value="Paid"
          change="next due 15 Jan"
          badgeColor="bg-emerald-500/15 text-emerald-300"
        />
      </div>

      <SewerCitizenFeed />
    </div>
  );
};

export default SewerCitizenColumn;
