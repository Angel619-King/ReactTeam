import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Toast from "./components/Toast";

// Contexto global
import { AppProvider, AppContext } from "./context/AppContext";

// Componentes principales
import Layout from "./components/Layout";
import ModalHoraDeMoverse from "./components/HoraDeMoverse";

// Pantallas
import PantallasHome from "./components/PantallasHome";
import DescansoActivo from "./components/DescansoActivo";
import ComandoVoz from "./components/ComandoVoz";
import AlertaInactividad from "./components/AlertaInactividad";
import ResumenSemanal from "./components/ResumenSemanal";
import ResumenDiario from "./components/ResumenDiario";
import SmartReminder from "./components/SmartReminder";
import BotonAprender from "./components/BotonAprender";
import GoogleFit from "./components/GoogleFit";
import HoraDeMoverse from "./components/HoraDeMoverse";

// Botón de prueba para mostrar modal manualmente
const BotonForzarModal = () => {
  const { setMostrarModalMoverse } = useContext(AppContext);

  return (
    <button
      onClick={() => setMostrarModalMoverse(true)}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        padding: "10px 15px",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        zIndex: 9999,
        cursor: "pointer",
      }}
    >
      Mostrar Modal Manual
    </button>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PantallasHome />} />
            <Route path="/descanso" element={<DescansoActivo />} />
            <Route path="/voz" element={<ComandoVoz />} />
            <Route path="/alerta" element={<AlertaInactividad />} />
            <Route path="/resumen" element={<ResumenSemanal />} />
            <Route path="/diario" element={<ResumenDiario />} />
            <Route path="/sra" element={<SmartReminder />} />
            <Route path="/aprende" element={<BotonAprender />} />
            <Route path="/fit" element={<GoogleFit />} />
            <Route path="/moverse" element={<HoraDeMoverse />} />
          </Routes>
        </Layout>

        {/* Modal de notificación por inactividad */}
        <ModalHoraDeMoverse />
        <Toast />

        {/* Botón de prueba para mostrar modal manual */}
        <BotonForzarModal />
      </Router>
    </AppProvider>
  );
}

export default App;
