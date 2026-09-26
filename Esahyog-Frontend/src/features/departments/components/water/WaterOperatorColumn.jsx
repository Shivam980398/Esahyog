import { Factory, Network, Droplets, Headphones } from "lucide-react";
import WaterQueuePanel from "./WaterQueuePanel.jsx";

const WaterOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Factory className="w-5 h-5 text-sky-300" />}
          label="Treatment capacity used"
          value="76%"
          note="Water Supply & Treatment"
        />
        <KpiCard
          icon={<Network className="w-5 h-5 text-emerald-300" />}
          label="Network leaks"
          value="5 active"
          note="Distribution & Maintenance"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Droplets className="w-5 h-5 text-cyan-300" />}
          label="Sewage inflow"
          value="68% of design"
          note="Wastewater & Sanitation"
        />
        <KpiCard
          icon={<Headphones className="w-5 h-5 text-amber-300" />}
          label="Open service tickets"
          value="24"
          note="Customer Service & Billing"
        />
      </div>

      <WaterQueuePanel />
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

export default WaterOperatorColumn;
