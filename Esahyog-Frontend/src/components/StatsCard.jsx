function StatsCard({ icon, title, value, change, badgeColor }) {
  return (
    <div className="p-4 bg-slate-100/70 rounded-xl shadow border border-slate-800 flex gap-3 items-center">
      <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xs uppercase tracking-wide text-slate-900">
          {title}
        </h3>
        <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
        <p
          className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[11px] ${badgeColor}`}
        >
          {change}
        </p>
      </div>
    </div>
  );
}
export default StatsCard;