import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { authApi } from "../lib/authApi";
import { useAuth } from "../context/AuthContext";

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "back"],
];

const OTP_LENGTH = 6;

// Route the technician to wherever their registration/profile last left off.
function nextRouteForSavedStep(savedStep) {
  if (savedStep >= 4) return "/application-under-review";
  if (savedStep === 3) return "/add-service-location";
  if (savedStep === 2) return "/add-service";
  return "/vehicle-details";
}

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSession } = useAuth();

  const { phone, countryCode, userToken: initialUserToken } = location.state || {};

  const [userToken, setUserToken] = useState(initialUserToken);
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [focusIndex, setFocusIndex] = useState(0);
  const [seconds, setSeconds] = useState(41);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!phone || !userToken) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  useEffect(() => {
    if (digits.every((d) => d !== "") && !verifying) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  const handleVerify = async () => {
    setError("");
    setVerifying(true);
    try {
      const otp = digits.join("");
      const result = await authApi.loginVerifyOtp(userToken, otp);

      if (result.verified) {
        // New technician: phone confirmed, continue registration with this
        // now-verified token (register() expects it as `userToken`).
        navigate("/permissions", {
          state: { phone, countryCode, registrationToken: result.token },
        });
        return;
      }

      // Existing technician: full login, resume wherever they left off.
      setSession({ token: result.token, refreshToken: result.refreshToken, user: { savedStep: result.savedStep } });
      navigate(nextRouteForSavedStep(result.savedStep ?? 0), { replace: true });
    } catch (err) {
      setError(err.message);
      setDigits(Array(OTP_LENGTH).fill(""));
      setFocusIndex(0);
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || resending) return;
    setError("");
    setResending(true);
    try {
      const result = await authApi.loginSendOtp(phone, countryCode);
      setUserToken(result.userToken);
      setSeconds(41);
      setDigits(Array(OTP_LENGTH).fill(""));
      setFocusIndex(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  const handleKey = (key) => {
    if (verifying) return;
    if (key === "back") {
      setDigits((prev) => {
        const next = [...prev];
        let idx = focusIndex;
        if (next[idx] === "" && idx > 0) idx -= 1;
        if (next[idx] !== "") {
          next[idx] = "";
          setFocusIndex(idx);
        }
        return next;
      });
      return;
    }

    setDigits((prev) => {
      if (focusIndex > OTP_LENGTH - 1) return prev;
      const next = [...prev];
      next[focusIndex] = key;
      return next;
    });
    setFocusIndex((i) => Math.min(i + 1, OTP_LENGTH));
  };

  return (
    <div className="screen">
      <div className="flex items-center px-4 pt-6 pb-4 relative">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="text-white w-9 h-9 flex items-center justify-center -ml-2 z-10"
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
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo size="sm" />
        </div>
      </div>

      <div className="px-6 pt-4">
        <h1 className="text-white font-poppins font-bold text-3xl">
          Enter OTP Code
        </h1>
        <p className="text-muted-light font-poppins text-sm mt-3 leading-relaxed">
          Check your messages! We've sent a one-time code to{" "}
          {countryCode?.dialCode} {phone}. Enter the code below to verify your
          account and continue.
        </p>

        <div className="flex gap-3 mt-8">
          {digits.map((d, i) => {
            const active = i === focusIndex || (focusIndex > OTP_LENGTH - 1 && i === OTP_LENGTH - 1);
            return (
              <div
                key={i}
                className={`w-12 h-14 rounded-2xl flex items-center justify-center font-poppins font-bold text-2xl text-white transition ${
                  active
                    ? "border border-red bg-red/10"
                    : "bg-card border border-card-border"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>

        {error && (
          <p className="text-red-accent font-poppins text-sm mt-4">{error}</p>
        )}
        {verifying && (
          <p className="text-muted-light font-poppins text-sm mt-4">Verifying...</p>
        )}

        <p className="text-muted-light font-poppins text-sm mt-6">
          You can resend the code in{" "}
          <span className="text-red font-semibold">{seconds}</span> seconds
        </p>
        <button
          type="button"
          disabled={seconds > 0 || resending}
          onClick={handleResend}
          className="text-muted-light font-poppins font-semibold text-sm mt-3 disabled:opacity-60"
        >
          {resending ? "Resending..." : "Resend code"}
        </button>
      </div>

      <div className="mt-auto border-t border-card-border px-6 py-6">
        <div className="grid grid-cols-3 gap-y-6">
          {KEYS.flat().map((key, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleKey(key)}
              className="text-white font-poppins font-semibold text-2xl py-2 flex items-center justify-center active:opacity-60"
            >
              {key === "back" ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path
                    d="M9 6l-6 6 6 6h11a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H9z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 10l4 4m0-4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
