import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { FaRunning, FaWalking, FaChild, FaTimes } from 'react-icons/fa';
import './Pantallas.css';

const ModalHoraDeMoverse = () => {
  const { mostrarModalMoverse, setMostrarModalMoverse, setInactivoHoy } = useContext(AppContext);
  const [realizado, setRealizado] = useState([false, false, false]);
  const [tiempos, setTiempos] = useState([
    { minutos: 2, segundos: 0, activo: false },
    { minutos: 5, segundos: 0, activo: false },
    { minutos: 2, segundos: 0, activo: false }
  ]);

  useEffect(() => {
    const intervalos = tiempos.map((_, index) => {
      if (tiempos[index].activo) {
        return setInterval(() => {
          setTiempos(prev => {
            const nuevosTiempos = [...prev];
            if (nuevosTiempos[index].segundos === 0) {
              if (nuevosTiempos[index].minutos === 0) {
                // Tiempo completado
                nuevosTiempos[index].activo = false;
                setRealizado(prev => {
                  const nuevaLista = [...prev];
                  nuevaLista[index] = true;
                  return nuevaLista;
                });
                return nuevosTiempos;
              }
              nuevosTiempos[index].minutos -= 1;
              nuevosTiempos[index].segundos = 59;
            } else {
              nuevosTiempos[index].segundos -= 1;
            }
            return nuevosTiempos;
          });
        }, 1000);
      }
      return null;
    });

    return () => intervalos.forEach(intervalo => intervalo && clearInterval(intervalo));
  }, [tiempos]);

  const iniciarCronometro = (index) => {
    // Si ya está activo, lo detenemos
    if (tiempos[index].activo) {
      setTiempos(prev => {
        const nuevosTiempos = [...prev];
        nuevosTiempos[index] = {
          minutos: index === 1 ? 5 : 2,
          segundos: 0,
          activo: false
        };
        return nuevosTiempos;
      });
    } else {
      // Si no está activo, lo iniciamos
      setTiempos(prev => {
        const nuevosTiempos = [...prev];
        nuevosTiempos[index].activo = true;
        return nuevosTiempos;
      });
    }
  };

  const formatearTiempo = (minutos, segundos) => {
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  if (!mostrarModalMoverse) return null;

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
          {tiempos.map((tiempo, index) => {
            const actividades = [
              { texto: "Estírate por 2 minutos", icono: <FaRunning /> },
              { texto: "Camina un poco (5 minutos)", icono: <FaWalking /> },
              { texto: "Rota hombros y cuello (2 minutos)", icono: <FaChild /> }
            ];
            
            return (
              <li 
                key={index}
                onClick={() => iniciarCronometro(index)} 
                className={`${realizado[index] ? 'hecho' : ''} ${tiempo.activo ? 'activo' : ''}`}
              >
                <div className="activity-content">
                  <div className="activity-text">
                    <span>✅ {actividades[index].texto}</span>
                    {tiempo.activo && (
                      <div className="cronometro">
                        {formatearTiempo(tiempo.minutos, tiempo.segundos)}
                      </div>
                    )}
                  </div>
                  {actividades[index].icono}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ModalHoraDeMoverse;