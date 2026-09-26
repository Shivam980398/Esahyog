const PwdQueuePanel = () => (
  <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg space-y-3">
    <h3 className="text-sm font-semibold text-slate-100 mb-1">
      Project & maintenance queues
    </h3>

    <QueueItem
      label="High‑impact projects"
      count={4}
      items={["Flyover – Ring Road", "New bridge – River crossing"]}
      tone="emerald"
    />
    <QueueItem
      label="Urgent repairs"
      count={11}
      items={["Sinkhole – Ward 3", "Damaged culvert – Sector 7B"]}
      tone="red"
    />
    <QueueItem
      label="Regulatory & admin tasks"
      count={9}
      items={["Bid evaluation – Package 12", "Utility shifting approvals"]}
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

export default PwdQueuePanel;
