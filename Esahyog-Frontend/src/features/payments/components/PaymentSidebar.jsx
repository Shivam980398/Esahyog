import { Rows, Receipt, Info, CheckCircle2, AlertTriangle } from "lucide-react";

export default function PaymentSidebar() {
  return (
    <aside className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Payment for</p>
            <p className="text-sm font-semibold text-slate-900">
              Water Bill • Oct 2025
            </p>
          </div>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
          Due in 5 days
        </span>
      </div>

      <div className="border border-slate-200 rounded-xl bg-white px-4 py-3 space-y-2 text-xs">
        <Rows label="Current charges" value="$140.00" />
        <Rows label="Previous balance" value="$5.00" />
        <Rows label="Taxes & fees" value="$5.00" />
        <div className="border-t border-dashed border-slate-200 pt-2 mt-1 flex items-center justify-between">
          <span className="font-semibold text-slate-900 text-sm">
            Total due
          </span>
          <span className="font-semibold text-slate-900 text-sm">$150.00</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px]">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-slate-600">
          No late fees yet. Paying today keeps your account in good standing.
        </span>
      </div>

      <div className="rounded-xl bg-sky-50 border border-sky-100 px-3 py-2.5 flex items-start gap-2 text-[11px] text-slate-700">
        <Info className="w-3.5 h-3.5 text-sky-500 mt-0.5" />
        <span>
          Payments can take up to 24 hours to reflect on the Citizen Dashboard.
          You will receive an email receipt instantly.
        </span>
      </div>

      <div className="flex items-start gap-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5" />
        <span>
          Service interruption notice will be issued automatically if this bill
          is unpaid after the due date.
        </span>
      </div>
    </aside>
  );
}
