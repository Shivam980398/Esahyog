import { useState } from "react";
import { ImageIcon, User, UserLock } from "lucide-react";
import FormCard from "../ui/FormCard.jsx";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import SecondaryButton from "../ui/SecondaryButton.jsx";
import { authApi } from "../../services/authApi.js";
import { useAuth } from "../../features/auth/useAuth";

function StepTwo({ onNext, onBack }) {
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!username || !dob) {
      return alert("Please enter username and date of birth");
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("dob", dob);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      setLoading(true);
      const response = await authApi.updateProfile(formData);

      if (response.success) {
        setUser(response.user);
        onNext();
      }
    } catch (error) {
      console.error("Upload Error:", error.message);
      alert("Failed to update profile info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      icon={<ImageIcon className="w-4 h-4 text-accent" />}
      title="Profile Information"
    >
      <div className="space-y-4 mb-6">
        <div className="mb-5">
          <label className="block text-xs font-medium text-muted mb-1.5">
            Username
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
            <UserLock className="text-sky-500" size={18} />
            <input
              type="text"
              placeholder="Enter username"
              className="w-full text-sm outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-medium text-muted mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full px-3 py-2.5 rounded-md border border-card text-sm outline-none"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-medium text-muted mb-1.5">
            Profile Image
          </label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
            <User className="text-sky-500" size={18} />
            <input
              type="file"
              className="block w-full text-xs text-muted"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <PrimaryButton disabled={loading} onClick={handleNext}>
          {loading ? "Saving..." : "Next"}
        </PrimaryButton>
      </div>
    </FormCard>
  );
}

export default StepTwo;
