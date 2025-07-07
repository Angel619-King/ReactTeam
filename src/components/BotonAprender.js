import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import './Pantallas.css';

const BotonAprender = () => {
  const { ejercioHecho, setEjercicioHecho } = useContext(AppContext);

  const elegir = (resp) => setEjercicioHecho(resp);

  return (
    <motion.div className="pantalla"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>¿Hiciste los ejercicios?</h2>
      <div>
        <button className="btn" onClick={() => elegir(true)}>Sí</button>
        <button className="btn" onClick={() => elegir(false)}>No</button>
      </div>
      {ejercioHecho !== null && (
        <p className="resultado">
          {ejercioHecho ? '¡Excelente! 👍' : 'No te rindas, inténtalo después 💪'}
        </p>
      )}
    </motion.div>
  );
};

export default BotonAprender;
