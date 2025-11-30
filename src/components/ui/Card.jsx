import React from "react";

function Card({ title, description, children, className = "" }) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6",
        className,
      ].join(" ")}
    >
      {(title || description) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          <div>
            {title && (
              <h2 className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-slate-500">{description}</p>
            )}
          </div>
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}

export default Card;
