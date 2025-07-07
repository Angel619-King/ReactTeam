import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaRunning, FaWalking, FaChild } from 'react-icons/fa';
import './Pantallas.css';

const HoraDeMoverse = () => {
  const { inactivoHoy } = useContext(AppContext);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [realizado, setRealizado] = useState([false, false, false]);

  useEffect(() => {
    if (inactivoHoy >= 30) {
      setMostrarAlerta(true);
    }
  }, [inactivoHoy]);

  const toggleActividad = (index) => {
    setRealizado(prev => {
      const actualizado = [...prev];
      actualizado[index] = !actualizado[index];
      return actualizado;
    });
  };

  if (!mostrarAlerta) return null;

  return (
    <div className="pantalla alerta">
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
  );
};

export default HoraDeMoverse;
