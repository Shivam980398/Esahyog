import { useEffect, useRef, useState } from "react";
import {
  Camera,
  ChevronDown,
  IdCard,
  LogOut,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { authApi } from "../../../services/authApi";
import { useAuth } from "../../../features/auth/useAuth";

const ProfileMenu = ({ compact = false }) => {
  const { user, setUser, handleLogout, getProfileImgUrl } = useAuth();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  if (!user) return null;

  const displayName = user.fullName || user.username || "User";
  const profileImageUrl = user.profileImage
    ? getProfileImgUrl(user.profileImage)
    : null;

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    if (user.username) formData.append("username", user.username);
    if (user.dob) formData.append("dob", user.dob);
    formData.append("profileImage", file);

    try {
      setUploading(true);
      const response = await authApi.updateProfile(formData);
      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      console.error("Profile image update failed:", error);
      alert(error.message || "Failed to update profile image");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-2 py-1.5 text-left hover:bg-slate-700/80 transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Avatar src={profileImageUrl} name={displayName} />
        {!compact && (
          <span className="max-w-44 truncate text-sm font-medium text-slate-200">
            {displayName}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 text-sky-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[6000] mt-3 w-80 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 text-slate-100 shadow-2xl"
        >
          <div className="border-b border-slate-800 p-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar src={profileImageUrl} name={displayName} size="lg" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute -bottom-1 -right-1 rounded-full border border-slate-700 bg-sky-500 p-1.5 text-white shadow hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600"
                  title="Edit profile image"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{displayName}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {user.role || "citizen"}
                  {user.department ? ` - ${user.department}` : ""}
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="mt-2 text-xs font-medium text-sky-300 hover:text-sky-200 disabled:text-slate-500"
                >
                  {uploading ? "Uploading image..." : "Edit image"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Details
            </p>
            <Detail icon={Mail} label="Email" value={user.email} />
            <Detail icon={Phone} label="Phone" value={user.phone} />
            <Detail
              icon={IdCard}
              label="Username"
              value={user.username || user.fullName}
            />
            <Detail
              icon={MapPin}
              label="Address"
              value={[user.address, user.area, user.district]
                .filter(Boolean)
                .join(", ")}
            />
          </div>

          <div className="border-t border-slate-800 p-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Avatar = ({ src, name, size = "sm" }) => {
  const dimension = size === "lg" ? "h-14 w-14" : "h-8 w-8";

  return (
    <div
      className={`${dimension} flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-sky-400/30 bg-sky-500`}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} profile`}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <User className={size === "lg" ? "h-6 w-6" : "h-4 w-4"} />
      )}
    </div>
  );
};

const Detail = ({ icon, label, value }) => {
  const IconComponent = icon;

  return (
    <div className="flex gap-3 rounded-lg bg-slate-900/80 px-3 py-2">
      <IconComponent className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="truncate text-xs text-slate-200">
          {value || "Not added"}
        </p>
      </div>
    </div>
  );
};

export default ProfileMenu;
