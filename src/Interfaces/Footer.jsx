import React from 'react';
import '../Componentes/Footer.css';

const Footer = ({ scrollToSection }) => {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🏛️ Alcaldía de Villavicencio</h3>
          <p>Impulsando el emprendimiento local para un Meta próspero y competitivo.</p>
          <p><strong>📍</strong> Carrera 29 # 37-04, Centro</p>
          <p><strong>📞</strong> (8) 681 5000</p>
        </div>
        <div className="footer-section">
          <h3>🚀 Para Emprendedores</h3>
          <a onClick={() => scrollToSection('publicar')}>Publica tu negocio</a>
          <a onClick={() => scrollToSection('oportunidades')}>Ver convocatorias</a>
          <a>Capacitaciones gratuitas</a>
          <a>Programa de mentoría</a>
        </div>
        <div className="footer-section">
          <h3>🛒 Para Compradores</h3>
          <a onClick={() => scrollToSection('vitrina')}>Explorar productos</a>
          <a>Buscar por categorías</a>
          <a>Compra local</a>
          <a>Mis favoritos</a>
        </div>
        <div className="footer-section">
          <h3>📞 Soporte</h3>
          <a href="mailto:emprendimiento@villavicencio.gov.co">📧 Escribenos</a>
          <a href="tel:+576816000">📞 (8) 681 6000</a>
          <a>❓ Centro de ayuda</a>
          <a>📋 Términos y condiciones</a>
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