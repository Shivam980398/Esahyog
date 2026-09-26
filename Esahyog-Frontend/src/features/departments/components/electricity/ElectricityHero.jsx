import { Bolt, Factory, UtilityPole, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ElectricityHero() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-8 bg-gradient-to-red from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Reliable electricity for every street,
            <br />
            one smart grid at a time.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Track generation, transmission and distribution health, outage
            status, and customer service performance across the entire city.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/40">
              <Factory className="w-3.5 h-3.5" />
              Generation
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <UtilityPole className="w-3.5 h-3.5" />
              Transmission &amp; Distribution
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">
              <Bolt className="w-3.5 h-3.5" />
              Grid Operations
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/15 text-rose-200 border border-rose-400/40">
              <Headphones className="w-3.5 h-3.5" />
              Customer Service
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-medium shadow-md shadow-amber-500/40 transition">
              View outage map
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Report power issue
            </button>
            <button
              onClick={() => navigate("/payments")}
              className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-medium shadow-md shadow-cyan-500/40 transition"
            >
              PayBill
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-amber-400/50 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />

            <div className="absolute left-6 bottom-8 h-16 w-24 rounded-lg bg-amber-500/20 border border-amber-400/60" />
            <div className="absolute left-10 bottom-12 h-10 w-10 rounded-md bg-slate-900 border border-slate-600" />

            <div className="absolute right-10 bottom-10 h-14 w-14 rounded-lg bg-sky-500/15 border border-sky-400/70" />
            <div className="absolute right-16 top-10 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
            <div className="absolute left-20 top-16 h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.9)]" />

            <div className="absolute inset-x-10 top-18 h-px bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400" />
            <div className="absolute inset-y-10 left-18 w-px bg-gradient-to-b from-amber-400 via-emerald-400 to-sky-400" />

            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400">
              Live smart‑grid overview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ElectricityHero;
