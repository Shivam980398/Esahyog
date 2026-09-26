import { useEffect, useState } from "react";
import { Clock, Hash } from "lucide-react";
import { complaintsApi } from "../services/complaintsApi";

export default function ComplaintSidebar() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecent = async () => {
    try {
      const data = await complaintsApi.getMine();
      let complaintsArray = [];
      if (Array.isArray(data)) {
        complaintsArray = data;
      } else if (data.complaints && Array.isArray(data.complaints)) {
        complaintsArray = data.complaints;
      } else if (data.data && Array.isArray(data.data)) {
        complaintsArray = data.data;
      }

      setItems(complaintsArray.slice(0, 3));
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecent();

    window.addEventListener("complaintSubmitted", fetchRecent);
    return () => window.removeEventListener("complaintSubmitted", fetchRecent);
  }, []);

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Clock className="w-4 h-4 text-sky-500" />
          Expected resolution
        </div>
        <p className="text-[11px] text-slate-600">
          Most complaints are resolved within{" "}
          <span className="font-semibold text-slate-900">24–72 hours</span>.
        </p>
      </div>

      {/* Recent Complaints List */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-900">
              Recent complaints
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="space-y-2">
              <div className="h-10 w-full bg-slate-100 animate-pulse rounded-lg" />
              <div className="h-10 w-full bg-slate-100 animate-pulse rounded-lg" />
            </div>
          ) : items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="group border-b border-slate-50 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-slate-400">
                    #{item._id?.slice(-6).toUpperCase()}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.status === "Resolved"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {item.status || "Pending"}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                  {item.title || item.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] text-slate-500">
                    {item.department || "General"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-slate-400">No complaints found yet.</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
