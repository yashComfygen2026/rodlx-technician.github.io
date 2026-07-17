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

export default function JobInProgress() {
  const navigate = useNavigate();

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
        <h1 className="text-white font-poppins font-semibold text-lg">Job In Progress</h1>
        <span className="text-red font-poppins font-bold text-sm">Navigate</span>
      </div>

      <div className="mx-4 bg-card border border-card-border rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-muted-light font-poppins text-xs">ETA to Customer</p>
          <p className="text-white font-poppins font-bold text-base mt-0.5">8 min &middot; 2.4 mi</p>
        </div>
        <span className="w-11 h-11 rounded-full bg-red flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <path d="M12 2L4 21l8-4 8 4-8-19z" />
          </svg>
        </span>
      </div>

      <div
        className="flex-1 mx-4 my-4 rounded-2xl bg-navy-light min-h-[280px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1c3049 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="bg-white rounded-t-3xl px-5 pt-5 pb-6 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-poppins font-bold text-gray-600 text-sm shrink-0">
              JD
            </span>
            <div>
              <p className="text-black font-poppins font-bold text-base">John Doe</p>
              <p className="text-gray-400 font-poppins text-sm flex items-center gap-1 mt-0.5">
                <svg viewBox="0 0 24 24" fill="#f59e0b" className="w-3.5 h-3.5">
                  <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z" />
                </svg>
                4.9 (120)
              </p>
            </div>
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

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-gray-400 font-poppins text-sm">Service</p>
            <p className="text-black font-poppins font-bold text-base">Jump Start</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 font-poppins text-sm">Job ID</p>
            <p className="text-black font-poppins font-bold text-base">#RD123456</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/jobs/completed")}
          className="w-full bg-navy rounded-xl mt-5 py-4 active:scale-[0.98] transition"
        >
          <span className="text-white font-poppins font-bold text-base">Arrived at Location</span>
        </button>
      </div>
    </div>
  );
}
