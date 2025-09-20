import React from "react";
import "../Componentes/Header.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = ({ scrollToSection }) => {
  return (
    <header className="header">
      <nav className="nav-container">

        {/* Logo Izquierda */}
        <div className="logo" onClick={() => scrollToSection("inicio")}>
          Impulsa Villavo
        </div>

        {/* Centro: Menú + Buscador */}
        <div className="nav-center">
          <ul className="nav-menu">
            <li>
              <a onClick={() => scrollToSection("inicio")}>Inicio</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("catalogo")}>Catálogo</a>
            </li>
          </ul>
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar..."
          />
        </div>

        {/* Derecha: Notificaciones + Usuario */}
        <div className="nav-right">
          <FaBell className="icon bell" />
          <FaUserCircle className="icon user" />
        </div>
      </nav>
    </header>
  );
};

export default Header;