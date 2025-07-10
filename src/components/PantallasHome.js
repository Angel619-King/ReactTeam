import React from 'react';
import './Pantallas.css';
import descansoImg from '../components/assets/image.png'; // ruta relativa

const DescansoActivo = () => {
  return (
    <div className="pantalla">
      <img src={descansoImg} alt="descanso activo" className="pantalla-img" />
      <h2>DESCANSO ACTIVO</h2>
      <p>Debes de tomar un descanso</p>
    </div>
  );
};

export default DescansoActivo;
