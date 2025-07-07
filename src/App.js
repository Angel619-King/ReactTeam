import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DescansoActivo from './components/DescansoActivo';
import ComandoVoz from './components/ComandoVoz';
import AlertaInactividad from './components/AlertaInactividad';
import ResumenSemanal from './components/ResumenSemanal';
import SmartReminder from './components/SmartReminder';
import BotonAprender from './components/BotonAprender';
import PantallasHome from './components/PantallasHome';
import GoogleFit from './components/GoogleFit';
import ResumenDiario from './components/ResumenDiario';
import HoraDeMoverse from './components/HoraDeMoverse';
import { AppProvider } from './context/AppContext';
import './components/Pantallas.css';

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
      </Router>
    </AppProvider>
  );
}

export default App;
