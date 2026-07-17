import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

const CONFETTI = [
  { top: "4%", left: "8%", color: "#22c55e", size: 10 },
  { top: "18%", left: "20%", color: "#3b82f6", size: 9 },
  { top: "0%", left: "38%", color: "#22c55e", size: 7 },
  { top: "2%", left: "88%", color: "#f59e0b", size: 9 },
  { top: "20%", left: "92%", color: "#22c55e", size: 8 },
  { top: "36%", left: "4%", color: "#f59e0b", size: 9 },
  { top: "40%", left: "28%", color: "#dc0804", size: 8 },
  { top: "42%", left: "70%", color: "#dc0804", size: 8 },
  { top: "30%", left: "82%", color: "#f97316", size: 9 },
  { top: "44%", left: "62%", color: "#f97316", size: 7 },
];

export default function JobCompleted() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState("");

  return (
    <div className="screen">
      <Header title="Complete Job" />

      <div className="relative h-52 flex items-center justify-center shrink-0">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              opacity: 0.9,
            }}
          />
        ))}
        <div className="w-28 h-28 rounded-full bg-emerald-900/40 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center px-6">
        <h1 className="text-white font-poppins font-bold text-2xl">Job Completed!</h1>
        <p className="text-muted-light font-poppins text-sm mt-1">Great work, Michael.</p>
      </div>

      <div className="mx-4 mt-5 bg-white rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 font-poppins text-sm">Earnings</p>
            <p className="text-black font-poppins font-bold text-xl mt-0.5">$80.00</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 font-poppins text-sm">Distance</p>
            <p className="text-black font-poppins font-bold text-xl mt-0.5">2.4 mi</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mt-4">
          <div>
            <p className="text-black font-poppins font-bold text-sm">Total Earnings</p>
            <p className="text-gray-400 font-poppins text-xs mt-0.5">Includes distance pay</p>
          </div>
          <p className="text-emerald-600 font-poppins font-bold text-xl">$90.00</p>
        </div>

        <p className="text-black font-poppins font-bold text-base mt-5">Rate Customer</p>
        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} aria-label={`Rate ${n}`}>
              <svg
                viewBox="0 0 24 24"
                fill={n <= rating ? "#f59e0b" : "#e5e7eb"}
                className="w-8 h-8"
              >
                <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z" />
              </svg>
            </button>
          ))}
        </div>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          className="w-full bg-gray-100 rounded-xl px-4 py-3.5 text-black font-poppins text-sm placeholder-gray-400 outline-none mt-4"
        />

        <div className="mt-5">
          <Button variant="primary" onClick={() => navigate("/dashboard")}>
            Submit &amp; Finish
          </Button>
        </div>
      </div>
    </div>
  );
}
