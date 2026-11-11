"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

let globalToastHandler: ((message: string, type: ToastType, duration?: number) => void) | null = null;

export const toast = {
  success: (msg: string, duration?: number) => globalToastHandler?.(msg, "success", duration),
  error: (msg: string, duration?: number) => globalToastHandler?.(msg, "error", duration),
  info: (msg: string, duration?: number) => globalToastHandler?.(msg, "info", duration),
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 4000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, message, duration };

      setToasts((prev) => [...prev.slice(-3), newToast]); // keep at most 4 toasts visible

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  React.useEffect(() => {
    globalToastHandler = showToast;
    return () => {
      globalToastHandler = null;
    };
  }, [showToast]);

  const value: ToastContextValue = {
    showToast,
    toast: {
      success: (m, d) => showToast(m, "success", d),
      error: (m, d) => showToast(m, "error", d),
      info: (m, d) => showToast(m, "info", d),
    },
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <aside
        aria-label="Notifications"
        className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              role="alert"
              aria-live="polite"
              data-toast-type={t.type}
              data-toast-message={t.message}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.12)] border backdrop-blur-xl transition-all ${
                t.type === "success"
                  ? "bg-white/80 border-emerald-500/30 text-emerald-950"
                  : t.type === "error"
                  ? "bg-white/80 border-rose-500/30 text-rose-950"
                  : "bg-white/80 border-[#1a1a1a]/20 text-[#1a1a1a]"
              }`}
            >
              <div className="flex items-center gap-3">
                {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                {t.type === "error" && <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />}
                {t.type === "info" && <Info className="w-5 h-5 text-[#1a1a1a]/60 flex-shrink-0" />}
                <p className="text-xs font-syne font-bold uppercase tracking-wider">{t.message}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-full hover:bg-black/5 transition-colors text-current opacity-60 hover:opacity-100"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (m: string, t?: ToastType) => globalToastHandler?.(m, t || "info"),
      toast,
    };
  }
  return context;
}

