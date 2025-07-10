import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ejercioHecho, setEjercicioHecho] = useState(null);
  const [inactivoHoy, setInactivoHoy] = useState(0);
  const [alertaInactividad, setAlertaInactividad] = useState(false);
  const [mostrarModalMoverse, setMostrarModalMoverse] = useState(false);

  useEffect(() => {
  const interval = setInterval(() => {
    setInactivoHoy(prev => prev + 1);
  }, 1000); // cada 1 segundo
  return () => clearInterval(interval);
}, []);


  return (
    <AppContext.Provider value={{
      ejercioHecho,
      setEjercicioHecho,
      inactivoHoy,
      setInactivoHoy,
      alertaInactividad,
      setAlertaInactividad,
      mostrarModalMoverse,
      setMostrarModalMoverse
    }}>
      {children}
    </AppContext.Provider>
  );
};
