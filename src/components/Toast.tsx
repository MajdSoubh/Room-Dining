import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { ToastType } from "../context/ToastContext";

interface ToastProps {
  message: string;
  type: ToastType;
  period: number;
  onClose: () => void;
}

export const Toast = ({ message, type, period, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, period - 300);

    return () => clearTimeout(timer);
  }, [onClose, period]);

  const typeStyles = {
    success: "bg-primary border-primary",
    error: "bg-red-500 border-red-600",
    info: "bg-primary border-blue-600",
    warning: "bg-yellow-500 border-yellow-600",
  };

  const iconStyles = {
    success: (
      <Check className="bg-primary rounded-full p-[3px] stroke-white " />
    ),
    error: <X className="bg-red-600 rounded-full p-[3px] stroke-white " />,
    info: (
      <svg
        className="bg-blue-600 rounded-full w-6 h-6 p-[3px]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.01 20H12M12 14L12.01 4"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    warning: (
      <svg
        className="bg-yellow-500 rounded-full w-6 h-6 p-[3px]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.01 20H12M12 14L12.01 4"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed left-1/2 -translate-x-1/2 top-4 z-50 min-w-[300px] overflow-hidden rounded shadow-lg transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-[-1rem] opacity-0"
      }`}
    >
      <div className={`relative  text-white bg-background-primary`}>
        {/* Content */}
        <div className="flex items-center p-4 gap-3">
          <span className="text-xl">{iconStyles[type]}</span>
          <p className="flex-1 text-sm tracking-wider text-black/80 font-medium">
            {message}
          </p>
          <button
            onClick={onClose}
            className=" flex text-slate-400 items-center justify-center rounded-full w-6 h-6 p-1 transition-colors hover:bg-black/10"
            aria-label="Close toast"
          >
            <X />
          </button>
        </div>
        {/* Progress bar */}
        <div
          className={`absolute bottom-0 left-0 h-1  transition-all duration-300 ${typeStyles[type]}`}
          style={{
            width: isVisible ? "0%" : "100%",
            transition: `linear ${period}ms`,
          }}
        />
      </div>
    </div>
  );
};
