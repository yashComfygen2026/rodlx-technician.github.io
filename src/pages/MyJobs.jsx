import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const tabs = ["All", "Upcoming", "Completed"];

const jobs = [
  {
    id: "#RD123456",
    title: "Jump Start",
    date: "May 20, 2024 • 10:30 AM",
    status: "In Progress",
    price: "$80.00",
    icon: "🔋",
  },
  {
    id: "#RD123455",
    title: "Flat Tire Change",
    date: "May 20, 2024 • 01:15 PM",
    status: "Upcoming",
    price: "$85.00",
    icon: "🛞",
  },
  {
    id: "#RD123454",
    title: "Fuel Delivery",
    date: "May 20, 2024 • 01:30 PM",
    status: "Upcoming",
    price: "$95.00",
    icon: "⛽",
  },
  {
    id: "#RD123453",
    title: "Lockout Service",
    date: "May 20, 2024 • 03:45 PM",
    status: "Upcoming",
    price: "$75.00",
    icon: "🔒",
  },
];

const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-600",
  Upcoming: "bg-orange-100 text-orange-500",
};

export default function MyJobs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="screen">
      <Header title="My Jobs" />

      <div className="px-4">
        <div className="flex items-center bg-card border border-card-border rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full font-poppins font-semibold text-sm transition ${
                activeTab === tab ? "bg-white text-red" : "text-muted-light"
              }`}
            >
              {tab}
              {tab === "Upcoming" && (
                <span className="bg-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  4
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 mb-4">
        <div className="bg-white rounded-3xl overflow-hidden">
          {jobs.map((job, i) => (
            <button
              key={job.id}
              onClick={() => navigate("/jobs/details")}
              className={`w-full flex items-center gap-3 px-4 py-4 text-left active:bg-gray-50 ${
                i !== jobs.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <span className="text-2xl w-9 text-center shrink-0">{job.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-poppins font-bold text-navy text-[15px] truncate">
                  {job.title}
                </p>
                <p className="text-gray-400 font-poppins text-xs mt-0.5">{job.id}</p>
                <p className="text-gray-400 font-poppins text-xs">{job.date}</p>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`inline-block font-poppins font-semibold text-xs px-3 py-1 rounded-full ${
                    statusStyles[job.status]
                  }`}
                >
                  {job.status}
                </span>
                <p className="font-poppins font-bold text-navy text-[15px] mt-1.5">
                  {job.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
