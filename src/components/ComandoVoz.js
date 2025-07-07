import React, { useEffect, useState } from 'react';
import './Pantallas.css';
import microfonoImg from '../components/assets/microfono.png';
import annyang from 'annyang';

const ComandoVoz = () => {
  const [mensaje, setMensaje] = useState("Da un comando para recibir sugerencias");
  const [escuchando, setEscuchando] = useState(false);

  useEffect(() => {
    if (annyang) {
      // Definir los comandos
      const comandos = {
        'caminar': () => setMensaje("¡Genial! Vamos a caminar 🏃"),
        'estirar': () => setMensaje("Hora de estirarte 🤸‍♂️"),
        'resumen': () => setMensaje("Mostrando resumen diario 📊"),
        'alerta': () => setMensaje("¡Atención! Movimiento necesario 🚨")
      };

      annyang.addCommands(comandos);

      annyang.addCallback('error', (err) => {
        console.error("Error con annyang:", err);
        setMensaje("Hubo un error con el reconocimiento de voz.");
        setEscuchando(false);
      });

      annyang.addCallback('soundstart', () => {
        setEscuchando(true);
        setMensaje("Escuchando...");
      });

      annyang.addCallback('end', () => {
        setEscuchando(false);
      });
    }
  }, []);

  const iniciarReconocimiento = () => {
    if (annyang) {
      annyang.start({ autoRestart: false, continuous: false, lang: 'es-ES' });
    } else {
      setMensaje("Tu navegador no soporta reconocimiento de voz sin conexión.");
    }
  };

  return (
    <div className="pantalla">
      <img
        src={microfonoImg}
        alt="comando de voz"
        className="pantalla-img"
        onClick={iniciarReconocimiento}
        style={{
          cursor: 'pointer',
          filter: escuchando ? 'drop-shadow(0 0 10px #2563eb)' : 'none'
        }}
      />
      <h2>Comando de Voz (sin red)</h2>
      <p>{mensaje}</p>
      <button className="btn" onClick={iniciarReconocimiento}>
        {escuchando ? "Escuchando..." : "Hablar"}
      </button>
    </div>
  );
};

export default ComandoVoz;
