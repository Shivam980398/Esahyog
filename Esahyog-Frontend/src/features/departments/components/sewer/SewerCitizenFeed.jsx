import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: AlertTriangle,
    title: "Sewer odour near park",
    description:
      "Complaint #SW‑1042 accepted. Jetting team scheduled for tonight 10 PM.",
    status: "Scheduled",
  },
  {
    id: 2,
    icon: Clock,
    title: "Backflow risk advisory",
    description:
      "Heavy rain forecast – avoid opening chamber covers or dumping waste.",
    status: "Advisory",
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Overflow at manhole resolved",
    description:
      "Complaint #SW‑0967 cleared. Level sensors back within normal range.",
    status: "Completed",
  },
];

const statusStyles = {
  Scheduled: "bg-amber-500/15 text-amber-300 border border-amber-400/40",
  Advisory: "bg-sky-500/15 text-sky-300 border border-sky-400/40",
  Completed: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40",
};

const SewerCitizenFeed = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-50">
        Complaints & service notices
      </h3>
      <span className="text-[11px] text-slate-400">Updated 10 min ago</span>
    </div>
    <ul className="divide-y divide-slate-800">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id} className="px-4 py-3 flex items-start gap-3">
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
              <Icon className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">
                  {item.title}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-[12px] text-slate-300 mt-1">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
    <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-400">
      View bill history, pay online, and track all sewer‑service complaints in
      one place.
    </div>
  </div>
);

export default SewerCitizenFeed;
