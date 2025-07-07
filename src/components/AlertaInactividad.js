import React from 'react';
import './Pantallas.css';
import alertaImg from '../components/assets/Alerta.jpeg'; // ✅ Ruta de la imagen

const AlertaInactividad = () => {
  return (
    <div className="pantalla alerta">
      <h3>ALERTA: Inactividad detectada</h3>
      <p>HAN PASADO 30 MINUTOS SIN MOVIMIENTO</p>
      <img src={alertaImg} alt="Alerta de inactividad" className="pantalla-img" />
    </div>
  );
};

export default AlertaInactividad;
