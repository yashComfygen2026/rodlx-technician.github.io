import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2 2.3z"
        fill="black"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="black" strokeWidth="1.8" />
      <path d="M4 6.5l8 6 8-6" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NewJobRequest() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="screen">
      <div className="flex items-center justify-between px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="text-white w-9 h-9 flex items-center justify-center -ml-2"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-white font-poppins font-semibold text-lg">New Job Request</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-red font-poppins font-semibold text-sm"
        >
          Decline
        </button>
      </div>

      <div className="mx-4 mt-2 bg-white rounded-3xl p-5">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M4 16v-2.5L5.5 9a2 2 0 0 1 1.9-1.4h9.2A2 2 0 0 1 18.5 9L20 13.5V16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.5H7V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
                stroke="#dc0804"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle cx="7.5" cy="16.5" r="1.4" fill="#dc0804" />
              <circle cx="16.5" cy="16.5" r="1.4" fill="#dc0804" />
            </svg>
          </span>
          <span className="text-red font-poppins font-bold text-xs tracking-wider">
            ROADSIDE ASSISTANCE
          </span>
        </div>

        <h2 className="text-black font-poppins font-bold text-2xl mt-3">Jump Start</h2>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-emerald-600 font-poppins font-bold text-2xl">$80.00</span>
          <span className="text-gray-400 font-poppins text-sm">+ $10.00 (2.4 mi)</span>
        </div>

        <div className="flex items-stretch border border-gray-200 rounded-xl mt-4">
          <div className="flex-1 flex items-center gap-2 px-4 py-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
              <rect x="6" y="3" width="12" height="18" rx="2" stroke="black" strokeWidth="1.6" />
              <path d="M9 7h6" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-black font-poppins font-bold text-sm">2.4 mi</p>
              <p className="text-gray-400 font-poppins text-xs">Distance</p>
            </div>
          </div>
          <div className="w-px bg-gray-200 my-2" />
          <div className="flex-1 flex items-center gap-2 px-4 py-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
              <circle cx="12" cy="12" r="8.5" stroke="black" strokeWidth="1.6" />
              <path d="M12 8v4l2.5 2" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-black font-poppins font-bold text-sm">12 min</p>
              <p className="text-gray-400 font-poppins text-xs">Est. Time</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 border border-gray-200 rounded-xl mt-4 p-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mt-0.5 shrink-0">
            <path
              d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"
              fill="#dc0804"
            />
            <circle cx="12" cy="9.5" r="2.3" fill="white" />
          </svg>
          <div>
            <p className="text-black font-poppins font-bold text-sm">1234 Westheimer Rd</p>
            <p className="text-black font-poppins font-bold text-sm">Houston, TX 77006</p>
            <p className="text-blue-500 font-poppins text-sm mt-1">Near Waterwall Park</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-gray-400 font-poppins text-sm">Customer</p>
            <p className="text-black font-poppins font-bold text-base">John Doe</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <PhoneIcon />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <MailIcon />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-400 font-poppins text-sm">Vehicle</p>
          <p className="text-black font-poppins font-bold text-base">Toyota Camry &middot; Silver &middot; 2020</p>
        </div>

        <button
          onClick={() => navigate("/jobs/details")}
          className="w-full bg-red rounded-xl mt-5 py-4 flex items-center justify-between px-6 active:scale-[0.98] transition"
        >
          <span className="text-white font-poppins font-bold text-base">Accept Job</span>
          <span className="text-white font-poppins font-bold text-base tabular-nums">
            {mm}:{ss}
          </span>
        </button>
      </div>
    </div>
  );
}
