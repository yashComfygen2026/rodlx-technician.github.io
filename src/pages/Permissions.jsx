import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";

const ICONS = {
  location: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="white" strokeWidth="1.6" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-1.6A1.5 1.5 0 0 1 9.8 4.6h4.4a1.5 1.5 0 0 1 1.3.8L16.5 7h2A1.5 1.5 0 0 1 20 8.5v8A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-8z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.3" r="3" stroke="white" strokeWidth="1.6" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M6 10.5a6 6 0 0 1 12 0c0 4 1.2 5.5 1.2 5.5H4.8S6 14.5 6 10.5z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.3 19a1.7 1.7 0 0 0 3.4 0"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  contacts: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect
        x="5"
        y="3.5"
        width="14"
        height="17"
        rx="2"
        stroke="white"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2" stroke="white" strokeWidth="1.6" />
      <path
        d="M8.5 15.5c.7-1.3 2-2 3.5-2s2.8.7 3.5 2"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const PERMISSIONS = [
  {
    key: "location",
    icon: "location",
    title: "Location",
    description:
      "Used to find the nearest service station and track your technician in real-time.",
  },
  {
    key: "camera",
    icon: "camera",
    title: "Camera Access",
    description:
      "Allows you to scan your car's VIN or take photos of damage for service reports.",
  },
  {
    key: "notifications",
    icon: "bell",
    title: "Notifications",
    description:
      "Stay updated with service status, appointment reminders, and exclusive offers.",
  },
  {
    key: "contacts",
    icon: "contacts",
    title: "Contacts Access",
    description:
      "Used to share your live location with emergency contacts or service providers.",
  },
];

function Toggle({ on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={`relative w-12 h-7 rounded-full px-1 transition-colors shrink-0 ${
        on ? "bg-red" : "bg-card-border"
      }`}
    >
      <span
        className={`block w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function Permissions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    location: true,
    camera: true,
    notifications: true,
    contacts: true,
  });

  const toggle = (key) =>
    setState((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="screen">
      <div className="flex items-center px-4 pt-6 pb-4 relative">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="text-white w-9 h-9 flex items-center justify-center -ml-2 z-10"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo size="sm" />
        </div>
      </div>

      <div className="px-6 pt-4 flex-1 flex flex-col">
        <h1 className="text-white font-poppins font-bold text-3xl">
          Access &amp; Permission
        </h1>
        <p className="text-muted-light font-poppins text-sm mt-3 leading-relaxed">
          To provide you with the best car care experience, we need your
          permission for the following features.
        </p>

        <div className="flex flex-col gap-6 mt-8">
          {PERMISSIONS.map((p) => (
            <div key={p.key} className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 shrink-0">{ICONS[p.icon]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-poppins font-bold text-base">
                  {p.title}
                </p>
                <p className="text-muted-light font-poppins text-sm mt-1 leading-relaxed">
                  {p.description}
                </p>
              </div>
              <Toggle on={state[p.key]} onToggle={() => toggle(p.key)} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 mt-auto pt-6">
        <Button
          variant="primary"
          onClick={() => navigate("/personal-details", { state: location.state })}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
