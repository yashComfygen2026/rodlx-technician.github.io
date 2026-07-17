import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { authApi } from "../lib/authApi";
import { getCityZonesByLocation, getCurrentPosition } from "../lib/locationApi";

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
        <div className="w-9" />
      </div>

      <div className="px-2 mt-4">
        <h1 className="text-white font-poppins font-bold text-3xl">
          Registration Form
        </h1>
        <p className="text-muted-light font-poppins text-sm mt-2 leading-relaxed">
          We'll use these details to verify your technician profile and get you
          ready for service requests.
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

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-full font-poppins text-sm font-medium flex items-center gap-2 border transition ${
        selected
          ? "border-red text-red-accent bg-red/10"
          : "border-card-border bg-card text-muted-light"
      }`}
    >
      {label}
      {selected && (
        <span className="w-4 h-4 rounded-full bg-red flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5">
            <path
              d="M5 13l4 4L19 7"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
}

export default function AddServiceLocation() {
  const navigate = useNavigate();
  const [locating, setLocating] = useState(true);
  const [city, setCity] = useState(null);
  const [zones, setZones] = useState([]);
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const detectLocation = async () => {
    setLocating(true);
    setError("");
    try {
      // const { lat, lng } = await getCurrentPosition();
      const { lat, lng } = { lat: 26.89672267048848, lng: 75.75912660163716 };
      const result = await getCityZonesByLocation(lat, lng);
      setCity(result.city);
      setZones(result.serviceZones || []);
      if (result.serviceZones?.length === 1) {
        setSelectedZoneId(result.serviceZones[0].id);
      }
    } catch (err) {
      setError(err.message);
      setCity(null);
      setZones([]);
    } finally {
      setLocating(false);
    }
  };

  useEffect(() => {
    detectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!city) {
      setError(
        "We couldn't detect your city. Please retry location detection.",
      );
      return;
    }
    if (!selectedZoneId) {
      setError("Please select a service zone.");
      return;
    }
    setSubmitting(true);
    try {
      await authApi.registerStep4({
        cityId: city.id,
        serviceZoneId: selectedZoneId,
      });
      navigate("/application-under-review");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass = "text-white font-poppins font-semibold text-sm mb-2 block";

  return (
    <div className="screen">
      <RegistrationHeader step={3} section="Add Service Location" />

      <div className="px-6 flex-1 flex flex-col">
        <label className={labelClass}>Detected City</label>
        <div className="bg-card border border-card-border rounded-xl px-4 py-3.5 flex items-center justify-between mb-6">
          <span className="text-white font-poppins text-sm">
            {locating
              ? "Detecting your location..."
              : city?.name || "No city detected"}
          </span>
          <button
            type="button"
            onClick={detectLocation}
            disabled={locating}
            className="text-red-accent font-poppins font-semibold text-sm disabled:opacity-60"
          >
            {locating ? "..." : "Retry"}
          </button>
        </div>

        <label className={labelClass}>Select Service Zone</label>
        {zones.length === 0 && !locating && (
          <p className="text-muted-light font-poppins text-xs mb-4">
            No active service zones found near you yet.
          </p>
        )}
        <div className="flex flex-wrap gap-3 mb-6">
          {zones.map((z) => (
            <Chip
              key={z.id}
              label={z.name}
              selected={selectedZoneId === z.id}
              onClick={() => setSelectedZoneId(z.id)}
            />
          ))}
        </div>

        <div className="bg-card border border-card-border rounded-xl px-4 py-3.5 flex gap-3 items-start mb-6">
          <span className="w-4 h-4 rounded-full border border-muted-light flex items-center justify-center text-muted-light text-[10px] font-bold shrink-0 mt-0.5">
            i
          </span>
          <p className="text-muted-light font-poppins text-xs leading-relaxed">
            Admin will manually verify, so confirmation is required.
          </p>
        </div>

        {error && (
          <p className="text-red-accent font-poppins text-sm mb-4 -mt-2">
            {error}
          </p>
        )}
      </div>

      <div className="px-6 pb-8 mt-auto">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={submitting || locating}
        >
          {submitting ? "Saving..." : "Confirm & Proceed"}
        </Button>
      </div>
    </div>
  );
}
