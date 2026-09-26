import { TrafficCone, CarFront, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TrafficHero() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            SmartCity Traffic Police • Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Smoother traffic and safer roads,
            <br />
            signal by signal.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Monitor congestion, violations, incidents, and road safety campaigns
            to keep the city moving and reduce crashes.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">
              <CarFront className="w-3.5 h-3.5" />
              Traffic Law Enforcement
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <TrafficCone className="w-3.5 h-3.5" />
              Traffic Management &amp; Control
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/15 text-red-200 border border-red-400/40">
              <ShieldAlert className="w-3.5 h-3.5" />
              Accident Response &amp; Safety
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-medium shadow-md shadow-emerald-500/40 transition">
              View congestion map
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Report a traffic issue
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-emerald-400/60 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />
            <div className="absolute inset-x-10 top-16 h-px bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400" />
            <div className="absolute inset-y-12 left-18 w-px bg-gradient-to-b from-sky-400 via-slate-500 to-emerald-400" />
            <div className="absolute left-10 top-14 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
            <div className="absolute right-14 top-20 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.9)]" />
            <div className="absolute left-20 bottom-10 h-3 w-3 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.9)]" />
            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400">
              Junctions, incidents &amp; control zones
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrafficHero;
