const FireQueuePanel = () => (
  <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg space-y-3">
    <h3 className="text-sm font-semibold text-slate-100 mb-1">
      Operational queues
    </h3>

    <QueueItem
      label="Active incidents"
      count={4}
      items={["Apartment fire – Sector 3B", "MVC with entrapment – Ring Road"]}
      tone="red"
    />
    <QueueItem
      label="Inspections due this week"
      count={18}
      items={["School fire drill – Mon", "Mall sprinkler test – Thu"]}
      tone="amber"
    />
    <QueueItem
      label="Training & maintenance"
      count={9}
      items={["SCBA checks", "Ladder drill set 3", "Pump test – Station 2"]}
      tone="sky"
    />
  </div>
);

const QueueItem = ({ label, count, items, tone }) => {
  const toneClasses =
    tone === "red"
      ? "bg-red-500/15 text-red-300"
      : tone === "amber"
        ? "bg-amber-500/15 text-amber-300"
        : "bg-sky-500/15 text-sky-300";

  return (
    <div className="border border-slate-800 rounded-lg p-3 bg-slate-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-100">{label}</span>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] ${toneClasses} border border-white/5`}
        >
          {count}
        </span>
      </div>
      {items.map((item) => (
        <p key={item} className="text-[12px] text-slate-400">
          • {item}
        </p>
      ))}
    </div>
  );
};

export default FireQueuePanel;
