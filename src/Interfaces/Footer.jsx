import React from 'react';
import '../Componentes/Footer.css';

const Footer = ({ scrollToSection }) => {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🏛 Alcaldía de Villavicencio</h3>
          <p>Impulsando el emprendimiento local para un Meta próspero y competitivo.</p>
          <p><strong>📍</strong> Carrera 29 # 37-04, Centro</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Alcaldía de Villavicencio - Portal de Emprendimiento. Todos los derechos reservados.</p>
        <p className="footer-love">💚 Hecho con amor por y para los villavicenses</p>
      </div>
    </footer>
  );
};

export default Footer;