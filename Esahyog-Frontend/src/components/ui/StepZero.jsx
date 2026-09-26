import { useState } from "react";
import { User, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";
import FormCard from "./FormCard.jsx";
import { authApi } from "../../services/authApi.js";
import { useAuth } from "../../features/auth/useAuth";

function LoginPage({ onRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields");

    try {
      setLoading(true);
      const data = await authApi.login({ email, password });
      login({ token: data.token, user: data.user });

      const role = data.role || data.user?.role;
      const department = data.user?.department;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "officer" && department) {
        const deptRoute = department.toLowerCase();
        navigate(`/${deptRoute}departmentDashboard`);
      } else {
        navigate("/dashboard");
      }

      alert("Login Successful!");
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center w-full">
      <FormCard
        icon={<ShieldCheck className="w-4 h-4 text-accent" />}
        title="Welcome back"
      >
        <p className="text-xs text-muted mb-5">
          Login with your SmartCity account
        </p>

        <div className="w-full max-w-sm">
          <div className="mb-5">
            <label className="block text-xs font-medium text-muted mb-1.5">
              Email
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
              <User className="w-4 h-4 text-muted" />
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 text-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-medium text-muted mb-1.5">
              Password
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
              <Lock className="w-4 h-4 text-muted" />
              <input
                type="password"
                placeholder="Enter password"
                className="flex-1 text-sm outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-medium text-muted mb-1.5">
              Captcha
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="AB7K9"
                className="flex-1 px-3 py-2.5 rounded-md border border-card text-sm outline-none"
              />
              <div className="px-3 py-2.5 rounded-md border border-card bg-slate-50 text-xs text-main">
                AB7K9
              </div>
            </div>
          </div>

          <PrimaryButton
            className="w-full border border-card mt-2"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </PrimaryButton>

          <div className="flex items-center justify-between text-xs mt-4">
            <button
              onClick={() => navigate("/forgetpassword")}
              className="text-accent hover:underline"
            >
              Forgot password?
            </button>
            <SecondaryButton
              className="px-3 py-1.5 text-xs border border-card"
              onClick={onRegister}
            >
              Register
            </SecondaryButton>
          </div>
        </div>
      </FormCard>
    </div>
  );
}

export default LoginPage;
