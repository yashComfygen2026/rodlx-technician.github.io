import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div
      className="screen items-center justify-center px-8 text-center"
      style={{
        background: "linear-gradient(180deg, #001020 57%, #FF383C 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <Logo size="lg" />
        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-white flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>
      </div>

      <button
        onClick={() => navigate("/onboarding")}
        className="absolute bottom-10 left-8 right-8 bg-red text-white font-poppins font-semibold py-3.5 rounded-xl"
      >
        Get Started
      </button>
    </div>
  );
}
