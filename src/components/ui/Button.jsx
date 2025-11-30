import React from "react";

function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-500 text-white shadow-sm hover:bg-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 border border-slate-200",
    subtle: "bg-slate-900 text-white hover:bg-slate-800",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-sm px-5 py-2.5",
  };

  return (
    <button
      className={[base, variants[variant], sizes[size], className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
