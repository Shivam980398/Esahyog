import BillDetailsCard from "./BillDetailsCard";
import PaymentFormCard from "./PaymentFormCard";
import PaymentSidebar from "./PaymentSidebar";

function PaymentContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <BillDetailsCard />
        <PaymentFormCard />
      </div>
      <div className="lg:col-span-1">
        <PaymentSidebar />
      </div>
    </div>
  );
}
export default PaymentContent;
