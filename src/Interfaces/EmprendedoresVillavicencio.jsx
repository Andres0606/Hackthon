import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
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
      {/* Header Component */}
      <Header scrollToSection={scrollToSection} />

      {/* Sección de Inicio - Mockup */}
      <section className="inicio-section" id="inicio">
        <div className="inicio-header">
          <h1>Bienvenida</h1>
        </div>
        
        <div className="inicio-cards">
          <div className="inicio-card">
            <div className="card-icon">👥</div>
            <h3>Conoce emprendedores locales</h3>
            <p>Descubre y conecta con emprendedores de Villavicencio y el Meta</p>
            <button className="btn btn-secondary" onClick={() => scrollToSection('emprendedores')}>
              Ver Emprendedores
            </button>
          </div>
          
          <div className="inicio-card highlighted">
            <div className="card-icon">📅</div>
            <h3>Próximos eventos / convocatorias</h3>
            <p>Mantente al día con eventos, ferias y oportunidades de negocio</p>
            <button className="btn btn-primary" onClick={() => scrollToSection('eventos')}>
              Ver Eventos
            </button>
          </div>
          
          <div className="inicio-card">
            <div className="card-icon">💰</div>
            <h3>Oportunidades de financiación / apoyo</h3>
            <p>Encuentra programas de apoyo y financiación para tu emprendimiento</p>
            <button className="btn btn-secondary" onClick={() => scrollToSection('financiacion')}>
              Ver Oportunidades
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Emprendedores */}
      <section className="section animate-on-scroll" id="emprendedores">
        <h2>🌟 Emprendedores Locales</h2>
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
          <div className="feature-card">
            <span className="feature-icon">🛍️</span>
            <h3>Moda Llanera</h3>
            <p><strong>Lucía Herrera</strong><br />Diseños únicos inspirados en la cultura llanera. Moda sostenible y local.</p>
            <small>📍 Maizaro • 📞 315 789 0123</small>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌿</span>
            <h3>Productos Naturales</h3>
            <p><strong>Miguel Rodríguez</strong><br />Productos orgánicos del llano. Alimentación saludable y sostenible.</p>
            <small>📍 Kirpas • 📞 318 456 7890</small>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎵</span>
            <h3>Escuela de Música</h3>
            <p><strong>Carmen Delgado</strong><br />Enseñanza de música llanera y folclórica. Formación cultural auténtica.</p>
            <small>📍 Centro • 📞 301 234 5678</small>
          </div>
        </div>
      </section>

      {/* Sección de Eventos */}
      <section className="section animate-on-scroll" id="eventos">
        <h2>📅 Próximos Eventos y Convocatorias</h2>
        <div className="events-grid">
          <div className="event-card upcoming">
            <div className="event-date">
              <span className="day">25</span>
              <span className="month">DIC</span>
            </div>
            <div className="event-info">
              <h3>Feria de Emprendimiento Navideño</h3>
              <p>Expón tus productos navideños y conecta con clientes en la temporada más importante del año.</p>
              <div className="event-details">
                <span>📍 Plaza Los Libertadores</span>
                <span>⏰ 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-date">
              <span className="day">15</span>
              <span className="month">ENE</span>
            </div>
            <div className="event-info">
              <h3>Convocatoria Impulsa Meta 2025</h3>
              <p>Programa de apoyo financiero para emprendimientos innovadores. Hasta $50 millones por proyecto.</p>
              <div className="event-details">
                <span>📝 Inscripciones abiertas</span>
                <span>💰 Hasta $50.000.000</span>
              </div>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-date">
              <span className="day">20</span>
              <span className="month">ENE</span>
            </div>
            <div className="event-info">
              <h3>Taller de Marketing Digital</h3>
              <p>Aprende a promocionar tu emprendimiento en redes sociales y plataformas digitales.</p>
              <div className="event-details">
                <span>📍 Cámara de Comercio</span>
                <span>🎓 Capacitación gratuita</span>
              </div>
            </div>
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

      {/* Sección de Financiación */}
      <section className="section animate-on-scroll" id="financiacion">
        <h2>💰 Oportunidades de Financiación y Apoyo</h2>
        <div className="financing-grid">
          <div className="financing-card government">
            <div className="financing-header">
              <span className="financing-icon">🏛️</span>
              <h3>Programas Gubernamentales</h3>
            </div>
            <ul className="financing-list">
              <li>💼 Fondo Emprender SENA - Hasta $200 millones</li>
              <li>🌱 Colombia Emprende - Capital semilla</li>
              <li>📈 iNNpulsa Colombia - Escalamiento</li>
              <li>🎯 Programa Meta Emprende - Apoyo local</li>
            </ul>
            <button className="btn btn-outline">Ver Convocatorias</button>
          </div>
          
          <div className="financing-card private">
            <div className="financing-header">
              <span className="financing-icon">🏢</span>
              <h3>Sector Privado</h3>
            </div>
            <ul className="financing-list">
              <li>🏦 Bancóldex - Líneas de crédito especiales</li>
              <li>💳 Microcréditos Bancamía</li>
              <li>🤝 Fundación Grameen - Microfinanzas</li>
              <li>📊 Aceleradoras privadas</li>
            </ul>
            <button className="btn btn-outline">Conocer Más</button>
          </div>
          
          <div className="financing-card support">
            <div className="financing-header">
              <span className="financing-icon">🎓</span>
              <h3>Programas de Apoyo</h3>
            </div>
            <ul className="financing-list">
              <li>📚 Capacitaciones gratuitas</li>
              <li>👨‍🏫 Mentoría empresarial</li>
              <li>🔧 Asistencia técnica</li>
              <li>🌐 Acceso a mercados digitales</li>
            </ul>
            <button className="btn btn-outline">Inscribirse</button>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer scrollToSection={scrollToSection} />

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