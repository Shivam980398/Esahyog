import { Shield, Siren, PhoneCall } from "lucide-react";
import StatsCard from "../../../../components/StatsCard.jsx";
import PoliceCitizenFeed from "./PoliceCitizenFeed.jsx";

const PoliceCitizenColumn = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/40 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xs text-sky-300 uppercase tracking-wide">
            Safety around you
          </p>
          <p className="text-lg font-semibold text-slate-50">
            Low crime activity • Quick emergency coverage
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Nearest patrol within ~6 minutes. Call 112 or 100 in an emergency.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          AREA STABLE
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <StatsCard
          icon={<Shield className="w-5 h-5 text-sky-300" />}
          title="Reported crimes"
          value="3"
          change="last 24 hours in your ward"
          badgeColor="bg-sky-500/15 text-sky-300"
        />
        <StatsCard
          icon={<Siren className="w-5 h-5 text-red-300" />}
          title="911 / 112 calls"
          value="18"
          change="avg response 7:04"
          badgeColor="bg-red-500/15 text-red-300"
        />
        <StatsCard
          icon={<PhoneCall className="w-5 h-5 text-emerald-300" />}
          title="Citizen requests"
          value="5"
          change="non‑emergency support"
          badgeColor="bg-emerald-500/15 text-emerald-300"
        />
      </div>

      <PoliceCitizenFeed />
    </div>
  );
};

export default PoliceCitizenColumn;
