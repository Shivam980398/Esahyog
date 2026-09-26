import { Wallet, CalendarDays, CheckCircle2 } from "lucide-react";

export default function PaymentSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard
        icon={Wallet}
        label="Total Due"
        value="$150.00"
        pill="Water Utility"
        pillColor="bg-sky-100 text-sky-700"
      />
      <SummaryCard
        icon={CalendarDays}
        label="Due Date"
        value="Oct 30, 2025"
        pill="in 5 days"
        pillColor="bg-amber-100 text-amber-700"
      />
      <SummaryCard
        icon={CheckCircle2}
        label="Last Payment"
        value="$145.00"
        pill="Sep 30, 2025"
        pillColor="bg-emerald-100 text-emerald-700"
      />
    </div>
  );
}

function SummaryCard({ icon, label, value, pill, pillColor }) {
  const IconComponent = icon;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm px-5 py-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-xl font-semibold mt-1 text-slate-900">{value}</p>
        <span
          className={`inline-flex mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${pillColor}`}
        >
          {pill}
        </span>
      </div>
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
        <IconComponent className="w-5 h-5 text-slate-600" />
      </div>
    </div>
  );
}
