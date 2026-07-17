import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PowerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
      <path d="M12 3v8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M7 6a8 8 0 1 0 10 0"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 flex-1">
      {icon}
      <span
        className={`font-poppins text-[10px] font-medium ${
          active ? "text-red" : "text-muted-light"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export default function GoOnline() {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);

  return (
    <div className="screen">
      <div className="flex items-center px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="text-white w-9 h-9 flex items-center justify-center -ml-2"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-white font-poppins font-semibold text-lg -ml-9">
          Go Online
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <div className="absolute inset-6 rounded-full border border-white/5" />
          <button
            onClick={() => setOnline((v) => !v)}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center transition ${
              online ? "bg-emerald-900/40" : "bg-white/5"
            }`}
          >
            <span
              className={`w-20 h-20 rounded-full flex items-center justify-center transition ${
                online ? "bg-emerald-500" : "bg-card border border-card-border"
              }`}
            >
              <PowerIcon />
            </span>
          </button>
        </div>

        <h2 className="text-white font-poppins font-bold text-2xl mt-6">
          {online ? "You are Online" : "You are Offline"}
        </h2>
        <p className="text-muted-light font-poppins text-sm mt-1 text-center">
          {online ? "You will receive job requests" : "Go online to start receiving jobs"}
        </p>
      </div>

      <div className="mx-4 bg-white rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 font-poppins text-sm">Current Service Area</p>
            <p className="text-black font-poppins font-bold text-base mt-0.5">Houston, TX</p>
          </div>
          <button
            onClick={() => navigate("/profile/location")}
            className="text-red font-poppins font-semibold text-sm flex items-center gap-1"
          >
            Change
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path d="M9 6l6 6-6 6" stroke="#dc0804" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div className="flex-1 text-center">
            <p className="text-black font-poppins font-bold text-lg">8.5</p>
            <p className="text-gray-400 font-poppins text-xs mt-0.5">Hours Online</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-black font-poppins font-bold text-lg">92%</p>
            <p className="text-gray-400 font-poppins text-xs mt-0.5">Acceptance Rate</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-black font-poppins font-bold text-lg">4.9</p>
            <p className="text-gray-400 font-poppins text-xs mt-0.5">Rating</p>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-6 mb-6 bg-card border border-card-border rounded-2xl flex items-center px-2 py-3">
        <NavItem
          onClick={() => navigate("/dashboard")}
          active
          label="Dashboard"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9z" stroke="#dc0804" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          }
        />
        <NavItem
          onClick={() => navigate("/jobs")}
          label="Jobs"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <rect x="3.5" y="7.5" width="17" height="12" rx="2" stroke="#8a97a6" strokeWidth="1.6" />
              <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke="#8a97a6" strokeWidth="1.6" />
            </svg>
          }
        />
        <NavItem
          onClick={() => navigate("/earnings")}
          label="Earnings"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <rect x="4" y="3.5" width="16" height="17" rx="1.5" stroke="#8a97a6" strokeWidth="1.6" />
              <path d="M8 8h8M8 12h8M8 16h5" stroke="#8a97a6" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          }
        />
        <NavItem
          onClick={() => navigate("/messages")}
          label="Messages"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M4 5.5h16v10.5a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1z" stroke="#8a97a6" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          }
        />
        <NavItem
          label="More"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="5" cy="12" r="1.5" fill="#8a97a6" />
              <circle cx="12" cy="12" r="1.5" fill="#8a97a6" />
              <circle cx="19" cy="12" r="1.5" fill="#8a97a6" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
