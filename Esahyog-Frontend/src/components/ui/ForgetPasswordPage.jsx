import { useState } from "react";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import PrimaryButton from "./PrimaryButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";
import FormCard from "./FormCard.jsx";

import { authApi } from "../../services/authApi.js";
import { useNavigate } from "react-router-dom";
import AuthBackground from "../../features/auth/AuthBackground.jsx";

function ForgotPasswordPage() {
  const [method, setMethod] = useState("email");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpVisible, setOtpVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const goBackToLogin = () => {
    navigate("/login");
  };

  const handleSendOtp = async () => {
    if (method !== "email") {
      return alert("Mobile recovery is not available yet. Please use email.");
    }

    if (!email.trim()) {
      return alert("Please enter your registered email");
    }

    try {
      setLoading(true);

      await authApi.forgotPassword({
        email: email.trim(),
      });

      setOtpVisible(true);
      setOtpVerified(false);
      setOtp("");
      alert("OTP sent to your email!");
    } catch (err) {
      alert(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      return alert("Please enter the OTP");
    }

    try {
      setLoading(true);

      await authApi.verifyResetOtp({
        email: email.trim(),
        otp: otp.trim(),
      });

      setOtpVerified(true);
      alert("OTP verified successfully!");
    } catch (err) {
      alert(err.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return alert("Please enter both password fields");
    }

    if (newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      await authApi.resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      alert("Password reset successful!");

      setEmail("");
      setNumber("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setOtpVisible(false);
      setOtpVerified(false);
      goBackToLogin();
    } catch (err) {
      alert(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-1.5">
      <AuthBackground>
        <FormCard
          icon={<ShieldCheck className="w-4 h-4 text-accent mb-0 pb-0" />}
          title="Forgot password"
        >
          <div className="min-h-[70vh] bg-shell flex px-2 bg">
            <div
              className="
    w-full max-w-sm
    rounded-2xl
    border border-white/40
    bg-white/5
    backdrop-blur-lg
    shadow-[0_18px_45px_rgba(15,23,42,0.18)]
    p-6
  "
            >
              <p className="text-xs text-muted mb-5">
                Recover your SmartCity account using email or mobile
              </p>

              {!otpVisible && (
                <>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-muted mb-1.5">
                      Choose recovery method
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMethod("email")}
                        className={`flex-1 px-3 py-2.5 rounded-md border text-xs ${
                          method === "email"
                            ? "border-card bg-white text-muted"
                            : "border-accent bg-accent/10 text-main"
                        }`}
                      >
                        Email address
                      </button>

                      <button
                        type="button"
                        onClick={() => setMethod("mobile")}
                        className={`flex-1 px-3 py-2.5 rounded-md border text-xs ${
                          method === "mobile"
                            ? "border-card bg-white text-muted"
                            : "border-accent bg-accent/10 text-main"
                        }`}
                      >
                        Mobile number
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-medium text-muted mb-1.5">
                      {method === "email" ? "Email address" : "Mobile number"}
                    </label>

                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
                      {method === "email" ? (
                        <Mail className="w-4 h-4 text-muted" />
                      ) : (
                        <Phone className="w-4 h-4 text-muted" />
                      )}

                      <input
                        type={method === "email" ? "email" : "tel"}
                        placeholder={
                          method === "email"
                            ? "Enter registered email"
                            : "Enter registered mobile"
                        }
                        className="flex-1 text-sm outline-none"
                        value={method === "email" ? email : number}
                        onChange={
                          method === "email"
                            ? (e) => setEmail(e.target.value)
                            : (e) => setNumber(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <PrimaryButton
                    className="w-full border border-card mt-2"
                    disabled={loading}
                    onClick={handleSendOtp}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </PrimaryButton>
                </>
              )}

              {otpVisible && !otpVerified && (
                <>
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-muted mb-1.5">
                      Enter OTP
                    </label>

                    <input
                      type="text"
                      placeholder="Enter 6 digit OTP"
                      className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                  </div>

                  <PrimaryButton
                    className="w-full border border-card mt-4"
                    disabled={loading}
                    onClick={handleVerifyOtp}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </PrimaryButton>
                </>
              )}

              {otpVerified && (
                <>
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-muted mb-1.5">
                      New Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-muted mb-1.5">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <PrimaryButton
                    className="w-full border border-card mt-4"
                    disabled={loading}
                    onClick={handleResetPassword}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </PrimaryButton>
                </>
              )}

              <div className="flex items-center justify-between mt-4 text-xs">
                <SecondaryButton
                  className="px-3 py-1.5 text-xs border border-card"
                  onClick={goBackToLogin}
                >
                  Back to login
                </SecondaryButton>
              </div>
            </div>
          </div>
        </FormCard>
      </AuthBackground>
    </div>
  );
}

export default ForgotPasswordPage;
