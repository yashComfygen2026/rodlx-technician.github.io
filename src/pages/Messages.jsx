import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const tabs = ["All", "Customer", "Support"];

const messages = [
  {
    name: "John Doe",
    preview: "Thanks a lot! You saved my day.",
    time: "10:45 AM",
    unread: 2,
    initials: "JD",
  },
  {
    name: "Sarah M.",
    preview: "I will be there in 2 minutes.",
    time: "Yesterday",
    unread: 0,
    initials: "SM",
  },
  {
    name: "Robert K.",
    preview: "Please call me when you arrive.",
    time: "May 19",
    unread: 0,
    initials: "RK",
  },
  {
    name: "RODLX Support",
    preview: "Your payout for this week has been...",
    time: "May 18",
    unread: 1,
    initials: "RS",
  },
];

export default function Messages() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="screen">
      <Header title="Messages" />

      <div className="px-4">
        <div className="flex items-center bg-card border border-card-border rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-full font-poppins font-semibold text-sm transition ${
                activeTab === tab ? "bg-red text-white" : "text-muted-light"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-card border border-card-border rounded-3xl overflow-hidden">
          {messages.map((m, i) => (
            <div
              key={m.name}
              className={`flex items-center gap-3 px-4 py-4 ${
                i !== messages.length - 1 ? "border-b border-card-border" : ""
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-card-border flex items-center justify-center text-white font-poppins font-semibold text-xs shrink-0">
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-poppins font-bold text-[15px] truncate">
                  {m.name}
                </p>
                <p className="text-muted-light font-poppins text-xs mt-0.5 truncate">
                  {m.preview}
                </p>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                <span className="text-muted-light font-poppins text-xs">{m.time}</span>
                {m.unread > 0 && (
                  <span className="bg-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {m.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="New message"
        className="absolute right-4 bottom-24 w-14 h-14 rounded-full bg-red flex items-center justify-center shadow-lg shadow-red/40 active:scale-[0.96] transition"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            d="M4 4h16a1 1 0 011 1v10a1 1 0 01-1 1H9l-4 4v-4H4a1 1 0 01-1-1V5a1 1 0 011-1z"
            fill="white"
          />
          <circle cx="8" cy="10" r="1.1" fill="#DC0804" />
          <circle cx="12" cy="10" r="1.1" fill="#DC0804" />
          <circle cx="16" cy="10" r="1.1" fill="#DC0804" />
        </svg>
      </button>

      <BottomNav />
    </div>
  );
}
