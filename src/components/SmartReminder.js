import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { FaRunning, FaWalking, FaChild, FaTimes } from "react-icons/fa";
import "./Pantallas.css";

const ACTIVIDADES = [
  { texto: "Estírate por 2 minutos", icono: <FaRunning />, duracion: 2 * 60 },
  { texto: "Camina un poco", icono: <FaWalking />, duracion: 5 * 60 },
  { texto: "Rota hombros y cuello", icono: <FaChild />, duracion: 3 * 60 },
];

const ModalHoraDeMoverse = () => {
  const { mostrarModalMoverse, setMostrarModalMoverse, setInactivoHoy } =
    useContext(AppContext);

  const [realizado, setRealizado] = useState([false, false, false]);
  const [actividadActual, setActividadActual] = useState(null);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const timerRef = useRef(null);

  const seleccionarActividad = (index) => {
    if (realizado[index]) return;
    setActividadActual(index);
    setSegundosRestantes(ACTIVIDADES[index].duracion);
  };

  useEffect(() => {
    if (actividadActual === null) return;

    if (segundosRestantes === 0) {
      setRealizado((prev) => {
        const copia = [...prev];
        copia[actividadActual] = true;
        return copia;
      });
      setActividadActual(null);
      setInactivoHoy(0);

      // Si todas las actividades hechas, cierra modal
      if (realizado.every((v) => v)) {
        setMostrarModalMoverse(false);
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setSegundosRestantes((seg) => seg - 1);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [segundosRestantes, actividadActual, realizado, setMostrarModalMoverse, setInactivoHoy]);

  const formatoTiempo = (seg) => {
    const m = Math.floor(seg / 60)
      .toString()
      .padStart(2, "0");
    const s = (seg % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!mostrarModalMoverse) return null;

  const pendientes = realizado
    .map((v, i) => (!v ? i : null))
    .filter((v) => v !== null);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button
          className="btn-cerrar"
          onClick={() => setMostrarModalMoverse(false)}
        >
          <FaTimes />
        </button>
        <h2>¡Hora de moverse!</h2>
        <p>
          No has tenido actividad en los últimos <strong>30 minutos</strong>
        </p>

        {actividadActual !== null ? (
          <>
            <p className="subtitulo">
              Realizando: <strong>{ACTIVIDADES[actividadActual].texto}</strong>
            </p>
            <p className="temporizador">{formatoTiempo(segundosRestantes)}</p>
            <button
              className="btn-cancelar"
              onClick={() => {
                clearTimeout(timerRef.current);
                setActividadActual(null);
              }}
            >
              Cancelar actividad
            </button>
          </>
        ) : pendientes.length === 0 ? (
          <p>¡Felicitaciones! Completaste todas las actividades.</p>
        ) : (
          <>
            <p className="subtitulo">Selecciona una actividad:</p>
            <ul className="lista-actividad">
              {pendientes.map((index) => (
                <li key={index} onClick={() => seleccionarActividad(index)}>
                  {ACTIVIDADES[index].texto} {ACTIVIDADES[index].icono}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalHoraDeMoverse;
