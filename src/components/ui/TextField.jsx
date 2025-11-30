import React from "react";

function TextField({ label, hint, error, className = "", ...props }) {
  return (
    <label className={["block text-xs sm:text-sm", className].join(" ")}>
      <span className="mb-1 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      <input
        className={[
          "mt-0.5 block w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400",
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
            : "border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10",
        ].join(" ")}
        {...props}
      />
      {hint && !error && (
        <p className="mt-1 text-[11px] text-slate-400">{hint}</p>
      )}
      {error && <p className="mt-1 text-[11px] text-rose-500">{error}</p>}
    </label>
  );
}

export default TextField;
