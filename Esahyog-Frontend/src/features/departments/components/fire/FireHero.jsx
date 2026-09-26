import {
  Flame,
  AlarmClockCheck,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function FireHero() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
            SmartCity Fire &amp; Rescue • Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Faster emergency response,
            <br />
            safer neighborhoods.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Track active incidents, hydrant and equipment readiness, public
            risk, and firefighter training from one real‑time view.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/15 text-red-200 border border-red-400/40">
              <Flame className="w-3.5 h-3.5" />
              Emergency Response
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              Prevention &amp; Public Education
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <GraduationCap className="w-3.5 h-3.5" />
              Training &amp; Maintenance
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-slate-950 text-sm font-medium shadow-md shadow-red-500/40 transition">
              View active calls
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Request fire safety visit
            </button>
            <button
              onClick={() => navigate("/emergency")}
              className="px-5 py-2 rounded-lg border  bg-red-500 hover:bg-red-400 border-slate-600 text-sm text-slate-950 text-sm font-medium shadow-md shadow-red-500/40 transition"
            >
              Emergency
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-red-400/50 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />
            <div className="absolute left-6 bottom-8 h-16 w-24 rounded-lg bg-red-500/25 border border-red-400/60" />
            <div className="absolute left-10 bottom-12 h-8 w-10 rounded-md bg-slate-900 border border-slate-600" />
            <div className="absolute right-10 bottom-10 h-10 w-10 rounded-full bg-amber-400/30 border border-amber-300/70" />
            <div className="absolute right-16 top-10 h-3 w-3 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.9)]" />
            <div className="absolute left-20 top-16 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <div className="absolute inset-x-10 top-18 h-px bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400" />
            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400">
              City‑wide fire &amp; EMS overview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FireHero;
