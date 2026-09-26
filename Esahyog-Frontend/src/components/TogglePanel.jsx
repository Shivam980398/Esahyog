const TogglePanel = ({ label, defaultChecked }) => (
  <label className="flex items-center gap-2 text-sm text-slate-200 cursor-pointer">
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <div className="w-9 h-5 rounded-full bg-slate-700 peer-checked:bg-emerald-500/80 transition" />
      <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow peer-checked:translate-x-4 transition-transform" />
    </div>
    <span>{label}</span>
  </label>
);

export default TogglePanel;