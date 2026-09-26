import { useState } from "react";
import { X, UserPlus, Shield, Mail, Phone } from "lucide-react";
import { adminApi } from "../../services/adminApi";

function AddOfficerModal({ isOpen, onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    department: "Water",
    role: "officer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminApi.addOfficer(formData);
      alert("Officer created successfully!");
      onRefresh();
      onClose();
    } catch (err) {
      alert(err.message || "System Error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500 rounded-lg">
              <UserPlus size={20} />
            </div>
            <h3 className="font-bold text-lg">Register New Officer</h3>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/10 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputGroup
            label="Full Name"
            icon={<UserPlus size={16} />}
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(val) => setFormData({ ...formData, fullName: val })}
          />

          <InputGroup
            label="Email Address"
            icon={<Mail size={16} />}
            type="email"
            placeholder="john@city.gov"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
          />

          <InputGroup
            label="Password"
            icon={<Shield size={16} />}
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(val) => setFormData({ ...formData, password: val })}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              label="Phone"
              icon={<Phone size={16} />}
              type="text"
              placeholder="9876543210"
              value={formData.phone}
              onChange={(val) => setFormData({ ...formData, phone: val })}
            />

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Department
              </label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500/20"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="PWD">PWD (Roads)</option>
                <option value="Fire">Fire</option>
                <option value="Garbage">Garbage</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 transition-all active:scale-[0.98] mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

function InputGroup({ label, icon, type, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
          {icon}
        </div>
        <input
          required
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>
    </div>
  );
}

export default AddOfficerModal;
