import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { authApi } from "../lib/authApi";
import { uploadFilePublic } from "../lib/uploadApi";
import { useAuth } from "../context/AuthContext";

function RegistrationHeader({ step, section }) {
  const navigate = useNavigate();
  const steps = [0, 1, 2, 3];

  return (
    <div className="px-4">
      <div className="flex items-center justify-between pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
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
        <Logo size="sm" />
        <div className="w-9" />
      </div>

      <div className="px-2 mt-4">
        <h1 className="text-white font-poppins font-bold text-3xl">
          Registration Form
        </h1>
        <p className="text-muted-light font-poppins text-sm mt-2 leading-relaxed">
          We'll use these details to verify your technician profile and get
          you ready for service requests.
        </p>
        <div className="flex gap-2 mt-6">
          {steps.map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= step ? "bg-red" : "bg-card-border"
              }`}
            />
          ))}
        </div>
        <p className="text-muted-light font-poppins font-semibold text-sm mt-6">
          {section}
        </p>
      </div>
    </div>
  );
}

export default function PersonalDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSession } = useAuth();
  const fileInputRef = useRef(null);

  const { phone: statePhone, registrationToken } = location.state || {};

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(statePhone || "");
  const [email, setEmail] = useState("");
  const [idProofFile, setIdProofFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!registrationToken) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (fullName.trim().length < 3) {
      setError("Please enter your full name.");
      return;
    }

    setSubmitting(true);
    try {
      let idProof;
      if (idProofFile) {
        const uploaded = await uploadFilePublic(idProofFile);
        idProof = uploaded.url;
      }

      const result = await authApi.register({
        fullName: fullName.trim(),
        email: email.trim() || undefined,
        phone,
        idProof,
        userToken: registrationToken,
      });

      setSession({ token: result.token, refreshToken: result.refreshToken, user: result.user });
      navigate("/vehicle-details");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-card border border-card-border rounded-xl px-4 py-3.5 text-white font-poppins text-sm placeholder-muted-light outline-none";
  const labelClass = "text-white font-poppins font-semibold text-sm mb-2 block";

  return (
    <div className="screen">
      <RegistrationHeader step={0} section="Personal Details" />

      <div className="px-6 flex-1 flex flex-col">
        <div className="flex justify-center mt-4 mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-card border border-card-border flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-muted-light"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z" />
              </svg>
            </div>
            <button
              type="button"
              aria-label="Upload photo"
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-red flex items-center justify-center border-4 border-navy"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M4 8a2 2 0 012-2h1l1-2h4l1 2h1a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="13" r="3" stroke="white" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        </div>

        <label className={labelClass}>Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          className={`${inputClass} mb-5`}
        />

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-0000"
              disabled={Boolean(statePhone)}
              className={`${inputClass} disabled:opacity-60`}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={inputClass}
            />
          </div>
        </div>

        <label className={labelClass}>ID Upload (Optional)</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border border-dashed border-card-border rounded-xl py-8 flex flex-col items-center justify-center gap-2 text-muted-light font-poppins text-sm mb-6"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
            <path
              d="M4 8a2 2 0 012-2h1l1-2h4l1 2h1a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {idProofFile ? idProofFile.name : "Tap to upload a clear photo"}
        </button>

        {error && (
          <p className="text-red-accent font-poppins text-sm mb-4 -mt-2">{error}</p>
        )}
      </div>

      <div className="px-6 pb-8 mt-auto">
        <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
