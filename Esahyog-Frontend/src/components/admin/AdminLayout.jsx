import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Bell,
  Siren,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../features/auth/useAuth";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, handleLogout } = useAuth();

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      <aside
        className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 shadow-xl z-20 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
          {!collapsed && (
            <span className="font-bold text-white tracking-tight text-lg">
              SmartCity<span className="text-sky-400"> Admin</span>
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          <AdminLink
            to="/admin"
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            collapsed={collapsed}
          />
          <AdminLink
            to="/admin/complaints"
            icon={<MessageSquare size={20} />}
            label="Complaints"
            collapsed={collapsed}
          />
          <AdminLink
            to="/admin/bills"
            icon={<FileText size={20} />}
            label="Bills"
            collapsed={collapsed}
          />
          <AdminLink
            to="/admin/notices"
            icon={<Bell size={20} />}
            label="Notices"
            collapsed={collapsed}
          />
          <AdminLink
            to="/admin/emergency"
            icon={<Siren size={20} />}
            label="Emergency"
            collapsed={collapsed}
          />
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shadow-sm z-10">
          <h2 className="text-slate-800 font-semibold text-lg capitalize">
            {window.location.pathname.split("/").pop() || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">
                {user?.fullName || "Admin"}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Super Admin
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 border-2 border-white shadow-md" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminLink({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
            : "hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && (
        <span className="font-medium whitespace-nowrap">{label}</span>
      )}
    </NavLink>
  );
}

export default AdminLayout;
