import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./Pantallas.css";

const Toast = () => {
  const { toast, setToast } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setToast("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast, setToast]);

  if (!visible || !toast) return null;

  return (
    <div className="toast-container">
      <p>{toast}</p>
    </div>
  );
};

export default Toast;
