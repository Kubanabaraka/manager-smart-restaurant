import React from "react";

function StatTile({
  label,
  value,
  trend,
  trendLabel,
  icon: Icon,
  accent = "brand",
}) {
  const accentMap = {
    brand: "bg-brand-500/10 text-brand-600",
    green: "bg-emerald-500/10 text-emerald-600",
    red: "bg-rose-500/10 text-rose-600",
    blue: "bg-sky-500/10 text-sky-600",
  };

  const accentClass = accentMap[accent] || accentMap.brand;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5 sm:py-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {value}
        </p>
        {trend && (
          <p className="mt-1 text-[11px] text-emerald-600">
            <span className="font-semibold">{trend}</span>{" "}
            <span className="text-slate-400">{trendLabel}</span>
          </p>
        )}
      </div>
      {Icon && (
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}

export default StatTile;
