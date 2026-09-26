import { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  Type,
  MessageSquare,
  LocateFixed,
} from "lucide-react";
import { complaintsApi } from "../services/complaintsApi";
import { useLocation } from "../../../context/useLocation";

function ComplaintFormCard() {
  const {
    userLocation,
    locationAddress,
    loading: locationLoading,
    error: locationError,
    getCurrentLocation,
  } = useLocation();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    location: {
      address: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    },
    phone: "",
    incidentDate: "",
  });

  useEffect(() => {
    if (locationAddress) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          address: locationAddress,
        },
      }));
    }
  }, [locationAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationAddressChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userLocation) {
      alert(
        "Your current location could not be detected. Please allow location access and try again.",
      );

      getCurrentLocation();
      return;
    }

    setLoading(true);

    try {
      const complaintData = {
        title: formData.title,
        description: formData.description,
        department: formData.department,

        location: {
          address: formData.location.address,
          coordinates: {
            lat: userLocation.lat,
            lng: userLocation.lng,
          },
        },

        phone: formData.phone,
        incidentDate: formData.incidentDate,
      };

      console.log("Submitting complaint:", complaintData);

      await complaintsApi.create(complaintData);

      alert("Complaint submitted successfully!");

      window.dispatchEvent(new Event("complaintSubmitted"));

      setFormData({
        title: "",
        description: "",
        department: "",
        location: {
          address: "",
          coordinates: {
            lat: null,
            lng: null,
          },
        },
        phone: "",
        incidentDate: "",
      });
    } catch (err) {
      console.error("Submission Error:", err);

      alert(
        err.message || "Server error. Please check if the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Complaint Title (Short Summary) *"
            name="title"
            placeholder="e.g. Broken Streetlight"
            icon={Type}
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Field
            label="Mobile number *"
            name="phone"
            placeholder="+91..."
            icon={Phone}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <SelectField
            label="Department / Category *"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={[
              "Water",
              "Electricity",
              "Police",
              "Fire",
              "Garbage",
              "PWD",
              "Sewer",
              "Traffic",
            ]}
            required
          />

          <Field
            label="Incident Date *"
            name="incidentDate"
            icon={Calendar}
            type="date"
            value={formData.incidentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-600">
            Detailed Location *
          </label>

          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              name="location"
              type="text"
              value={formData.location.address}
              onChange={handleLocationAddressChange}
              placeholder="Address / Landmark"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-32 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-sky-500/60"
            />

            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-medium hover:bg-indigo-700 disabled:bg-slate-400"
            >
              <LocateFixed size={12} />

              {locationLoading ? "Detecting..." : "Use Current"}
            </button>
          </div>

          {locationError && (
            <p className="text-[10px] text-red-500">{locationError}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-600">
            Description *
          </label>

          <div className="relative group">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what happened in detail..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-3 pt-2.5 pb-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500/60 outline-none"
              required
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading || locationLoading}
            className={`px-6 py-2 rounded-xl text-xs font-semibold text-white transition-all ${
              loading || locationLoading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-400 shadow-md"
            }`}
          >
            {loading
              ? "Processing..."
              : locationLoading
                ? "Detecting Location..."
                : "Submit Complaint"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  icon,
  type = "text",
  value,
  onChange,
  required,
}) {
  const IconComponent = icon;

  return (
    <div className="space-y-1">
      <label className="text-[11px] font-medium text-slate-600">{label}</label>

      <div className="relative">
        <IconComponent className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-sky-500/60"
        />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-medium text-slate-600">{label}</label>

      <div className="relative">
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 pl-3 pr-8 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-sky-500/60"
        >
          <option value="" disabled>
            Select Department
          </option>

          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ComplaintFormCard;
