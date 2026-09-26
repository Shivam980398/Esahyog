import { Shield, Siren, MapPinned, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PoliceHero() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
            SmartCity Police • Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Safer streets and faster help,
            <br />
            one call at a time.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Monitor crime patterns, patrol coverage, emergency calls, and
            citizen requests to support proactive, community‑focused policing.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <Shield className="w-3.5 h-3.5" />
              Law Enforcement &amp; Crime Prevention
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">
              <Users className="w-3.5 h-3.5" />
              Order &amp; Peace
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/15 text-red-200 border border-red-400/40">
              <Siren className="w-3.5 h-3.5" />
              Emergency &amp; Public Service
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-medium shadow-md shadow-sky-500/40 transition">
              View active calls
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Report an incident
            </button>
            <button
              onClick={() => navigate("/emergency")}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-sky-400 text-slate-950 text-sm font-medium shadow-md shadow-sky-500/40 transition"
            >
              Or an emergency
            </button>
          </div>
        </div>

        {/* map-style illustration */}
        <div className="flex justify-center">
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-sky-400/60 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />
            <div className="absolute left-10 top-12 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
            <div className="absolute right-16 top-18 h-3 w-3 rounded-full bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.9)]" />
            <div className="absolute left-18 bottom-10 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
            <div className="absolute inset-x-12 top-16 h-px bg-gradient-to-r from-emerald-400 via-slate-500 to-red-400" />
            <div className="absolute inset-y-12 left-20 w-px bg-gradient-to-b from-sky-400 via-slate-500 to-emerald-400" />
            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400">
              Real‑time incidents &amp; patrols
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PoliceHero;
