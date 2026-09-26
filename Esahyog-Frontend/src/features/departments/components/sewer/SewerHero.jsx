import { Droplets, Pipette, Beaker, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SewerHero() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
            SmartCity Wastewater • Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Cleaner rivers and drains,
            <br />
            with smarter sewers.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Monitor collection network levels, treatment plant performance,
            sludge &amp; effluent quality, and citizen billing &amp; complaints
            in one place.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <Pipette className="w-3.5 h-3.5" />
              Collection System Management
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">
              <Droplets className="w-3.5 h-3.5" />
              Wastewater Treatment
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/40">
              <Beaker className="w-3.5 h-3.5" />
              Sludge &amp; Effluent
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-500/20 text-slate-200 border border-slate-400/40">
              <FileText className="w-3.5 h-3.5" />
              Billing &amp; Complaints
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-medium shadow-md shadow-cyan-500/40 transition">
              View sewer level map
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              file complaint
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
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-cyan-400/60 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />
            <div className="absolute left-8 bottom-12 h-4 w-40 rounded-full bg-slate-800 border border-slate-600" />
            <div className="absolute left-12 bottom-18 h-16 w-12 rounded-md bg-emerald-500/25 border border-emerald-400/70" />
            <div className="absolute right-10 top-14 h-10 w-10 rounded-full bg-cyan-400/25 border border-cyan-300/70" />
            <div className="absolute inset-x-10 top-18 h-px bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300" />
            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400">
              Collection &amp; treatment network overview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SewerHero;
