
import { Flame, Shield, Megaphone } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    icon: Flame,
    title: "Minor fire under control",
    description: "Kitchen fire on Oak Street. No injuries, area ventilated.",
    tag: "Emergency Response",
  },
  {
    id: 2,
    icon: Shield,
    title: "Home safety campaign",
    description:
      "Free smoke‑alarm checks in Sector 4 this weekend. Book a slot online.",
    tag: "Prevention & Education",
  },
  {
    id: 3,
    icon: Megaphone,
    title: "Festival fire‑cracker advisory",
    description:
      "Use only permitted fireworks in open areas. Keep water / sand buckets ready.",
    tag: "Public Advisory",
  },
];

const tagStyles = {
  "Emergency Response":
    "bg-red-500/15 text-red-300 border border-red-400/40",
  "Prevention & Education":
    "bg-amber-500/15 text-amber-300 border border-amber-400/40",
  "Public Advisory":
    "bg-sky-500/15 text-sky-300 border border-sky-400/40",
};

const FireCitizenFeed = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-50">
        Fire & safety updates for your area
      </h3>
      <span className="text-[11px] text-slate-400">Updated 10 min ago</span>
    </div>
    <ul className="divide-y divide-slate-800">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id} className="px-4 py-3 flex items-start gap-3">
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
              <Icon className="w-4 h-4 text-red-300" />
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

export default FireCitizenFeed;
