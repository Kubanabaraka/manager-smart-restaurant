import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, options = {}) => {
    const id = ++idCounter;
    const toast = {
      id,
      message,
      type: options.type || "success",
      duration: options.duration || 2600,
    };

    setToasts((current) => [...current, toast]);

    if (toast.duration > 0) {
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
      }, toast.duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6">
        <div className="flex w-full max-w-md flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-sm shadow-lg shadow-slate-900/10 backdrop-blur-sm sm:px-4 sm:py-2.5 ${
                toast.type === "success"
                  ? "border-emerald-200 bg-emerald-50/95 text-emerald-800"
                  : toast.type === "error"
                  ? "border-rose-200 bg-rose-50/95 text-rose-800"
                  : "border-slate-200 bg-white/95 text-slate-800"
              }`}
            >
              <span className="text-xs sm:text-sm">{toast.message}</span>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-[11px] font-medium text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
