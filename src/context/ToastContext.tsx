import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "../components/Toast";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  period: number;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, period?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (
    message: string,
    type: ToastType = "info",
    period: number = 5000
  ) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { id, message, type, period }]);

    setTimeout(() => {
      removeToast(id);
    }, period);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            period={toast.period}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
