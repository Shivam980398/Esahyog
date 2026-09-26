
import { useState, useMemo } from "react";
import { Filter, Search, FileText } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";

const dummyBills = [
  {
    id: "BILL-2001",
    consumer: "Aman Sharma",
    department: "water",
    status: "pending",
    amount: "₹ 1,250",
    dueDate: "2025-12-20",
  },
  {
    id: "BILL-2002",
    consumer: "Simran Kaur",
    department: "electricity",
    status: "paid",
    amount: "₹ 980",
    dueDate: "2025-12-15",
  },
  {
    id: "BILL-2003",
    consumer: "Rohit Verma",
    department: "sewer",
    status: "overdue",
    amount: "₹ 1,730",
    dueDate: "2025-12-05",
  },
  {
    id: "BILL-2004",
    consumer: "Priya Singh",
    department: "garbage",
    status: "pending",
    amount: "₹ 650",
    dueDate: "2025-12-22",
  },
];

function BillsPage() {
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredBills = useMemo(() => {
    return dummyBills.filter((b) => {
      if (departmentFilter && b.department !== departmentFilter) return false;
      if (statusFilter && b.status !== statusFilter) return false;

      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        const inId = b.id.toLowerCase().includes(q);
        const inConsumer = b.consumer.toLowerCase().includes(q);
        if (!inId && !inConsumer) return false;
      }
      return true;
    });
  }, [departmentFilter, statusFilter, searchText]);

  return (
    <div>
      <h2 className="text-base font-semibold mb-4">Bills management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Pending bills" value="1,245" trend="+12%" />
        <StatsCard title="Collected today" value="₹ 3.2L" trend="+8%" />
        <StatsCard title="Overdue" value="326" trend="-5%" />
      </div>

     
      <div className="bg-white border border-card rounded-xl p-4 mb-4 text-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted" />
            <select
              className="px-2 py-1.5 border border-card rounded-md outline-none"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All departments</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="sewer">Sewer</option>
              <option value="garbage">Garbage</option>
            </select>
            <select
              className="px-2 py-1.5 border border-card rounded-md outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by ID / consumer"
              className="px-3 py-1.5 border border-card rounded-md text-xs outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>

     
      <div className="bg-white border border-card rounded-xl p-4 text-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-main text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            Recent bills
          </h3>
          <button className="px-3 py-1.5 rounded-md border border-card text-xs">
            Export
          </button>
        </div>

        {filteredBills.length === 0 ? (
          <p className="text-muted">No bills found for current filters.</p>
        ) : (
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-left text-[11px] text-muted border-b border-card">
                <th className="py-2 pr-2">ID</th>
                <th className="py-2 pr-2">Consumer</th>
                <th className="py-2 pr-2">Department</th>
                <th className="py-2 pr-2">Status</th>
                <th className="py-2 pr-2">Amount</th>
                <th className="py-2 pr-2">Due date</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-2 pr-2 font-medium text-main">{b.id}</td>
                  <td className="py-2 pr-2">{b.consumer}</td>
                  <td className="py-2 pr-2 capitalize">{b.department}</td>
                  <td className="py-2 pr-2 capitalize">{b.status}</td>
                  <td className="py-2 pr-2">{b.amount}</td>
                  <td className="py-2 pr-2">{b.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BillsPage;
