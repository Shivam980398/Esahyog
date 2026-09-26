const TrafficQueuePanel = () => (
  <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg space-y-3">
    <h3 className="text-sm font-semibold text-slate-100 mb-1">
      Enforcement & operations queues
    </h3>

    <QueueItem
      label="High‑priority incidents"
      count={4}
      items={[
        "Multi‑vehicle crash – Expressway",
        "Signal outage – Junction 12",
      ]}
      tone="red"
    />
    <QueueItem
      label="Traffic management tasks"
      count={7}
      items={["Festival route diversions", "VIP movement plan updates"]}
      tone="emerald"
    />
    <QueueItem
      label="Public education events"
      count={5}
      items={["School road‑safety workshop", "Helmet awareness check‑post"]}
      tone="sky"
    />
  </div>
);

const QueueItem = ({ label, count, items, tone }) => {
  const toneClasses =
    tone === "red"
      ? "bg-red-500/15 text-red-300"
      : tone === "emerald"
        ? "bg-emerald-500/15 text-emerald-300"
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

export default TrafficQueuePanel;
