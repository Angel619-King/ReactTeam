import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { FaRunning, FaWalking, FaChild, FaTimes } from "react-icons/fa";
import "./Pantallas.css";
import beep from "./assets/beep.mp3"; // asegúrate de tener este archivo

const ACTIVIDADES = [
  { texto: "Estírate por 2 minutos", icono: <FaRunning />, duracion: 10 },
  { texto: "Camina un poco", icono: <FaWalking />, duracion: 10 },
  { texto: "Rota hombros y cuello", icono: <FaChild />, duracion: 10 },
];

const ModalHoraDeMoverse = () => {
  const {
    mostrarModalMoverse,
    setMostrarModalMoverse,
    setInactivoHoy,
    setToast,
  } = useContext(AppContext);

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

  const cancelarActividad = () => {
    clearTimeout(timerRef.current);
    setActividadActual(null);
    setToast("Actividad cancelada. Puedes intentarlo más tarde 💡");

    // 🔊 Sonido
    const audio = new Audio(beep);
    audio.play();

    // 📱 Vibración
    if (navigator.vibrate) {
      navigator.vibrate(300);
    }
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
            <button className="btn-cancelar" onClick={cancelarActividad}>
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
