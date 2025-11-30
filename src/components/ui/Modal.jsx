import React from "react";
import Button from "./Button.jsx";

function Modal({ open, title, description, onClose, children, primaryAction }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <header className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs text-slate-500">{description}</p>
            )}
          </div>
          <button
            type="button"
            className="text-xs text-slate-400 hover:text-slate-600"
            onClick={onClose}
          >
            Esc
          </button>
        </header>
        <div className="mb-4 text-sm text-slate-700">{children}</div>
        <footer className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          {primaryAction}
        </footer>
      </div>
    </div>
  );
}

export default Modal;
