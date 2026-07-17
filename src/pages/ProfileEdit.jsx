import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { authApi } from "../lib/authApi";

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.5 9.3a2.5 2.5 0 1 1 3.6 2.3c-.7.4-1.1.8-1.1 1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

function Tabs({ active }) {
  const navigate = useNavigate();
  const items = [
    { key: "info", label: "Information", path: "/profile/edit" },
    { key: "services", label: "Services", path: "/profile/service" },
    { key: "location", label: "Location", path: "/profile/location" },
  ];
  return (
    <div className="mx-4 mt-2 bg-card border border-card-border rounded-full flex p-1">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => navigate(it.path)}
          className={`flex-1 py-2.5 rounded-full font-poppins font-semibold text-sm transition ${
            active === it.key ? "bg-red text-white" : "text-muted-light"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, editing, type = "text" }) {
  return (
    <div className="mt-4 first:mt-0">
      <label className="text-black font-poppins font-bold text-xs tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!editing}
        className="w-full bg-gray-100 rounded-lg px-4 py-3 mt-1.5 text-gray-600 font-poppins text-sm outline-none disabled:opacity-90"
      />
    </div>
  );
}

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    authApi
      .getProfile()
      .then((result) => {
        setName(result.user?.fullName || "");
        setPhone(result.user?.phone || "");
        setEmail(result.user?.email || "");
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await authApi.updateProfile({ fullName: name, email: email || undefined });
      setEditing(false);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="screen">
      <Header title="My Profile" right={<HelpIcon />} />
      <Tabs active="info" />

      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-white font-poppins font-bold text-lg">Personal Details</h2>
        <button
          onClick={() => setEditing((v) => !v)}
          className="text-red font-poppins font-semibold text-sm"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      <div className="mx-4 bg-white rounded-3xl p-5">
        <Field label="NAME" value={name} onChange={setName} editing={editing} />
        <Field label="PHONE NUMBER" value={phone} onChange={setPhone} editing={false} />
        <Field label="EMAIL" value={email} onChange={setEmail} editing={editing} type="email" />
        {error && (
          <p className="text-red font-poppins text-xs mt-4">{error}</p>
        )}
      </div>

      <div className="px-5 pt-5 pb-8 mt-auto">
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
