
import { ClipboardList, Building2, Wrench, FileText } from "lucide-react";
import PwdQueuePanel from "./PwdQueuePanel.jsx";

const PwdOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<ClipboardList className="w-5 h-5 text-sky-300" />}
          label="Planned projects"
          value="27"
          note="in DPR / design stage"
        />
        <KpiCard
          icon={<Building2 className="w-5 h-5 text-emerald-300" />}
          label="Works in execution"
          value="14"
          note="roads • bridges • drains"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <KpiCard
          icon={<Wrench className="w-5 h-5 text-amber-300" />}
          label="Maintenance backlog"
          value="63"
          note="open minor repairs"
        />
        <KpiCard
          icon={<FileText className="w-5 h-5 text-slate-200" />}
          label="Admin & approvals"
          value="19"
          note="tenders / estimates / NOCs"
        />
      </div>

      <PwdQueuePanel />
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

export default PwdOperatorColumn;
