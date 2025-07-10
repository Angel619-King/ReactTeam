import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComandoVoz() {
  const [mensaje, setMensaje] = useState("");
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  // Función beep con Web Audio API
  const playBeep = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  };

  // Síntesis de voz que ejecuta callback al terminar
  const hablar = (texto, callback) => {
    if (!window.speechSynthesis) {
      if (callback) callback();
      return;
    }
    const sintesis = window.speechSynthesis;
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-ES";
    voz.onend = () => {
      if (callback) callback();
    };
    sintesis.speak(voz);
  };

  const commands = [
    {
      command: ["caminar", "quiero caminar", "vamos a caminar"],
      callback: () => {
        playBeep();
        setMensaje("¡Vamos a caminar! 🏃");
        setToast("Redirigiendo a 'Caminar'...");
        hablar("Vamos a caminar", () => navigate("/moverse"));
      },
    },
    {
      command: ["estirar", "necesito estirarme", "quiero estirarme"],
      callback: () => {
        playBeep();
        setMensaje("Hora de estirarte 🤸");
        setToast("Abriendo pantalla de estiramiento...");
        hablar("Es hora de estirarse", () => navigate("/descanso"));
      },
    },
    {
      command: ["resumen", "mostrar resumen", "ver resumen diario"],
      callback: () => {
        playBeep();
        setMensaje("Mostrando resumen diario 📊");
        setToast("Redirigiendo a 'Resumen diario'");
        hablar("Este es tu resumen del día", () => navigate("/diario"));
      },
    },
    {
      command: ["alerta", "activar alerta", "mostrar alerta de inactividad"],
      callback: () => {
        playBeep();
        setMensaje("Alerta de inactividad activa 🚨");
        setToast("Mostrando alerta...");
        hablar("Atención: necesitas moverte", () => navigate("/alerta"));
      },
    },
  ];

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();
      console.log("Texto reconocido:", transcript);

      const cmd = commands.find(({ command }) =>
        command.some((phrase) => transcript.includes(phrase))
      );

      if (cmd) {
        console.log("Comando reconocido:", cmd.command);
        cmd.callback();
      } else {
        console.log("Comando no reconocido");
        setMensaje(`No reconozco el comando: "${transcript}"`);
      }
    };

    recognition.onerror = (event) => {
      console.error("Error reconocimiento voz:", event.error);
      setMensaje("Error en el reconocimiento de voz: " + event.error);
    };

    recognition.onend = () => {
      recognition.start();
    };

    recognition.start();

    return () => {
      recognition.abort();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Comando de Voz</h2>
      <p>Di un comando como: "caminar", "estirar", "resumen" o "alerta".</p>

      <button
        onClick={() => {
          setMensaje("Navegando manualmente a /moverse");
          navigate("/moverse");
        }}
        style={{ marginBottom: 20 }}
      >
        Ir a Moverse (Manual)
      </button>

      {mensaje && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#eef",
            borderRadius: 5,
            border: "1px solid #99f",
          }}
        >
          {mensaje}
        </div>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: 10,
            backgroundColor: "#333",
            color: "white",
            borderRadius: 5,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
