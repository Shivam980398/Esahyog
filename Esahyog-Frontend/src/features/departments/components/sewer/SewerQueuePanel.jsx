
const SewerQueuePanel = () => (
  <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg space-y-3">
    <h3 className="text-sm font-semibold text-slate-100 mb-1">
      Collection, treatment & billing queues
    </h3>

    <QueueItem
      label="Collection system alerts"
      count={6}
      items={["Level high – Zone 4 trunk", "Blockage suspected – Ward 9"]}
      tone="amber"
    />
    <QueueItem
      label="Treatment & lab tasks"
      count={5}
      items={["BOD / COD tests – Plant A", "Sludge dewatering maintenance"]}
      tone="emerald"
    />
    <QueueItem
      label="Billing / complaint tickets"
      count={25}
      items={["Odour + surcharge dispute", "Overflow compensation claim"]}
      tone="sky"
    />
  </div>
);

const QueueItem = ({ label, count, items, tone }) => {
  const toneClasses =
    tone === "amber"
      ? "bg-amber-500/15 text-amber-300"
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

export default SewerQueuePanel;
