import { GaugeCircle, Camera, FileSearch, Megaphone } from "lucide-react";
import TrafficQueuePanel from "./TrafficQueuePanel.jsx";

const TrafficOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<GaugeCircle className="w-5 h-5 text-emerald-300" />}
          label="Corridors running smooth"
          value="78%"
          note="below congestion threshold"
        />
        <KpiCard
          icon={<Camera className="w-5 h-5 text-amber-300" />}
          label="Violations captured"
          value="214"
          note="last 24 hrs (speed / red‑light)"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<FileSearch className="w-5 h-5 text-red-300" />}
          label="Open crash cases"
          value="9"
          note="under investigation"
        />
        <KpiCard
          icon={<Megaphone className="w-5 h-5 text-sky-300" />}
          label="Active campaigns"
          value="3"
          note="schools / highways"
        />
      </div>

      <TrafficQueuePanel />
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

export default TrafficOperatorColumn;
