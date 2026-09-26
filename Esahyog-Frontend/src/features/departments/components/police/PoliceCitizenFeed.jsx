import { ShieldAlert, Users, Megaphone } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: ShieldAlert,
    title: "Night patrol focus area",
    description:
      "Extra patrols around Central Market after recent theft reports.",
    tag: "Law Enforcement",
  },
  {
    id: 2,
    icon: Users,
    title: "Community meeting",
    description:
      "Ward‑level meeting on neighborhood watch and women’s safety – Friday 6 PM.",
    tag: "Order & Peace",
  },
  {
    id: 3,
    icon: Megaphone,
    title: "Festival traffic & noise advisory",
    description:
      "Use designated parking and keep music within permitted hours.",
    tag: "Public Service",
  },
];

const tagStyles = {
  "Law Enforcement": "bg-sky-500/15 text-sky-300 border border-sky-400/40",
  "Order & Peace":
    "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40",
  "Public Service": "bg-amber-500/15 text-amber-300 border border-amber-400/40",
};

const PoliceCitizenFeed = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-50">
        Police & safety updates for your area
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

export default PoliceCitizenFeed;
