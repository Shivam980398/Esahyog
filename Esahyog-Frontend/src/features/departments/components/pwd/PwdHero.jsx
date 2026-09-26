import { Building2, Ruler, Wrench, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PwdHero() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            Public Works / PWD • Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Better roads, bridges and drains,
            <br />
            built transparently.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Track planning proposals, live construction sites, maintenance
            backlogs, and complaint resolutions for city infrastructure.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <Ruler className="w-3.5 h-3.5" />
              Planning &amp; Design
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">
              <Building2 className="w-3.5 h-3.5" />
              Construction
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/40">
              <Wrench className="w-3.5 h-3.5" />
              Maintenance &amp; Repair
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-500/20 text-slate-200 border border-slate-400/40">
              <ClipboardList className="w-3.5 h-3.5" />
              Regulatory &amp; Admin
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-medium shadow-md shadow-emerald-500/40 transition">
              View project map
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Lodge a road / drain complaint
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-emerald-400/60 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />
            <div className="absolute left-8 bottom-10 h-4 w-40 rounded-full bg-slate-800 border border-slate-600" />
            <div className="absolute left-12 bottom-16 h-16 w-10 rounded-md bg-emerald-500/25 border border-emerald-400/70" />
            <div className="absolute left-26 bottom-16 h-12 w-10 rounded-md bg-sky-500/25 border border-sky-400/70" />
            <div className="absolute right-12 top-12 h-12 w-12 rounded-full bg-amber-400/25 border border-amber-300/70" />
            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400">
              Road &amp; building projects overview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PwdHero;
