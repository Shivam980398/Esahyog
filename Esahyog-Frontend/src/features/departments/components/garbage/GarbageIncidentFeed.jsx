import { AlertTriangle, MapPin, Bell } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: AlertTriangle,
    label: "Overflowing bin",
    description: "Mixed‑waste bin near Park Gate is almost full.",
    distance: "350 m away",
    status: "Action scheduled",
  },
  {
    id: 2,
    icon: MapPin,
    label: "Dry waste drop‑off",
    description: "Nearest dry‑waste center at Community Hall.",
    distance: "900 m away",
    status: "Open till 8:00 PM",
  },
  {
    id: 3,
    icon: Bell,
    label: "Missed pickup?",
    description: "No collection today? Tap to raise a complaint.",
    distance: "",
    status: "Response in < 24 hours",
  },
];

const GarbageIncidentColumn = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-100/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-90">
        Bin status & notices for your ward
      </h3>
      <span className="text-[11px] text-blue-900">
        Updated a few minutes ago
      </span>
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
              <p className="text-sm font-medium text-slate-700">{item.label}</p>
              <p className="text-[12px] text-slate-700 mt-0.5">
                {item.description}
              </p>
              <p className="text-[11px] text-slate-700 mt-1">
                {item.distance && `${item.distance} • `}
                {item.status}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default GarbageIncidentColumn;
