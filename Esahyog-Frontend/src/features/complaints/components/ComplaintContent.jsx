import ComplaintFormCard from "../components/ComplaintFormCard";
import ComplaintSidebar from "../components/ComplaintSidebar";

function ComplaintContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ComplaintFormCard />
      </div>
      <div className="lg:col-span-1">
        <ComplaintSidebar />
      </div>
    </div>
  );
}
export default ComplaintContent;
