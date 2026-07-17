import { NavLink } from "react-router-dom";

const items = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6.5H9V21H4a1 1 0 01-1-1V10.5z"
          stroke={active ? "#DC0804" : "#8A97A6"}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={active ? "#DC0804" : "none"}
        />
      </svg>
    ),
  },
  {
    to: "/jobs",
    label: "Jobs",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect
          x="3"
          y="7"
          width="18"
          height="13"
          rx="2"
          stroke={active ? "#DC0804" : "#8A97A6"}
          strokeWidth="1.8"
          fill={active ? "#DC0804" : "none"}
        />
        <path
          d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
          stroke={active ? "#DC0804" : "#8A97A6"}
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    to: "/earnings",
    label: "Earnings",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M6 2h9l3 3v17H6V2z"
          stroke={active ? "#DC0804" : "#8A97A6"}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={active ? "#DC0804" : "none"}
        />
        <path d="M9 12h6M9 16h6" stroke={active ? "#fff" : "#8A97A6"} strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    to: "/messages",
    label: "Messages",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
          stroke={active ? "#DC0804" : "#8A97A6"}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={active ? "#DC0804" : "none"}
        />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "More",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="5" cy="12" r="1.6" fill={active ? "#DC0804" : "#8A97A6"} />
        <circle cx="12" cy="12" r="1.6" fill={active ? "#DC0804" : "#8A97A6"} />
        <circle cx="19" cy="12" r="1.6" fill={active ? "#DC0804" : "#8A97A6"} />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <div className="sticky bottom-0 mt-auto px-3 pb-4 pt-2 bg-navy">
      <div className="flex items-center justify-between bg-card border border-card-border rounded-2xl px-2 py-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 flex-1"
          >
            {({ isActive }) => (
              <>
                {item.icon(isActive)}
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-red" : "text-muted-light"
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
