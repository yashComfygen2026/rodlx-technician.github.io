import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import BottomNav from "../components/BottomNav";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0">
      <path
        d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.1" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="flex items-center justify-between px-4 pt-6 pb-4">
        <button
          aria-label="Menu"
          className="text-white w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className="block w-5 h-0.5 bg-white rounded-full" />
          <span className="block w-5 h-0.5 bg-white rounded-full" />
          <span className="block w-5 h-0.5 bg-white rounded-full" />
        </button>
        <Logo size="sm" />
        <button
          aria-label="Notifications"
          className="relative text-white w-9 h-9 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path
              d="M6 9a6 6 0 1112 0c0 3.2 1 5.2 1.8 6.3.3.4 0 1-.5 1H4.7c-.5 0-.8-.6-.5-1C5 14.2 6 12.2 6 9z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M10 19a2 2 0 004 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 bg-red text-white text-[9px] font-poppins font-bold w-4 h-4 rounded-full flex items-center justify-center border border-navy">
            3
          </span>
        </button>
      </div>

      <div className="px-4 flex items-center justify-between mt-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-14 h-14 rounded-full bg-card-border flex items-center justify-center text-white font-poppins font-semibold text-sm shrink-0">
            JT
          </div>
          <div className="min-w-0">
            <p className="text-muted-light font-poppins text-sm">Good Morning,</p>
            <p className="text-white font-poppins font-bold text-lg leading-tight">juber T.</p>
            <p className="text-white font-poppins text-sm flex items-center gap-1 mt-0.5">
              <span className="text-yellow-400">★</span> 4.9{" "}
              <span className="text-muted-light">(230)</span>
            </p>
          </div>
        </div>
        <span className="bg-green-500 text-white font-poppins text-xs font-semibold px-4 py-1.5 rounded-full shrink-0">
          Online
        </span>
      </div>

      <div className="px-4 mt-6">
        <div className="bg-card border border-card-border rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-white font-poppins font-semibold text-base">
              Today's Overview
            </p>
            <p className="text-muted-light font-poppins text-sm">May 20, 2024</p>
          </div>
          <div className="border-t border-card-border my-3" />
          <div className="grid grid-cols-4 gap-2">
            <div>
              <p className="text-white font-poppins font-bold text-xl">8</p>
              <p className="text-muted-light font-poppins text-[10px] mt-0.5 leading-tight">
                Jobs Completed
              </p>
            </div>
            <div>
              <p className="text-white font-poppins font-bold text-xl">2</p>
              <p className="text-muted-light font-poppins text-[10px] mt-0.5 leading-tight">
                In Progress
              </p>
            </div>
            <div>
              <p className="text-white font-poppins font-bold text-xl">$265.75</p>
              <p className="text-muted-light font-poppins text-[10px] mt-0.5 leading-tight">
                Earnings
              </p>
            </div>
            <div>
              <p className="text-white font-poppins font-bold text-xl">92%</p>
              <p className="text-muted-light font-poppins text-[10px] mt-0.5 leading-tight">
                Acceptance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="relative bg-card border border-card-border rounded-2xl p-4 pl-6 overflow-hidden">
          <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-red" />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-orange-400 font-poppins font-semibold text-base">
                Next Incentive
              </p>
              <p className="text-white font-poppins text-sm mt-2">
                Complete 5 more jobs to earn
              </p>
              <p className="text-white font-poppins font-bold text-base mt-0.5">
                $75 Bonus
              </p>
            </div>
            <span className="text-3xl shrink-0">🏆</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-2 bg-card-border rounded-full overflow-hidden">
              <div className="h-full bg-red rounded-full" style={{ width: "50%" }} />
            </div>
            <span className="text-muted-light font-poppins text-sm shrink-0">5 / 10</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 mb-4">
        <div className="bg-card border border-card-border rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-white font-poppins font-semibold text-base">Active Job</p>
            <span className="bg-red/15 text-red-accent font-poppins text-xs font-semibold px-3 py-1 rounded-full">
              In Progress
            </span>
          </div>
          <p className="text-white font-poppins font-bold text-xl mt-3">Jump Start</p>
          <div className="flex items-start justify-between mt-3 gap-3">
            <div className="space-y-1.5 min-w-0">
              <p className="flex items-center gap-1.5 text-muted-light font-poppins text-sm">
                <PinIcon /> 1234 Westheimer Rd
              </p>
              <p className="flex items-center gap-1.5 text-muted-light font-poppins text-sm">
                <PinIcon /> Houston, TX 77006
              </p>
            </div>
            <div className="text-right border-l border-card-border pl-3 shrink-0">
              <p className="text-muted-light font-poppins text-xs">ETA</p>
              <p className="text-white font-poppins font-bold text-base">8 min</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/jobs/in-progress")}
            className="w-full bg-red text-white font-poppins font-semibold text-base py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <span>🚩</span> Navigate
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
