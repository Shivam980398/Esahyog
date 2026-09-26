import { CreditCard, Receipt, ShieldCheck, Wallet } from "lucide-react";

function PaymentFormCard() {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Make a Payment
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>

          <div className="space-y-4">
            <SummaryItem label="Road Tax" value="$120" />
            <SummaryItem label="Maintenance Fee" value="$30" />
            <SummaryItem label="Service Charge" value="$5" />
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>$155</span>
          </div>
        </div>

        <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Choose Payment Method</h2>

          <div className="space-y-5">
            <PaymentOption
              icon={<CreditCard className="w-6 h-6 text-blue-600" />}
              title="Credit / Debit Card"
              active
            />

            <PaymentOption
              icon={<Wallet className="w-6 h-6 text-green-600" />}
              title="UPI / Wallets"
            />

            <PaymentOption
              icon={<Receipt className="w-6 h-6 text-gray-700" />}
              title="Net Banking"
            />
          </div>

          <div className="mt-8 space-y-4">
            <Input label="Card Holder Name" placeholder="John Doe" />
            <Input label="Card Number" placeholder="xxxx xxxx xxxx 1234" />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Expiry Date" placeholder="MM/YY" />
              <Input label="CVV" placeholder="***" />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 font-semibold">
              Pay $155 Securely
            </button>

            <div className="flex items-center justify-center gap-2 mt-3 text-gray-600 text-sm">
              <ShieldCheck className="w-4 h-4" />
              Payments are encrypted & secure
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function PaymentOption({ icon, title, active = false }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        active ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"
      }`}
    >
      {icon}
      <span className="font-medium">{title}</span>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
      />
    </label>
  );
}

export default PaymentFormCard;
