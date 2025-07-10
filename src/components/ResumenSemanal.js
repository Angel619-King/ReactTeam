import React from 'react';
import './Pantallas.css';
import microfonoImg from '../components/assets/resumen.jpeg';

const ResumenSemanal = () => {
  return (
    
    <div className="pantalla">
        <img src={microfonoImg} alt="resumen" className="pantalla-img" />
      <h3>Resumen Semanal</h3>
      <ul>
        <li>Lunes: 20 min</li>
        <li>Martes: 30 min</li>
        <li>Miércoles: 0 min</li>
      </ul>
    </div>
  );
};

export default ResumenSemanal;
