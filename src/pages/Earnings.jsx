import { useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const tabs = ["This Week", "This Month", "All Time"];

const chartData = [
  { day: "Mon", value: 100 },
  { day: "Tue", value: 180 },
  { day: "Wed", value: 225 },
  { day: "Thu", value: 260 },
  { day: "Fri", value: 190 },
  { day: "Sat", value: 170 },
  { day: "Sun", value: 245 },
];

const maxValue = 300;

const rows = [
  { icon: "💼", label: "Base Earnings", amount: "$480.00" },
  { icon: "📍", label: "Distance Pay", amount: "$120.00" },
  { icon: "⭐", label: "Incentives", amount: "$45.60" },
];

export default function Earnings() {
  const [activeTab, setActiveTab] = useState("This Week");

  return (
    <div className="screen">
      <Header title="Earnings" />

      <div className="px-4">
        <div className="flex items-center bg-card border border-card-border rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-full font-poppins font-semibold text-sm transition ${
                activeTab === tab ? "bg-white text-red" : "text-muted-light"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="text-white font-poppins text-sm">Total Earnings</p>
        <p className="text-white font-poppins font-bold text-4xl mt-1">$645.60</p>
        <p className="text-green-500 font-poppins text-sm mt-1">↑ 12% vs last week</p>
      </div>

      <div className="px-4 mt-8">
        <div className="flex gap-3">
          <div className="flex flex-col justify-between h-36 text-muted-light font-poppins text-xs shrink-0">
            <span>$300</span>
            <span>$200</span>
            <span>$100</span>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 h-36">
            {chartData.map((d, i) => (
              <div key={d.day} className="flex-1 max-w-[30px] h-full flex items-end">
                <div
                  className={`w-full rounded-t-md ${
                    i === chartData.length - 1
                      ? "bg-gradient-to-b from-red-accent to-red"
                      : "bg-gradient-to-b from-sky-400 to-blue-600"
                  }`}
                  style={{ height: `${(d.value / maxValue) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex mt-2">
          <div className="w-9 shrink-0" />
          <div className="flex-1 flex justify-between gap-2">
            {chartData.map((d) => (
              <span
                key={d.day}
                className="flex-1 max-w-[30px] text-center text-muted-light font-poppins text-xs"
              >
                {d.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-8 mb-4">
        <div className="bg-white rounded-3xl overflow-hidden px-4">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-4 ${
                i !== rows.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{row.icon}</span>
                <span className="font-poppins font-bold text-navy text-[15px]">
                  {row.label}
                </span>
              </div>
              <span className="font-poppins font-bold text-navy text-[15px]">
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
