import { useNavigate } from "react-router-dom";

export default function Header({ title, showBack = true, right = null }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-4">
      <div className="w-9">
        {showBack && (
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
        )}
      </div>
      <h1 className="text-white font-poppins font-semibold text-lg">{title}</h1>
      <div className="w-9 flex justify-end">{right}</div>
    </div>
  );
}
