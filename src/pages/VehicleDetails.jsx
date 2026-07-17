import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { authApi } from "../lib/authApi";
import { uploadFile } from "../lib/uploadApi";

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

function UploadDropzone({ label, file, onChange }) {
  const inputRef = useRef(null);
  return (
    <div className="mb-5">
      <label className="text-white font-poppins font-semibold text-sm mb-2 block">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full border border-dashed border-card-border rounded-xl py-8 flex flex-col items-center justify-center gap-2 text-muted-light font-poppins text-sm"
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
        {file ? file.name : "Tap to upload a clear photo"}
      </button>
    </div>
  );
}

const BRAND_MODEL_OPTIONS = [
  { value: "Toyota|Camry", label: "Toyota Camry" },
  { value: "Honda|Civic", label: "Honda Civic" },
  { value: "Ford|F-150", label: "Ford F-150" },
  { value: "Chevrolet|Silverado", label: "Chevrolet Silverado" },
];

const VEHICLE_TYPES = ["car", "truck", "van", "bike", "electricCar", "electricBike", "other"];

export default function VehicleDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";

  const [brandModel, setBrandModel] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [color, setColor] = useState("");
  const [defaultVehicle, setDefaultVehicle] = useState(false);
  const [driverLicenseFile, setDriverLicenseFile] = useState(null);
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [equipmentFile, setEquipmentFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full bg-card border border-card-border rounded-xl px-4 py-3.5 text-white font-poppins text-sm placeholder-muted-light outline-none";
  const labelClass = "text-white font-poppins font-semibold text-sm mb-2 block";
  const selectClass =
    "w-full appearance-none bg-card border border-card-border rounded-xl px-4 py-3.5 pr-10 text-white font-poppins text-sm outline-none";

  const handleSubmit = async () => {
    setError("");
    const [brand, model] = brandModel.split("|");
    if (!brand || !model || !year || !vin) {
      setError("Please fill in brand, model, year, and VIN.");
      return;
    }
    if (!isEdit && (!driverLicenseFile || !insuranceFile || !equipmentFile)) {
      setError("Driver license, insurance, and equipment verification photos are required.");
      return;
    }

    setSubmitting(true);
    try {
      const uploads = {};
      if (driverLicenseFile) uploads.driverLicense = (await uploadFile(driverLicenseFile)).url;
      if (insuranceFile) uploads.insurance = (await uploadFile(insuranceFile)).url;
      if (equipmentFile) uploads.equipmentVerification = (await uploadFile(equipmentFile)).url;

      const payload = {
        brand,
        model,
        vehicleType,
        year,
        vin,
        color: color || undefined,
        isDefault: defaultVehicle,
        ...uploads,
      };

      if (isEdit) {
        await authApi.updateProfile(payload);
        navigate("/application-under-review");
      } else {
        await authApi.registerStep2(payload);
        navigate("/add-service");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <RegistrationHeader step={1} section={isEdit ? "Update Vehicle Details" : "Vehicle Details"} />

      <div className="px-6 flex-1 flex flex-col">
        <label className={labelClass}>Brand &amp; Model</label>
        <div className="relative mb-5">
          <select
            value={brandModel}
            onChange={(e) => setBrandModel(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled hidden>
              Select Brand &amp; Model
            </option>
            {BRAND_MODEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 text-muted-light absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <label className={labelClass}>Vehicle Type</label>
        <div className="relative mb-5">
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className={selectClass}
          >
            {VEHICLE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 text-muted-light absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelClass}>Year</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2024"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>VIN Number</label>
            <input
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              placeholder="AC234"
              className={inputClass}
            />
          </div>
        </div>

        <label className={labelClass}>Color (Optional)</label>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Midnight Blue"
          className={`${inputClass} mb-6`}
        />

        <UploadDropzone label="Driver License" file={driverLicenseFile} onChange={setDriverLicenseFile} />
        <UploadDropzone label="Vehicle Insurance" file={insuranceFile} onChange={setInsuranceFile} />
        <UploadDropzone label="Equipment Verification" file={equipmentFile} onChange={setEquipmentFile} />

        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            onClick={() => setDefaultVehicle((v) => !v)}
            aria-label="Set as default vehicle"
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition ${
              defaultVehicle ? "bg-red border-red" : "bg-transparent border-red"
            }`}
          >
            {defaultVehicle && (
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
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
          <p className="text-white font-poppins text-sm">Set as default vehicle</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl px-4 py-3.5 flex gap-3 items-start mb-6">
          <span className="w-4 h-4 rounded-full border border-muted-light flex items-center justify-center text-muted-light text-[10px] font-bold shrink-0 mt-0.5">
            i
          </span>
          <p className="text-muted-light font-poppins text-xs leading-relaxed">
            You can add up to 5 vehicles to your RODLX account for different
            family members or business needs
          </p>
        </div>

        {error && (
          <p className="text-red-accent font-poppins text-sm mb-4 -mt-2">{error}</p>
        )}
      </div>

      <div className="px-6 pb-8 mt-auto">
        <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Saving..." : isEdit ? "Save & Resubmit" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
