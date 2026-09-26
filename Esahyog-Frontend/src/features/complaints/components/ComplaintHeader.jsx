import { useState } from "react";
import { ArrowLeft, AlertCircle, Search, X } from "lucide-react";
import { complaintsApi } from "../services/complaintsApi";

function ComplaintHeader() {
  const [showModal, setShowModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      setLoading(true);

      const res = await complaintsApi.getMine();

      setComplaints(res.data || []);

      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleTakeBack = async (id) => {
    const confirmTakeBack = window.confirm(
      "Are you sure you want to take back this complaint?",
    );

    if (!confirmTakeBack) return;

    try {
      await complaintsApi.withdraw(id);

      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: "Withdrawn" } : c)),
      );

      alert("Complaint taken back successfully");
    } catch (err) {
      console.error("Take Back Error:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to take back complaint",
      );
    }
  };

  return (
    <>
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-2 lg:p-2">
        <div className="flex items-center justify-end mb-5">
          {/* <button className="flex items-center gap-2 text-slate-200 text-sm"></button> */}

          <button
            onClick={handleFetch}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white"
          >
            My Complaints
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>

            <div>
              <p className="text-xs text-slate-300">SmartCity Connect</p>

              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                File a Complaint
              </h1>
            </div>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              placeholder="Search existing complaints..."
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-800/70 border border-slate-700 text-white"
            />
          </div>
        </div>
      </header>

  
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl max-h-[80vh] overflow-hidden">
           
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-bold">My Complaints</h2>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[60vh]">
              {loading ? (
                <p>Loading...</p>
              ) : complaints.length === 0 ? (
                <p>No complaints found.</p>
              ) : (
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint._id} className="border rounded-xl p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {complaint.title}
                          </h3>

                          <p className="text-gray-600 mt-2">
                            {complaint.description}
                          </p>

                          <div className="mt-3 text-sm text-gray-500">
                            Status: {complaint.status}
                          </div>
                        </div>

                        {complaint.status === "Pending" && (
                          <button
                            onClick={() => handleTakeBack(complaint._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Take Back
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ComplaintHeader;
