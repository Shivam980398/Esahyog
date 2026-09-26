import { AlertTriangle, PlugZap, Home } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: AlertTriangle,
    title: "Planned outage tonight",
    description:
      "Line upgrade in Sector 5 • No power 11:00 PM–1:00 AM. Lift users, plan ahead.",
    tag: "Transmission & Distribution",
  },
  {
    id: 2,
    icon: PlugZap,
    title: "Voltage fluctuation notice",
    description:
      "Brief dips possible 4:00–5:00 PM during load transfer between feeders.",
    tag: "Operations",
  },
  {
    id: 3,
    icon: Home,
    title: "Bill & payment options",
    description:
      "View your last 6 bills, enable auto‑pay, or raise a billing dispute online.",
    tag: "Customer Service",
  },
];

const tagColors = {
  "Transmission & Distribution":
    "bg-sky-500/15 text-sky-300 border border-sky-400/40",
  Operations: "bg-amber-500/15 text-amber-300 border border-amber-400/40",
  "Customer Service":
    "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40",
};

const ElectricityCitizenFeed = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-50">
        Outages & information for your connection
      </h3>
      <span className="text-[11px] text-slate-400">Updated 5 min ago</span>
    </div>
    <ul className="divide-y divide-slate-800">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id} className="px-4 py-3 flex items-start gap-3">
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
              <Icon className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">
                  {item.title}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] ${tagColors[item.tag]}`}
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

export default ElectricityCitizenFeed;
