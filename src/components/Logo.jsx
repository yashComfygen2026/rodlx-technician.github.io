export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: { text: "text-2xl", tag: "text-[9px]", bolt: "w-5 h-5" },
    md: { text: "text-4xl", tag: "text-xs", bolt: "w-7 h-7" },
    lg: { text: "text-6xl", tag: "text-sm", bolt: "w-11 h-11" },
  };
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`flex items-center font-poppins font-bold italic ${s.text} leading-none`}>
        <span className="text-red">R</span>
        <span
          className={`relative ${s.bolt} mx-0.5 rounded-full border-2 border-dashed border-white flex items-center justify-center shrink-0`}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-1/2 h-1/2">
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </span>
        <span className="text-white">DLX</span>
      </div>
      <span className={`text-white font-semibold tracking-[0.2em] ${s.tag}`}>
        TECHNICIAN
      </span>
    </div>
  );
}
