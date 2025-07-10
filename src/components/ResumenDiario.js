import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import resumenImg from '../components/assets/image1.png'; // asegúrate de que esta imagen exista
import './Pantallas.css';

const ResumenDiario = () => {
  const { inactivoHoy } = useContext(AppContext);

  const totalHoras = 24;
  const hrsInactivo = (inactivoHoy / 60).toFixed(1);
  const hrsActivo = (totalHoras - hrsInactivo).toFixed(1);

  return (
    <div className="pantalla">
      <img src={resumenImg} alt="Resumen diario" className="pantalla-img" />
      <h3>Resumen Diario</h3>
      <p>hrs activo: <span style={{ color: 'limegreen' }}>{hrsActivo}</span></p>
      <p>hrs inactivo: <span style={{ color: 'red' }}>{hrsInactivo}</span></p>
    </div>
  );
};

export default ResumenDiario;
