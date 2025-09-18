import React from 'react';
import '../Componentes/Header.css';

const Header = ({ scrollToSection }) => {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo" onClick={() => scrollToSection('inicio')}>
          Villavicencio Emprende
        </div>
        <ul className="nav-menu">
          <li><a onClick={() => scrollToSection('inicio')}>🔹 Explora</a></li>
          <li><a onClick={() => scrollToSection('vitrina')}>🔹 Vitrina</a></li>
          <li><a onClick={() => scrollToSection('oportunidades')}>🔹 Oportunidades</a></li>
          <li><a onClick={() => scrollToSection('talento')}>🔹 Talento Local</a></li>
          <li><a onClick={() => scrollToSection('contacto')}>🔹 Conéctate</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;