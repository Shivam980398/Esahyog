
import { Droplets, MapPin, FileText } from "lucide-react";

export default function BillDetailsCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Service</p>
            <p className="text-sm font-semibold text-slate-900">
              Water Utility • Residential
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700">
          <FileText className="w-3.5 h-3.5" />
          View full bill
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <p className="text-slate-500 mb-1">Account Number</p>
          <p className="font-semibold text-slate-900">WU-28492031</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Billing Period</p>
          <p className="font-semibold text-slate-900">Sep 01 – Sep 30</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Usage</p>
          <p className="font-semibold text-slate-900">13,240 L</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Tariff</p>
          <p className="font-semibold text-slate-900">$0.011 / L</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-slate-200">
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-medium text-slate-700">
            24B Greenview Lane, Downtown
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[11px] font-medium text-emerald-700">
          Smart meter connected
        </span>
      </div>
    </div>
  );
}
