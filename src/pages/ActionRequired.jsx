import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

function IssueCard({ title, message }) {
  return (
    <div className="bg-card border border-card-border rounded-2xl p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path
              d="M7 3h7l4 4v14H7V3z"
              stroke="#f97316"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M14 3v4h4" stroke="#f97316" strokeWidth="1.6" strokeLinejoin="round" />
            <path
              d="M9.5 13h5M9.5 16h5"
              stroke="#f97316"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-white font-poppins font-semibold text-base">{title}</p>
      </div>
      <div className="bg-navy border border-card-border rounded-xl px-3 py-3 flex gap-2 items-start">
        <span className="w-4 h-4 rounded-full border border-muted-light flex items-center justify-center text-muted-light text-[10px] font-bold shrink-0 mt-0.5">
          i
        </span>
        <p className="text-muted-light font-poppins text-xs leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export default function ActionRequired() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <Header showBack />

      <div className="px-6 flex-1 flex flex-col">
        <div className="relative w-40 h-40 flex items-center justify-center mx-auto mt-4 mb-6">
          <div className="absolute inset-0 rounded-full bg-orange-500/10" />
          <div className="absolute inset-6 rounded-full bg-orange-500/15" />
          <div className="absolute inset-12 rounded-full bg-card border border-orange-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
              <path
                d="M12 3L2 20h20L12 3z"
                stroke="#f97316"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M12 9v5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1" fill="#f97316" />
            </svg>
          </div>
        </div>

        <h1 className="text-white font-poppins font-bold text-2xl text-center">
          Action Required
        </h1>
        <p className="text-muted-light font-poppins text-sm text-center mt-3 mb-6 leading-relaxed">
          Your application needs a bit more attention. Please review the
          feedback from our admin team below and re-upload the correct
          documents.
        </p>

        <IssueCard
          title="Driver License"
          message="The image provided is too blurry to read. Please upload a clear photo of the front of your license."
        />
        <IssueCard
          title="Vehicle Insurance"
          message="The insurance document appears to be expired. Please upload a valid insurance card."
        />
      </div>

      <div className="px-6 pb-4 mt-6">
        <Button variant="primary" onClick={() => navigate("/vehicle-details?edit=true")}>
          Re-upload Documents
        </Button>
        <button
          type="button"
          onClick={() => navigate("/vehicle-details?edit=true")}
          className="w-full text-center text-red-accent font-poppins text-sm mt-4 pb-6 underline underline-offset-2"
        >
          Upload your documents the correct way
        </button>
      </div>
    </div>
  );
}
