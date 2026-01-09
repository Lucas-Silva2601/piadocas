"use client";

import { useEffect } from "react";

const TYPE_STYLES = {
  success: "border-green-600 bg-green-950 text-green-400",
  error: "border-red-600 bg-red-950 text-red-400",
  info: "border-blue-600 bg-blue-950 text-blue-400",
};

export default function Notification({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-3 right-3 left-3 z-50 flex animate-slide-in-right items-center justify-between gap-4 rounded-lg p-4 shadow-lg md:top-5 md:right-5 md:left-auto md:min-w-[300px] md:max-w-[500px] ${
        TYPE_STYLES[type] || TYPE_STYLES.info
      }`}
      role="alert"
    >
      <p className="flex-1 leading-relaxed">{message}</p>
      {onClose && (
        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center border-none bg-transparent p-0 text-2xl leading-none opacity-70 transition-opacity hover:opacity-100 focus:outline-2 focus:outline-current"
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          ×
        </button>
      )}
    </div>
  );
}
