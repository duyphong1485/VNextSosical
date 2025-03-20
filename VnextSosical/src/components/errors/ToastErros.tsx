import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#e2720a",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "4px",
        zIndex: 9999,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
