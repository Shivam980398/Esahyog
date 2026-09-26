import ComplaintHeader from "../components/ComplaintHeader";
import ComplaintContent from "../components/ComplaintContent";

function ComplaintPage() {
  return (
    <div className="min-h-screen bg-slate-100  ">
      <div>
        <ComplaintHeader />
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-6 lg:p-8">
          <ComplaintContent />
        </div>
      </div>
    </div>
  );
}
export default ComplaintPage;
