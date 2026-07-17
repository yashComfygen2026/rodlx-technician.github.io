import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
      <path
        d="M2 15V8a1 1 0 0 1 1-1h9v8H3a1 1 0 0 1-1-1z"
        stroke="black"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 10h5l4 3v2a1 1 0 0 1-1 1h-8"
        stroke="black"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="16.5" r="1.6" stroke="black" strokeWidth="1.4" />
      <circle cx="16.5" cy="16.5" r="1.6" stroke="black" strokeWidth="1.4" />
    </svg>
  );
}

export default function JobDetails() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <Header title="Job Details" right={<span className="text-muted-light font-poppins text-sm">Help</span>} />

      <div className="flex justify-center pb-4">
        <span className="bg-emerald-600 text-white font-poppins font-bold text-xs tracking-wide rounded-full px-4 py-1.5">
          IN PROGRESS
        </span>
      </div>

      <div className="mx-4 bg-white rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 font-poppins text-sm">Customer</p>
            <p className="text-black font-poppins font-bold text-lg">John Doe</p>
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

        <div className="flex items-start justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-gray-400 font-poppins text-sm">Location</p>
            <p className="text-black font-poppins font-bold text-base">1234 Westheimer Rd</p>
            <p className="text-black font-poppins font-bold text-base">Houston, TX 77006</p>
          </div>
          <button className="text-red font-poppins font-semibold text-sm flex items-center gap-1 shrink-0">
            Get Directions
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path d="M9 6l6 6-6 6" stroke="#dc0804" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-400 font-poppins text-sm">Service</p>
          <p className="text-black font-poppins font-bold text-base">Jump Start</p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-gray-400 font-poppins text-sm">Vehicle</p>
            <p className="text-black font-poppins font-bold text-base">Toyota Camry</p>
            <p className="text-black font-poppins font-bold text-base">Silver &middot; 2020</p>
          </div>
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <TruckIcon />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-400 font-poppins text-sm">Notes from Customer</p>
          <p className="text-black font-poppins font-bold text-base">My car won&apos;t start. Please help.</p>
        </div>

        <button
          onClick={() => navigate("/jobs/in-progress")}
          className="w-full bg-red rounded-xl mt-5 py-4 flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-white font-poppins font-bold text-base">Start Service</span>
        </button>

        <button className="w-full border border-gray-300 rounded-xl mt-3 py-4 flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M12 3l10 18H2L12 3z" stroke="black" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M12 10v4" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="17" r="0.9" fill="black" />
          </svg>
          <span className="text-black font-poppins font-semibold text-base">Report an Issue</span>
        </button>
      </div>
    </div>
  );
}
