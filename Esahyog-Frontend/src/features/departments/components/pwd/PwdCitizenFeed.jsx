import { AlertTriangle, CheckCircle2, Clock, MapPin } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: AlertTriangle,
    title: "Potholes on Ring Road",
    description: "Your complaint #RD‑2041 accepted. Temporary filling done.",
    status: "In progress",
  },
  {
    id: 2,
    icon: Clock,
    title: "Footpath repair near school",
    description: "Work order issued. Expected completion: 18 Dec.",
    status: "Scheduled",
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Storm‑water drain cleaning",
    description: "Complaint #DR‑0913 resolved. Silt removed yesterday.",
    status: "Completed",
  },
];

const statusStyles = {
  "In progress": "bg-amber-500/15 text-amber-300 border border-amber-400/40",
  Scheduled: "bg-sky-500/15 text-sky-300 border border-sky-400/40",
  Completed: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40",
};

const PwdCitizenFeed = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-50">
        Complaints & work status for your ward
      </h3>
      <span className="text-[11px] text-slate-400">Tap items for details</span>
    </div>
    <ul className="divide-y divide-slate-800">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id} className="px-4 py-3 flex items-start gap-3">
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
              <Icon className="w-4 h-4 text-emerald-300" />
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

    <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1">
      <MapPin className="w-3.5 h-3.5" />
      Track complaints and projects by ward, street, or project ID.
    </div>
  </div>
);

export default PwdCitizenFeed;
