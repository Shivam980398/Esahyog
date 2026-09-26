import { Factory, UtilityPole, Activity, Headphones } from "lucide-react";
import ElectricityQueuePanel from "./ElectricityQueuePanel.jsx";

const ElectricityOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Factory className="w-5 h-5 text-emerald-300" />}
          label="Generation online"
          value="1.24 GW"
          note="across 4 plants"
        />
        <KpiCard
          icon={<UtilityPole className="w-5 h-5 text-sky-300" />}
          label="Feeder health"
          value="96%"
          note="no overloads above 80%"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Activity className="w-5 h-5 text-amber-300" />}
          label="Active outages"
          value="5"
          note="2 major • 3 local"
        />
        <KpiCard
          icon={<Headphones className="w-5 h-5 text-rose-300" />}
          label="Calls in queue"
          value="18"
          note="avg wait 01:32"
        />
      </div>

      <ElectricityQueuePanel />
    </aside>
  );
};

const KpiCard = ({ icon, label, value, note }) => (
  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex gap-3 items-center">
    <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
      {icon}
    </div>
    <div>
      <p className="text-[11px] text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-lg font-semibold text-slate-50">{value}</p>
      <p className="text-[11px] text-slate-500">{note}</p>
    </div>
  </div>
);

export default ElectricityOperatorColumn;
