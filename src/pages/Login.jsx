import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { authApi, US_COUNTRY_CODE } from "../lib/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(true);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    setError("");
    // Matches the technician register() endpoint's minimum (10 digits) so a
    // short number fails here instead of later at the registration step.
    const digits = phone.trim();
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the privacy policy to continue.");
      return;
    }

    setLoading(true);
    try {
      const result = await authApi.loginSendOtp(digits, US_COUNTRY_CODE);
      navigate("/otp", {
        state: { phone: digits, countryCode: US_COUNTRY_CODE, userToken: result.userToken },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="px-6 pt-10 pb-6">
        <Logo size="lg" />
      </div>

      <div className="px-6 flex-1 flex flex-col">
        <h1 className="text-white font-poppins font-bold text-3xl leading-tight">
          Join <span className="text-red">CA</span>RELX Today
        </h1>
        <p className="text-muted-light font-poppins text-sm mt-3 leading-relaxed">
          Let's get started! Enter your phone number to create your RODLX
          account.
        </p>

        <label className="text-white font-poppins font-bold text-sm mt-8 mb-2">
          Phone Number
        </label>
        <div className="flex items-stretch bg-card border border-card-border rounded-xl overflow-hidden">
          <button
            type="button"
            className="flex items-center gap-1 px-4 py-3.5 text-white font-poppins text-sm border-r border-card-border shrink-0"
          >
            <span className="text-muted-light">US</span>
            <span className="font-semibold">+1</span>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-muted-light">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 000-0000"
            className="flex-1 bg-transparent px-4 py-3.5 text-white font-poppins text-sm placeholder-muted-light outline-none min-w-0"
          />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => setAgreed((v) => !v)}
            aria-label="Toggle agreement"
            className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition ${
              agreed ? "bg-red" : "bg-transparent border border-card-border"
            }`}
          >
            {agreed && (
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <p className="text-muted-light font-poppins text-sm">
            I agree with RODLX <span className="text-red">privacy policy</span>
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 mt-auto">
        {error && (
          <p className="text-red-accent font-poppins text-sm mb-3 text-center">{error}</p>
        )}
        <Button variant="primary" onClick={handleContinue} disabled={loading}>
          {loading ? "Sending code..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
