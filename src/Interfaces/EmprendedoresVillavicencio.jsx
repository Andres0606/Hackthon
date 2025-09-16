import React, { useState, useEffect } from 'react';
import '../Componentes/EmprendedoresVillavicencio.css';

const EmprendedoresVillavicencio = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombreEmprendimiento: '',
    nombreCompleto: '',
    categoria: '',
    telefono: '',
    descripcion: '',
    ubicacion: '',
    instagram: ''
  });

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validación básica
    if (!formData.nombreEmprendimiento || !formData.nombreCompleto || !formData.categoria || !formData.telefono || !formData.descripcion || !formData.ubicacion) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    console.log('Datos del emprendimiento:', formData);
    
    // Aquí enviarías los datos a tu backend/API
    // fetch('/api/emprendimientos', { method: 'POST', body: JSON.stringify(formData) })
    
    setShowModal(true);
    setFormData({
      nombreEmprendimiento: '',
      nombreCompleto: '',
      categoria: '',
      telefono: '',
      descripcion: '',
      ubicacion: '',
      instagram: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="hero" id="inicio">
        <div className="hero-content">
          <h1>¡Tu Emprendimiento Merece Brillar! ✨</h1>
          <p>Conecta con miles de villavicenses, muestra tus productos y haz crecer tu negocio en la plataforma oficial de emprendimiento de Villavicencio.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('publicar')}>
              🚀 Publica tu Emprendimiento
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('vitrina')}>
              👀 Explorar Vitrina
            </button>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="section animate-on-scroll" id="vitrina">
        <h2>¿Por qué elegir nuestro portal?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Alcance Local</h3>
            <p>Conecta directamente con clientes de Villavicencio y el Meta. Tu audiencia perfecta está aquí esperándote.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🆓</span>
            <h3>Totalmente Gratis</h3>
            <p>Publica tus productos y servicios sin costo alguno. El apoyo de la Alcaldía para impulsar tu negocio.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Red de Contactos</h3>
            <p>Conoce otros emprendedores, colabora y crea alianzas estratégicas para hacer crecer tu negocio.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3>Oportunidades de Crecimiento</h3>
            <p>Accede a convocatorias, ferias y eventos exclusivos para emprendedores de la ciudad.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Plataforma Segura</h3>
            <p>Respaldada por la Alcaldía de Villavicencio, con verificación de emprendedores y transacciones seguras.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Fácil de Usar</h3>
            <p>Interfaz intuitiva y amigable. Publica en minutos desde cualquier dispositivo.</p>
          </div>
        </div>
      </section>

      {/* Formulario de Publicación */}
      <section className="section" id="publicar">
        <div className="publish-form animate-on-scroll">
          <h2 className="white-text mb-1">🚀 Publica tu Emprendimiento</h2>
          <p className="center-text mb-2 opacity-90">
            Completa la información de tu negocio y comienza a vender hoy mismo
          </p>
          
          <div>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre del Emprendimiento</label>
                <input 
                  type="text" 
                  name="nombreEmprendimiento"
                  value={formData.nombreEmprendimiento}
                  onChange={handleInputChange}
                  required 
                  placeholder="Ej: Delicias del Llano"
                />
              </div>
              <div className="form-group">
                <label>Tu Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleInputChange}
                  required 
                  placeholder="Ej: María González"
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select 
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="alimentos">🍕 Alimentos y Bebidas</option>
                  <option value="moda">👗 Moda y Accesorios</option>
                  <option value="tecnologia">💻 Tecnología</option>
                  <option value="salud">💊 Salud y Bienestar</option>
                  <option value="servicios">🛠️ Servicios</option>
                  <option value="artesanias">🎨 Artesanías</option>
                  <option value="educacion">📚 Educación</option>
                  <option value="otros">🌟 Otros</option>
                </select>
              </div>
              <div className="form-group">
                <label>Teléfono de Contacto</label>
                <input 
                  type="tel" 
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required 
                  placeholder="Ej: 311 234 5678"
                />
              </div>
              <div className="form-group full-width">
                <label>Descripción de tu Emprendimiento</label>
                <textarea 
                  rows="4" 
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required 
                  placeholder="Cuéntanos qué vendes, qué te hace especial, tus productos estrella..."
                />
              </div>
              <div className="form-group">
                <label>Ubicación en Villavicencio</label>
                <input 
                  type="text" 
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  required 
                  placeholder="Ej: Centro, Comuna 1"
                />
              </div>
              <div className="form-group">
                <label>Instagram (opcional)</label>
                <input 
                  type="url" 
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/tu_cuenta"
                />
              </div>
              <div className="form-group full-width form-submit-container">
                <button type="button" className="btn btn-primary form-submit-btn" onClick={handleSubmit}>
                  ✨ Publicar Mi Emprendimiento
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Emprendedores Destacados */}
      <section className="section animate-on-scroll" id="talento">
        <h2>🌟 Emprendedores Destacados</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">👨‍🍳</span>
            <h3>Chef Criollo</h3>
            <p><strong>Carlos Ramírez</strong><br />Especialista en comida llanera tradicional. Más de 500 pedidos exitosos.</p>
            <small>📍 Centro • 📞 314 567 8900</small>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎨</span>
            <h3>Arte Villavicense</h3>
            <p><strong>Ana Sofía Torres</strong><br />Artesanías únicas inspiradas en la cultura llanera. Reconocida nacionalmente.</p>
            <small>📍 La Grama • 📞 311 234 5678</small>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💻</span>
            <h3>Tech Solutions</h3>
            <p><strong>David Morales</strong><br />Desarrollo web y apps móviles para pequeñas empresas de la región.</p>
            <small>📍 Barzal • 📞 320 987 6543</small>
          </div>
        </div>
      </section>

      {/* Footer */}
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

      {/* Modal de Éxito */}
      {showModal && (
        <div className="modal show" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🎉 ¡Felicitaciones!</h3>
            <p>Tu emprendimiento ha sido enviado para revisión. En las próximas 24 horas estará visible en nuestra vitrina.</p>
            <button className="btn btn-primary" onClick={closeModal}>
              🚀 ¡Perfecto!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmprendedoresVillavicencio;