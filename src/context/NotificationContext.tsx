"use client";

import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
}

export interface NotificationPayload {
  type?: "success" | "error" | "info" | "warning" | "critical";
  title?: string;
  message: string;
}

interface NotificationContextType {
  showToast: (message: string, type?: ToastType) => void;
  addNotification: (payload: NotificationPayload | string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addNotification = (payload: NotificationPayload | string) => {
    const id = Math.random().toString(36).substring(2, 9);
    if (typeof payload === "string") {
      showToast(payload);
      return;
    }

    const typeMapped: ToastType =
      payload.type === "error" || payload.type === "critical"
        ? "error"
        : payload.type === "info" || payload.type === "warning"
        ? "info"
        : "success";

    const msg = payload.title ? `${payload.title}: ${payload.message}` : payload.message;
    setToasts((prev) => [...prev, { id, type: typeMapped, message: msg, title: payload.title }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showToast, addNotification }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl border text-sm font-medium transition-all transform animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === "success"
                ? "bg-white border-green-200 text-gray-900 shadow-green-500/10"
                : toast.type === "error"
                ? "bg-white border-red-200 text-gray-900 shadow-red-500/10"
                : "bg-white border-orange-200 text-gray-900 shadow-orange-500/10"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
              {toast.type === "error" && <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
              {toast.type === "info" && <Info className="w-4 h-4 text-brand-orange flex-shrink-0" />}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 ml-2 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}

export const useNotifications = useNotification;
