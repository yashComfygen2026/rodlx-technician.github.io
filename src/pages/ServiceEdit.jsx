import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.5 9.3a2.5 2.5 0 1 1 3.6 2.3c-.7.4-1.1.8-1.1 1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

function Tabs({ active }) {
  const navigate = useNavigate();
  const items = [
    { key: "info", label: "Information", path: "/profile/edit" },
    { key: "services", label: "Services", path: "/profile/service" },
    { key: "location", label: "Location", path: "/profile/location" },
  ];
  return (
    <div className="mx-4 mt-2 bg-card border border-card-border rounded-full flex p-1">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => navigate(it.path)}
          className={`flex-1 py-2.5 rounded-full font-poppins font-semibold text-sm transition ${
            active === it.key ? "bg-red text-white" : "text-muted-light"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

const ICONS = {
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M13 2L4 14h6l-1 8 10-12h-6l1-8z" fill="#dc0804" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M4 16v-2.5L5.5 9a2 2 0 0 1 1.9-1.4h9.2A2 2 0 0 1 18.5 9L20 13.5V16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.5H7V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
        fill="#dc0804"
      />
      <circle cx="7.5" cy="16.5" r="1.3" fill="white" />
      <circle cx="16.5" cy="16.5" r="1.3" fill="white" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z" fill="#dc0804" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="8" cy="8" r="4" stroke="#dc0804" strokeWidth="1.8" />
      <path d="M11 11l9 9M16 16l2.5 2.5M18.5 13.5L21 16" stroke="#dc0804" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  battery: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="3" y="8" width="16" height="8" rx="1.5" stroke="#dc0804" strokeWidth="1.6" />
      <path d="M20 10.5v3" stroke="#dc0804" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 10v4M13 10v4" stroke="#dc0804" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" stroke="#dc0804" strokeWidth="1.6" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"
        stroke="#dc0804"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const SERVICES = [
  { key: "jump", icon: "bolt", name: "Jump Start" },
  { key: "tire", icon: "car", name: "Flat Tire Change" },
  { key: "fuel", icon: "drop", name: "Fuel Delivery" },
  { key: "lockout", icon: "key", name: "Lockout Service" },
  { key: "battery", icon: "battery", name: "Battery Replacement" },
  { key: "inspection", icon: "gear", name: "Mechanical Inspection" },
];

export default function ServiceEdit() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(
    SERVICES.reduce((acc, s) => ({ ...acc, [s.key]: true }), {})
  );

  const toggle = (key) => setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  const count = Object.values(selected).filter(Boolean).length;

  return (
    <div className="screen">
      <Header title="My Profile" right={<HelpIcon />} />
      <Tabs active="services" />

      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-white font-poppins font-bold text-lg">Services ({count})</h2>
        <span className="text-red font-poppins font-semibold text-sm">Edit</span>
      </div>

      <div className="mx-4 bg-white rounded-3xl p-2">
        {SERVICES.map((s, i) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className={`w-full flex items-center gap-3 px-3 py-3.5 ${
              i !== SERVICES.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <span className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center shrink-0">
              {ICONS[s.icon]}
            </span>
            <span className="flex-1 text-left text-black font-poppins font-bold text-base">
              {s.name}
            </span>
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                selected[s.key] ? "bg-red" : "border border-gray-300"
              }`}
            >
              {selected[s.key] && (
                <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="px-5 pt-5 pb-8 mt-auto">
        <Button variant="primary" onClick={() => navigate("/profile")}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
