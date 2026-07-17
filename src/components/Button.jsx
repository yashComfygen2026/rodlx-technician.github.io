export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "w-full py-3.5 rounded-xl font-poppins font-semibold text-base transition active:scale-[0.98]";
  const variants = {
    primary: "bg-red text-white shadow-lg shadow-red/20",
    outline: "bg-transparent border border-card-border text-white",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
