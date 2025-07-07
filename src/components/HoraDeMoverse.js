import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaRunning, FaWalking, FaChild, FaTimes } from 'react-icons/fa';
import './Pantallas.css';

const ModalHoraDeMoverse = () => {
  const { mostrarModalMoverse, setMostrarModalMoverse, setInactivoHoy } = useContext(AppContext);
  const [realizado, setRealizado] = useState([false, false, false]);

  if (!mostrarModalMoverse) return null;

  const toggleActividad = (index) => {
    const nuevaLista = [...realizado];
    nuevaLista[index] = !nuevaLista[index];
    setRealizado(nuevaLista);

    if (nuevaLista.every(v => v)) {
      setMostrarModalMoverse(false);
      setInactivoHoy(0); // Reinicia el tiempo inactivo
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="btn-cerrar" onClick={() => setMostrarModalMoverse(false)}>
          <FaTimes />
        </button>
        <h2>¡Hora de moverse!</h2>
        <p>No has tenido actividad en los últimos <strong>30 minutos</strong></p>
        <p className="subtitulo">Prueba uno de estos:</p>

        <ul className="lista-actividad">
          <li onClick={() => toggleActividad(0)} className={realizado[0] ? 'hecho' : ''}>
            ✅ Estírate por 2 minutos <FaRunning />
          </li>
          <li onClick={() => toggleActividad(1)} className={realizado[1] ? 'hecho' : ''}>
            ✅ Camina un poco <FaWalking />
          </li>
          <li onClick={() => toggleActividad(2)} className={realizado[2] ? 'hecho' : ''}>
            ✅ Rota hombros y cuello <FaChild />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalHoraDeMoverse;
