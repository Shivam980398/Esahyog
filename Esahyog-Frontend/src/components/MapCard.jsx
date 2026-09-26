import MapComponent from "./map";

function MapCard() {
  return (
    <div className=" h-auto w-200 rounded-xl overflow-hidden border border-slate-800 bg-slate-100 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            City Road Network
          </h3>
          <p className="text-[11px] text-slate-900">Last update: 12 sec ago</p>
        </div>
        <span className="px-2 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
          Live
        </span>
      </div>
      <div className="h-auto bg-linear-to-br from-slate-900 via-slate-150 to-slate-100 flex items-center justify-center text-slate-900 text-sm">
        <MapComponent></MapComponent>
      </div>
    </div>
  );
}
export default MapCard;
