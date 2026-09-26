import { ChartNoAxesGantt, Wrench, MessageCircle } from "lucide-react";
ChartNoAxesGantt;
import StatsCard from "../../../../components/StatsCard.jsx";
import PwdCitizenFeed from "./PwdCitizenFeed.jsx";

const PwdCitizenColumn = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xs text-emerald-300 uppercase tracking-wide">
            Infrastructure around you
          </p>
          <p className="text-lg font-semibold text-slate-50">
            Main approach road in good condition • 1 complaint in progress
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Street resurfacing planned next month • Drain desilting this week.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          STATUS: OK
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={<ChartNoAxesGantt className="w-5 h-5 text-emerald-300" />}
          title="Road quality"
          value="Good"
          change="no major potholes logged"
          badgeColor="bg-emerald-500/15 text-emerald-300"
        />
        <StatsCard
          icon={<Wrench className="w-5 h-5 text-amber-300" />}
          title="Open works"
          value="3"
          change="within 2 km radius"
          badgeColor="bg-amber-500/15 text-amber-300"
        />
        <StatsCard
          icon={<MessageCircle className="w-5 h-5 text-sky-300" />}
          title="Your complaints"
          value="1"
          change="est. resolution 3 days"
          badgeColor="bg-sky-500/15 text-sky-300"
        />
      </div>

      <PwdCitizenFeed />
    </div>
  );
};

export default PwdCitizenColumn;
