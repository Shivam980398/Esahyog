import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdCard, MapPin, Globe, Building } from "lucide-react";
import FormCard from "../ui/FormCard.jsx";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import SecondaryButton from "../ui/SecondaryButton.jsx";
import { authApi } from "../../services/authApi.js";
import { useAuth } from "../../features/auth/useAuth";

function StepThree({ onBack }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    idType: "Aadhaar",
    idNumber: "",
    address: "",
    wardNo: "",
    area: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic frontend validation
    if (!data.idNumber || !data.address || !data.pincode) {
      alert("Please fill in required fields (ID, Address, and Pincode)");
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.updateIdentity(data);

      if (response.success) {
        setUser(response.user);

        alert("Registration Complete!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Identity Error:", error.message);
      alert(error.message || "Error saving identity details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      icon={<IdCard className="w-4 h-4 text-accent" />}
      title="Final Step: Identity & Address"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            name="idType"
            value={data.idType}
            className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none focus:ring-2 focus:ring-accent"
            onChange={handleChange}
          >
            <option value="Aadhaar">Aadhaar</option>
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
            <option value="Voter ID">Voter ID</option>
          </select>
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none focus:ring-2 focus:ring-accent"
            onChange={handleChange}
          />
        </div>

        {/* Address Textarea */}
        <textarea
          name="address"
          placeholder="House No, Building, Street Name"
          className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none focus:ring-2 focus:ring-accent"
          rows={2}
          onChange={handleChange}
        />

        {/* Ward and Area Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
            <Building className="w-4 h-4 text-muted" />
            <input
              type="text"
              name="wardNo"
              placeholder="Ward No"
              className="w-full text-sm outline-none"
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="area"
            placeholder="Area / Locality"
            className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none"
            onChange={handleChange}
          />
        </div>

        {/* District and State Row */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="district"
            placeholder="District"
            className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none"
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-full px-3 py-2.5 rounded-md border border-card bg-white text-sm outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Country and Pincode Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-slate-50">
            <Globe className="w-4 h-4 text-muted" />
            <input
              type="text"
              name="country"
              value={data.country}
              disabled
              className="w-full text-sm bg-transparent outline-none text-muted"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-card bg-white">
            <MapPin className="w-4 h-4 text-muted" />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="w-full text-sm outline-none"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <PrimaryButton disabled={loading} onClick={handleSubmit}>
          {loading ? "Saving..." : "Complete"}
        </PrimaryButton>
      </div>
    </FormCard>
  );
}

export default StepThree;
