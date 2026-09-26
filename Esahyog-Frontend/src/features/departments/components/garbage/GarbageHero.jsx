import { Trash2, Truck, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GarbageHero() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            SmartCity Waste &amp; Cleaning • Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Cleaner streets, fewer missed pickups,
            <br />
            one bin at a time.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            See bin fill levels, collection routes, complaints, and recycling
            impact in real time for every neighborhood.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">
              <Trash2 className="w-3.5 h-3.5" />
              Smart collection
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <Truck className="w-3.5 h-3.5" />
              Route &amp; fleet monitoring
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-500/15 text-lime-200 border border-lime-400/40">
              <Recycle className="w-3.5 h-3.5" />
              Recycling &amp; cleanliness score
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-medium shadow-md shadow-emerald-500/40 transition">
              Check collection for my area
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Report missed pickup / litter
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-emerald-400/60 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />

            <div className="absolute left-8 bottom-10 h-14 w-10 rounded-md bg-emerald-500/30 border border-emerald-400/70" />
            <div className="absolute left-22 bottom-12 h-10 w-8 rounded-md bg-lime-500/25 border border-lime-400/70" />
            <div className="absolute left-34 bottom-14 h-8 w-8 rounded-md bg-sky-500/25 border border-sky-400/70" />

            <div className="absolute inset-x-10 top-18 h-px bg-gradient-to-r from-emerald-400 via-lime-300 to-sky-300" />
            <div className="absolute right-14 top-16 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400">
              Live bins, routes &amp; complaints overview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GarbageHero;
