import { AlarmClockCheck, GraduationCap, Wrench } from "lucide-react";
import FireQueuePanel from "./FireQueuePanel.jsx";

const FireOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<AlarmClockCheck className="w-5 h-5 text-red-300" />}
          label="On‑time turnout"
          value="89%"
          note="within 60 sec (station) / 90 sec (night)"
        />
        <KpiCard
          icon={<GraduationCap className="w-5 h-5 text-sky-300" />}
          label="Training completion"
          value="72%"
          note="annual competencies"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Wrench className="w-5 h-5 text-amber-300" />}
          label="Vehicles available"
          value="14 / 16"
          note="2 in scheduled maintenance"
        />
        <KpiCard
          icon={<Wrench className="w-5 h-5 text-emerald-300" />}
          label="Hydrants serviceable"
          value="96%"
          note="last 30 days inspection"
        />
      </div>

      <FireQueuePanel />
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

export default FireOperatorColumn;
