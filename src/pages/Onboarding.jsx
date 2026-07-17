import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import trustedVerified from "../assets/illustration-trusted-verified.svg";
import realTimeService from "../assets/illustration-real-time-service.svg";
import expertCare from "../assets/illustration-expert-care.svg";

const slides = [
  {
    illustration: trustedVerified,
    title: "Trusted & Verified Mechanics",
    description:
      "Rest easy knowing your vehicle is in the hands of certified professionals. Quality service, transparent pricing, and genuine parts—always.",
  },
  {
    illustration: realTimeService,
    title: "Real-Time Service Tracking",
    description:
      "No more guesswork. Track your vehicle's service progress, view real-time updates, and get expert reports, all from the palm of your hand.",
  },
  {
    illustration: expertCare,
    title: "Expert Care for Your Vehicle",
    description:
      "Experience top-tier service right at your doorstep. From routine maintenance to complex repairs, we handle it all with precision.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const slide = slides[step];
  const isLast = step === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate("/login");
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="screen px-5">
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={() => (step === 0 ? navigate("/") : setStep((s) => s - 1))}
          aria-label="Back"
          className="text-white w-9 h-9 flex items-center justify-center -ml-2"
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
        <button
          onClick={() => navigate("/login")}
          className="text-muted-light text-sm font-medium"
        >
          Skip
        </button>
      </div>

      <Logo size="sm" className="mt-2" />

      <img
        src={slide.illustration}
        alt=""
        className="w-[70%] max-w-[268px] mx-auto mt-10"
      />

      <div className="mt-10 flex flex-col items-center text-center gap-2">
        <h2 className="text-white font-poppins font-semibold text-lg">
          {slide.title}
        </h2>
        <p className="text-muted text-sm leading-relaxed">{slide.description}</p>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? "w-6 bg-red" : "w-1.5 bg-card-border"
            }`}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-auto mb-8 bg-red text-white font-poppins font-semibold py-3.5 rounded-xl"
      >
        Next
      </button>
    </div>
  );
}
