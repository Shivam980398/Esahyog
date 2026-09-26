import { AlertTriangle, Wrench, Droplets } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: AlertTriangle,
    title: "Planned maintenance",
    description:
      "Low pressure expected 10:00–12:00 in Sector 5 for valve repair.",
    type: "Distribution & Maintenance",
  },
  {
    id: 2,
    icon: Wrench,
    title: "Leak repair in progress",
    description:
      "Road no. 12 – pipeline repair, expect muddy water for a while.",
    type: "Distribution & Maintenance",
  },
  {
    id: 3,
    icon: Droplets,
    title: "Water quality notice",
    description: "Extra chlorination in Old Town zone after heavy rains.",
    type: "Health & Regulatory",
  },
];

const typeColors = {
  "Distribution & Maintenance":
    "bg-amber-500/15 text-amber-300 border border-amber-400/40",
  "Health & Regulatory":
    "bg-rose-500/15 text-rose-300 border border-rose-400/40",
};

const WaterCitizenFeed = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-50">
        Notices for your connection
      </h3>
      <span className="text-[11px] text-slate-400">Updated 15 min ago</span>
    </div>
    <ul className="divide-y divide-slate-800">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id} className="px-4 py-3 flex items-start gap-3">
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
              <Icon className="w-4 h-4 text-sky-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">
                  {item.title}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] ${typeColors[item.type]}`}
                >
                  {item.type}
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

export default WaterCitizenFeed;
