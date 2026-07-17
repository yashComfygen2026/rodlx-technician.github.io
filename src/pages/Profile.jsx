import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { authApi } from "../lib/authApi";
import { useAuth } from "../context/AuthContext";

const settingsRows = [
  { label: "Personal Information", icon: "person", to: "/profile/edit" },
  { label: "Documents", icon: "doc" },
  { label: "Service Areas", icon: "pin", to: "/profile/service" },
  { label: "Payout Information", icon: "wallet" },
  { label: "App Settings", icon: "gear" },
  { label: "Help & Support", icon: "help" },
];

function SettingsIcon({ type }) {
  const common = { viewBox: "0 0 24 24", fill: "none", className: "w-5 h-5 text-navy shrink-0" };
  if (type === "person") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "doc") {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "pin") {
    return (
      <svg {...common}>
        <path
          d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "wallet") {
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M15.5 12.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "gear") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "help") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M9.5 9.3a2.5 2.5 0 114 2c-.9.7-1.5 1.2-1.5 2.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  return null;
}

function initials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    authApi
      .getProfile()
      .then((result) => {
        setUser(result.user);
        setProfile(result.profile);
      })
      .catch(() => {
        // Silently keep the placeholder view if the profile fetch fails.
      });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="screen">
      <Header
        title="Profile"
        right={
          <button
            aria-label="Settings"
            className="text-white w-9 h-9 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        }
      />

      <div className="px-4 flex flex-col items-center text-center mt-2">
        <div className="w-20 h-20 rounded-full bg-card-border flex items-center justify-center text-white font-poppins font-semibold text-xl">
          {initials(user?.fullName)}
        </div>
        <p className="text-white font-poppins font-bold text-xl mt-3">
          {user?.fullName || "..."}
        </p>
        <p className="text-white font-poppins text-sm mt-1 flex items-center gap-1">
          <span className="text-yellow-400">★</span> {Number(profile?.rating || 0).toFixed(1)}
        </p>
        {profile?.status === "active" ? (
          <p className="text-green-500 font-poppins font-medium text-sm mt-1.5 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            Verified Technician
          </p>
        ) : (
          <p className="text-amber-500 font-poppins font-medium text-sm mt-1.5">
            Application {profile?.status === "suspended" ? "suspended" : "under review"}
          </p>
        )}
      </div>

      <div className="px-4 mt-6 mb-4">
        <div className="bg-white rounded-3xl overflow-hidden px-4">
          {settingsRows.map((row, i) => (
            <button
              key={row.label}
              onClick={() => row.to && navigate(row.to)}
              className={`w-full flex items-center gap-3 py-4 text-left active:bg-gray-50 ${
                i !== settingsRows.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <SettingsIcon type={row.icon} />
              <span className="flex-1 font-poppins font-bold text-navy text-[15px]">
                {row.label}
              </span>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400 shrink-0">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-4 text-left border-t border-gray-100 active:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-red shrink-0">
              <path
                d="M4 12a8 8 0 1114.3 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M18 8v5h-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-red font-poppins font-bold text-[15px]">Logout</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
