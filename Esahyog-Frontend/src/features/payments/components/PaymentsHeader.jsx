import { ArrowLeft, CreditCard, Search } from "lucide-react";

function PaymentsHeader() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-5">
        <button className="flex items-center gap-2 text-slate-200 text-sm hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <button className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-sm font-semibold text-white shadow-md">
          Sign Out
        </button>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-slate-300">SmartCity Connect</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Payments
            </h1>
          </div>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            placeholder="Search bills, receipts..."
            className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-800/70 border border-slate-700 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>
    </header>
  );
}
export default PaymentsHeader;
