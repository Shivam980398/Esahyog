import PaymentsHeader from "../components/PaymentsHeader.jsx";
import PaymentSummary from "../components/PaymentSummary.jsx";
import PaymentContent from "../components/PaymentContent.jsx";

function PaymentsPage() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
      <PaymentsHeader />
      <div className="p-6 lg:p-8 space-y-6">
        <PaymentSummary />
        <PaymentContent />
      </div>
    </div>
  );
}

export default PaymentsPage;
