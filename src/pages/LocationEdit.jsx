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

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"
        fill="#dc0804"
      />
      <circle cx="12" cy="9.5" r="2.3" fill="white" />
    </svg>
  );
}

export default function LocationEdit() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState(["Brooklyn", "Manhattan", "Queens", "Texas"]);
  const [newArea, setNewArea] = useState("");
  const [radius, setRadius] = useState(25);

  const removeArea = (name) => setAreas((prev) => prev.filter((a) => a !== name));
  const addArea = () => {
    const trimmed = newArea.trim();
    if (!trimmed) return;
    setAreas((prev) => [...prev, trimmed]);
    setNewArea("");
  };

  return (
    <div className="screen">
      <Header title="My Profile" right={<HelpIcon />} />
      <Tabs active="location" />

      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-white font-poppins font-bold text-lg">Services Area</h2>
        <span className="text-red font-poppins font-semibold text-sm">Edit</span>
      </div>

      <div className="mx-4 bg-white rounded-3xl p-2">
        {areas.map((area, i) => (
          <div
            key={area}
            className={`flex items-center gap-3 px-3 py-3.5 ${
              i !== areas.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <span className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center shrink-0">
              <PinIcon />
            </span>
            <span className="flex-1 text-black font-poppins font-bold text-base">{area}</span>
            <button
              onClick={() => removeArea(area)}
              aria-label={`Remove ${area}`}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-5">
        <label className="text-white font-poppins font-bold text-sm">Add Service Area</label>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Enter a city or zip code"
            className="flex-1 bg-card border border-card-border rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder-muted-light outline-none min-w-0"
          />
          <button
            onClick={addArea}
            className="px-5 rounded-xl bg-red text-white font-poppins font-semibold text-sm shrink-0"
          >
            Add
          </button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <label className="text-white font-poppins font-bold text-sm">Search Radius</label>
          <span className="text-red font-poppins font-bold text-sm">{radius} mi</span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full mt-3 accent-red"
        />
      </div>

      <div className="px-5 pt-6 pb-8 mt-auto">
        <Button variant="primary" onClick={() => navigate("/profile")}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
