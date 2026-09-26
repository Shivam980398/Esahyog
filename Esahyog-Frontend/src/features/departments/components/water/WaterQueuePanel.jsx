const WaterQueuePanel = () => (
  <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg space-y-3">
    <h3 className="text-sm font-semibold text-slate-100 mb-1">
      Operational queues
    </h3>

    <QueueItem
      label="Critical leak repairs"
      count={3}
      items={["DMA‑4 trunk main", "Hill Road branch line"]}
      tone="rose"
    />
    <QueueItem
      label="Quality investigations"
      count={2}
      items={["Chlorine below limit – Zone 7", "Odour complaints – Sector 3B"]}
      tone="amber"
    />
    <QueueItem
      label="Customer escalations"
      count={5}
      items={["High bill disputes", "No‑supply for >24 hours"]}
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

export default WaterQueuePanel;
