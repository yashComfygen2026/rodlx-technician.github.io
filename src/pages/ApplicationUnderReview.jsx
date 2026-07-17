import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { authApi } from "../lib/authApi";
import { useAuth } from "../context/AuthContext";

const POLL_INTERVAL_MS = 20000;

function StatusIcon({ status }) {
  if (status === "done") {
    return (
      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="w-7 h-7 rounded-full border-2 border-amber-500 bg-card flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-amber-500">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-card-border flex items-center justify-center shrink-0">
      <div className="w-2 h-2 rounded-full bg-muted-light" />
    </div>
  );
}

function buildSteps(savedStep, profileStatus, docStatus) {
  const approved = profileStatus === "active";
  const rejected = docStatus === "rejected";

  return [
    {
      title: "Profile Created",
      desc: "Personal and contact details saved.",
      status: savedStep >= 1 ? "done" : "pending",
    },
    {
      title: "Documents Submitted",
      desc: "License, insurance, and equipment verification uploaded.",
      status: savedStep >= 2 ? "done" : "pending",
    },
    {
      title: "Admin Verification",
      desc: rejected
        ? "Some documents need attention."
        : "Our team is reviewing your documents.",
      status: approved ? "done" : savedStep >= 4 ? "active" : "pending",
    },
    {
      title: "Account Activation",
      desc: "Final step before you can go online.",
      status: approved ? "done" : "pending",
    },
  ];
}

export default function ApplicationUnderReview() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [savedStep, setSavedStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    setError("");
    try {
      const result = await authApi.getProfile();
      setProfile(result.profile);
      setSavedStep(result.user?.savedStep ?? 0);
      updateUser({ savedStep: result.user?.savedStep ?? 0 });

      if (result.profile?.docStatus === "rejected") {
        navigate("/action-required", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approved = profile?.status === "active";
  const steps = buildSteps(savedStep, profile?.status, profile?.docStatus);

  return (
    <div className="screen">
      <div className="px-6 flex-1 flex flex-col">
        <div className="relative w-40 h-40 flex items-center justify-center mx-auto mt-16 mb-6">
          <div className="absolute inset-0 rounded-full bg-red/10" />
          <div className="absolute inset-6 rounded-full bg-red/20" />
          <div className="absolute inset-12 rounded-full bg-card border border-red flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
              <path
                d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                fill="#dc0804"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-white font-poppins font-bold text-2xl text-center">
          {approved ? "Application Approved" : "Application Under Review"}
        </h1>
        <p className="text-muted-light font-poppins text-sm text-center mt-3 leading-relaxed">
          {approved
            ? "You're all set! You can now go online and start accepting jobs."
            : "Thanks for choosing RODLX. Our compliance team is verifying your details to ensure the best experience for everyone."}
        </p>

        <div className="bg-card border border-card-border rounded-2xl p-5 mt-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-poppins font-bold text-lg">Review Status</h3>
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="text-red-accent font-poppins font-semibold text-xs disabled:opacity-60"
            >
              {loading ? "Checking..." : "Refresh"}
            </button>
          </div>
          <div className="flex flex-col">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <StatusIcon status={step.status} />
                  {idx < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-card-border my-1" />
                  )}
                </div>
                <div className={idx < steps.length - 1 ? "pb-6" : ""}>
                  <p
                    className={`font-poppins font-semibold text-sm ${
                      step.status === "active" ? "text-amber-500" : "text-white"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-muted-light font-poppins text-xs mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-accent font-poppins text-sm mt-4 text-center">{error}</p>
        )}
      </div>

      <div className="px-6 pb-8 mt-6">
        <Button
          variant="primary"
          disabled={!approved}
          onClick={() => navigate("/dashboard")}
        >
          {approved ? "Go to Dashboard" : "Awaiting Approval"}
        </Button>
      </div>
    </div>
  );
}
