import { Network, Factory, Beaker, Headphones } from "lucide-react";
import SewerQueuePanel from "./SewerQueuePanel.jsx";

const SewerOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Network className="w-5 h-5 text-cyan-300" />}
          label="Manholes over threshold"
          value="7"
          note="collection system alerts"
        />
        <KpiCard
          icon={<Factory className="w-5 h-5 text-emerald-300" />}
          label="Plant capacity used"
          value="81%"
          note="all WWTPs today"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Beaker className="w-5 h-5 text-amber-300" />}
          label="Effluent within norms"
          value="97%"
          note="samples this month"
        />
        <KpiCard
          icon={<Headphones className="w-5 h-5 text-sky-300" />}
          label="Billing & complaints"
          value="36"
          note="open tickets"
        />
      </div>

      <SewerQueuePanel />
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

export default SewerOperatorColumn;
