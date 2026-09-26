import { useState } from "react";
import {
  Droplets,
  CircleFadingPlus,
  ShieldCheck,
  X,
  CreditCard,
  CheckCircle,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function WaterHero() {
  const navigate = useNavigate();
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("invoice");
  const handlePayment = () => {
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2000);
  };

  const closePortal = () => {
    setIsPayModalOpen(false);
    setPaymentStep("invoice");
  };

  return (
    <section className="px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-slate-50 border-b border-slate-800 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
            SmartCity Water • Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 leading-snug">
            Reliable water for every home,
            <br />
            one network at a time.
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Monitor supply schedules, distribution health, treatment quality,
            wastewater flows, and customer requests across the entire city.
          </p>

          <div className="flex flex-wrap gap-2 mt-5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/40">
              <Droplets className="w-3.5 h-3.5" /> Supply & Treatment
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">
              <CircleFadingPlus className="w-3.5 h-3.5" /> Distribution &
              Maintenance
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-400/40">
              WW & Sanitation
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/40">
              <ShieldCheck className="w-3.5 h-3.5" /> Health & Customer Service
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => navigate("/payments")}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-md shadow-emerald-500/30 transition flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay water bill
            </button>
            <button
              onClick={() => navigate("/complaint")}
              className="px-5 py-2 rounded-lg border border-slate-600 text-sm text-slate-100 hover:bg-slate-800 transition"
            >
              Submit leak / quality complaint
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative h-48 w-64 md:h-56 md:w-80 rounded-2xl bg-slate-900 border border-sky-500/40 overflow-hidden shadow-xl">
            <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" />
            <div className="absolute left-6 bottom-8 h-16 w-20 rounded-lg bg-sky-500/30 border border-sky-400/60" />
            <div className="absolute right-8 top-10 h-16 w-16 rounded-full border border-cyan-400/70 bg-cyan-500/10" />
            <div className="absolute inset-x-10 top-16 h-px bg-gradient-to-r from-sky-400 via-emerald-400 to-cyan-300" />
          </div>
        </div>
      </div>

      {isPayModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/30">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <h3 className="text-slate-100 font-semibold text-sm">
                  Water Utility Bill
                </h3>
              </div>
              <button
                onClick={closePortal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {paymentStep === "invoice" && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                      Amount Due
                    </p>
                    <p className="text-4xl font-bold text-white mt-1">
                      ₹485.00
                    </p>
                    <p className="text-[10px] text-rose-400 mt-2 font-medium bg-rose-400/10 inline-block px-2 py-0.5 rounded">
                      Due: Oct 25, 2023
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Consumer No:</span>
                      <span className="text-slate-200">WTR-8829-10</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Usage:</span>
                      <span className="text-slate-200">12,400 Liters</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all active:scale-95 mt-4"
                  >
                    Confirm & Pay
                  </button>
                </div>
              )}

              {paymentStep === "processing" && (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-300 text-xs font-medium">
                    Securing payment portal...
                  </p>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="py-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Payment Success
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Receipt ID: #PAY-821-X9
                    </p>
                  </div>
                  <button
                    onClick={closePortal}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WaterHero;
