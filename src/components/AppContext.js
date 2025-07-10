import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [inactivoHoy, setInactivoHoy] = useState(0);
  const [mostrarModalMoverse, setMostrarModalMoverse] = useState(false);
  const [toast, setToast] = useState(""); // nuevo

  useEffect(() => {
    const intervalo = setInterval(() => {
      setInactivoHoy((prev) => {
        console.log("⏱️ Tiempo inactivo:", prev + 1);
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (inactivoHoy >= 1800) {
      setMostrarModalMoverse(true);
    }
  }, [inactivoHoy]);

  useEffect(() => {
    const resetInactividad = () => setInactivoHoy(0);
    window.addEventListener("mousemove", resetInactividad);
    window.addEventListener("keydown", resetInactividad);
    window.addEventListener("touchstart", resetInactividad);

    return () => {
      window.removeEventListener("mousemove", resetInactividad);
      window.removeEventListener("keydown", resetInactividad);
      window.removeEventListener("touchstart", resetInactividad);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        inactivoHoy,
        setInactivoHoy,
        mostrarModalMoverse,
        setMostrarModalMoverse,
        toast,
        setToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
