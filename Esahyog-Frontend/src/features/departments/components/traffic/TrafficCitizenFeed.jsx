import { AlertTriangle, TrafficCone, Megaphone } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: AlertTriangle,
    title: "Accident cleared",
    description:
      "Earlier crash at Metro Circle has been cleared. Traffic returning to normal.",
    tag: "Accident Response",
  },
  {
    id: 2,
    icon: TrafficCone,
    title: "New one‑way rule",
    description:
      "Market Street is now one‑way 5–10 PM to ease congestion. Follow signs.",
    tag: "Traffic Management",
  },
  {
    id: 3,
    icon: Megaphone,
    title: "Helmet & seat‑belt drive",
    description:
      "₹0 challan awareness checks all week – wear helmet and buckle up.",
    tag: "Public Safety",
  },
];

const tagStyles = {
  "Accident Response": "bg-red-500/15 text-red-300 border border-red-400/40",
  "Traffic Management": "bg-sky-500/15 text-sky-300 border border-sky-400/40",
  "Public Safety":
    "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40",
};

const TrafficCitizenFeed = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-50">
        Live traffic & safety updates
      </h3>
      <span className="text-[11px] text-slate-400">Updated 5 min ago</span>
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
                  className={`px-2 py-0.5 rounded-full text-[11px] ${tagStyles[item.tag]}`}
                >
                  {item.tag}
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
  </div>
);

export default TrafficCitizenFeed;
