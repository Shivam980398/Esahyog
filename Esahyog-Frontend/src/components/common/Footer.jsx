import { Building2, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

const Footer = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  return (
    <footer className="px-10 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-slate-500 bg-white border-t border-slate-100">
      <div className="flex items-center gap-2">
        <Building2 className="w-5 h-5 text-cyan-500" />
        <span className="font-semibold text-slate-700">SmartCity Connect</span>
      </div>

      <div className="flex gap-2">
        {user ? (
          <LogIn
            onClick={handleLogout}
            className="w-4 h-4 hover:text-sky-600 cursor-pointer transition-colors duration-150"
          />
        ) : (
          <UserPlus
            onClick={() => navigate("/login")}
            className="w-4 h-4 hover:text-sky-600 cursor-pointer transition-colors duration-150"
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
