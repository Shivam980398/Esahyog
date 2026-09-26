import { useState } from "react";
import { Contact, Phone, Mail, User, Lock } from "lucide-react";
import FormCard from "../ui/FormCard.jsx";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import SecondaryButton from "../ui/SecondaryButton.jsx";
import { authApi } from "../../services/authApi.js";
import { useAuth } from "../../features/auth/useAuth";

function StepOne({ onNext, onBack }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);

  const handleSendOtp = async () => {
    if (!formData.email || !formData.password) {
      return alert("Please enter email and password before requesting OTP");
    }

    try {
      setLoadingAction("send-otp");
      await authApi.signup(formData);
      setEmailOtpVisible(true);
      alert("OTP sent to email!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleVerifyAndNext = async () => {
    if (!otp) return alert("Please enter the OTP sent to your email");

    try {
      setLoadingAction("verify-otp");
      const data = await authApi.verifyOtp({ email: formData.email, otp });
      login({ token: data.token, user: data.user });
      onNext();
    } catch (err) {
      console.error(err);
      alert(err.message || "Invalid OTP");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <FormCard
        icon={<Contact className="w-4 h-4 text-accent" />}
        title="Personal Details"
      >
        <div className="mb-4">
          <label className="block text-xs font-medium text-muted mb-1.5">
            Full Name
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
            <User className="w-4 h-4 text-muted" />
            <input
              type="text"
              className="w-full text-sm outline-none"
              placeholder="Enter full name"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-muted mb-1.5">
            Email Address
          </label>
          <div className="flex gap-2 items-center px-3 py-2.5 rounded-md border border-card bg-white">
            <Mail className="w-4 h-4 text-muted" />
            <input
              type="email"
              className="flex-1 text-sm outline-none"
              placeholder="name@example.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <PrimaryButton
              type="button"
              className="px-3 py-2 text-xs"
              disabled={loadingAction === "send-otp"}
              onClick={handleSendOtp}
            >
              {loadingAction === "send-otp"
                ? "Sending..."
                : emailOtpVisible
                  ? "Resend"
                  : "Send OTP"}
            </PrimaryButton>
          </div>
          {emailOtpVisible && (
            <input
              type="text"
              placeholder="Enter email OTP"
              className="mt-3 w-full px-3 py-2.5 rounded-md border border-card text-sm outline-none"
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-muted mb-1.5">
            Create Password
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
            <Lock className="w-4 h-4 text-muted" />
            <input
              type="password"
              className="w-full text-sm outline-none"
              placeholder="Min 6 characters"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-muted mb-1.5">
            Mobile Number
          </label>
          <div className="flex gap-2 items-center px-3 py-2.5 rounded-md border border-card bg-white">
            <Phone className="w-4 h-4 text-muted" />
            <input
              type="tel"
              className="flex-1 text-sm outline-none"
              placeholder="10 digit number"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PrimaryButton
            className="w-full border border-card"
            disabled={loadingAction === "verify-otp"}
            onClick={handleVerifyAndNext}
          >
            {loadingAction === "verify-otp" ? "Verifying..." : "Next"}
          </PrimaryButton>
          <SecondaryButton
            className="w-full border border-card"
            onClick={onBack}
          >
            Go to Login
          </SecondaryButton>
        </div>
      </FormCard>
    </div>
  );
}

export default StepOne;
