import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { authApi } from "../lib/authApi";
import { listServiceCategories, listServices } from "../lib/serviceApi";

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

export default function AddService() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([listServiceCategories(), listServices()])
      .then(([categoryList, serviceList]) => {
        setCategories(categoryList || []);
        setServices(serviceList || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const visibleServices = useMemo(
    () => (category ? services.filter((s) => s.categoryId === category) : services),
    [services, category]
  );

  const toggle = (serviceId) => {
    setSelected((prev) =>
      prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
    );
  };

  const handleContinue = async () => {
    setError("");
    if (selected.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    setSubmitting(true);
    try {
      await authApi.registerStep3(selected);
      navigate("/add-service-location");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <RegistrationHeader step={2} section="Add Your Service" />

      <div className="px-6 flex-1 flex flex-col">
        <div className="relative mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none bg-card border border-card-border rounded-xl px-4 py-3.5 pr-10 text-white font-poppins text-sm outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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

        <p className="text-muted-light font-poppins font-semibold text-sm mb-4">
          Select Specific Services
        </p>

        {loading && (
          <p className="text-muted-light font-poppins text-sm">Loading services...</p>
        )}
        {!loading && visibleServices.length === 0 && (
          <p className="text-muted-light font-poppins text-sm">
            No services are available to select yet.
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {visibleServices.map((service) => (
            <Chip
              key={service.id}
              label={service.name}
              selected={selected.includes(service.id)}
              onClick={() => toggle(service.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 mt-6">
        {error && (
          <p className="text-red-accent font-poppins text-sm mb-3 text-center">{error}</p>
        )}
        <Button variant="primary" onClick={handleContinue} disabled={submitting || loading}>
          {submitting ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
