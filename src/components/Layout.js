import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRunning, FaMicrophone, FaBell, FaClock, FaChartBar, FaRobot, FaQuestion } from 'react-icons/fa';

const links = [
  { path: "/", icon: <FaRunning />, label: "Descanso" },
  { path: "/voz", icon: <FaMicrophone />, label: "Voz" },
  { path: "/alerta", icon: <FaBell />, label: "Alerta" },
  { path: "/inactivo", icon: <FaClock />, label: "Inactivo" },
  { path: "/resumen", icon: <FaChartBar />, label: "Resumen" },
  { path: "/sra", icon: <FaRobot />, label: "Hora" },
  { path: "/aprende", icon: <FaQuestion />, label: "Ejercicio?" }
];

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="pantalla">
      <div className="contenido">{children}</div>
      <nav className="nav">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? 'nav-btn active' : 'nav-btn'}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
