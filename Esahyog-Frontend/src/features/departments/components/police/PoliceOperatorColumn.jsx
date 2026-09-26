import { MapPinned, Activity, ClipboardList, Users } from "lucide-react";
import PoliceQueuePanel from "./PoliceQueuePanel.jsx";

const PoliceOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<MapPinned className="w-5 h-5 text-sky-300" />}
          label="Hotspot coverage"
          value="92%"
          note="patrols across top risk zones"
        />
        <KpiCard
          icon={<Activity className="w-5 h-5 text-red-300" />}
          label="High‑priority calls"
          value="7"
          note="Code 1 / emergency"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<ClipboardList className="w-5 h-5 text-amber-300" />}
          label="Open case files"
          value="126"
          note="under investigation"
        />
        <KpiCard
          icon={<Users className="w-5 h-5 text-emerald-300" />}
          label="Staff on duty"
          value="64"
          note="patrol + control room"
        />
      </div>

      <PoliceQueuePanel />
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

export default PoliceOperatorColumn;
