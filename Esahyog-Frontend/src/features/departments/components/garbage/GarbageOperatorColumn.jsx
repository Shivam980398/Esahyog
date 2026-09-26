import { Truck, ClipboardList } from "lucide-react";
import TogglePanel from "../../../../components/TogglePanel";

const GarbageOperatorColumn = () => {
  return (
    <aside className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Kpi
          icon={<Truck className="w-5 h-5 text-emerald-400" />}
          label="Collection efficiency"
          value="91%"
          note="bins cleared on first route"
        />
        <Kpi
          icon={<ClipboardList className="w-5 h-5 text-sky-300" />}
          label="Open complaints"
          value="12"
          note="citizen tickets pending"
        />
      </div>

      <QueuePanel />

      <TogglePanel
        labels={["Highlight overflowing bins", "Show missed pickups"]}
      />
    </aside>
  );
};

const Kpi = ({ icon, label, value, note }) => (
  <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-800 flex gap-3 items-center">
    <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
      {icon}
    </div>
    <div>
      <p className="text-[11px] text-slate-700 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-lg font-semibold text-slate-90">{value}</p>
      <p className="text-[11px] text-slate-500">{note}</p>
    </div>
  </div>
);

const QueuePanel = () => (
  <div className="p-5 bg-slate-100 border border-slate-800 rounded-xl shadow-lg space-y-3">
    <h3 className="text-sm font-semibold text-slate-900 mb-1">
      Collection & cleaning queue
    </h3>
    <QueueItem
      label="Overflowing bins"
      count={4}
      items={[
        "Ward 12 – Market lane",
        "Ward 7 – Bus depot",
        "Ward 3 – Lakefront",
      ]}
      tone="rose"
    />
    <QueueItem
      label="Missed pickups"
      count={2}
      items={["Ward 5 – Sector 2A", "Ward 9 – Old Town"]}
      tone="amber"
    />
    <QueueItem
      label="Sweeping pending"
      count={6}
      items={["Ring Road stretch", "Riverside promenade"]}
      tone="sky"
    />
  </div>
);

const QueueItem = ({ label, count, items, tone }) => {
  const toneClasses =
    tone === "rose"
      ? "bg-rose-500/15 text-rose-300"
      : tone === "amber"
        ? "bg-amber-500/15 text-amber-300"
        : "bg-sky-500/15 text-sky-300";

  return (
    <div className="border border-slate-800 rounded-lg p-3 bg-slate-300/60 shadow-sm">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-900">{label}</span>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] ${toneClasses} border border-white/5`}
        >
          {count}
        </span>
      </div>
      {items.map((item) => (
        <p key={item} className="text-[12px] text-slate-900">
          • {item}
        </p>
      ))}
    </div>
  );
};

export default GarbageOperatorColumn;
