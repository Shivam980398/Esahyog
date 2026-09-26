import { Building2, Siren } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import ProfileMenu from "../../shared/components/profile/ProfileMenu";

const Header = ({ dashboardName }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-[5000] bg-slate-900 text-white shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between px-10 pt-8 pb-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Building2 className="w-7 h-7 text-cyan-400" />

            <span className="font-semibold text-lg">
              Esahyog-{dashboardName}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/emergency")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-rose-300 border border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-200 transition-colors"
                  title="Emergency Services"
                >
                  <Siren className="w-5 h-5" />

                  <span className="hidden sm:inline">Emergency</span>
                </button>

                <ProfileMenu compact />
              </>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1.5 text-sm border border-slate-500 rounded-lg hover:bg-slate-800"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-1.5 text-sm rounded-lg bg-sky-500 hover:bg-sky-600"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
