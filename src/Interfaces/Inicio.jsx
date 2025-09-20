import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Componentes/Inicio.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Main = () => {
  const navigate = useNavigate();

  // Función para manejar la navegación
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <> 
      <Header />
      <div className="main-container">
        
        <section className="welcome-section">
          <div className="welcome-content centered-content">
            <h1 className="welcome-title centered-title">¡Bienvenido a Impulsa Villao!</h1>
            <p className="welcome-description centered-text">
              Tu plataforma oficial para conectar con el ecosistema emprendedor de Villavicencio y el Meta. 
              Aquí podrás descubrir talentosos emprendedores locales, mantenerte al día con los próximos 
              eventos y convocatorias, y acceder a valiosas oportunidades de financiación y apoyo. 
              Únete a nuestra comunidad y haz crecer tu negocio con el respaldo de la Alcaldía de Villavicencio.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="section animate-on-scroll" id="vitrina">
          <h2 className="centered-title">¿Por qué elegir nuestro portal?</h2>
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
              <span className="feature-icon">📱</span>
              <h3>Fácil de Usar</h3>
              <p>Interfaz intuitiva y amigable. Publica en minutos desde cualquier dispositivo.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
        <main className="content">
          <div className="cards-container">
            {/* Card 1 - Info Card */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Conoce emprendedores locales</h2>
                <div className="card-info-section">
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-icon">🏪</span>
                      <div className="info-text">
                        <strong>Tiendas locales</strong>
                        <p>Productos artesanales, comida típica y servicios únicos</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🤝</span>
                      <div className="info-text">
                        <strong>Networking</strong>
                        <p>Conecta con otros empresarios de la región</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📍</span>
                      <div className="info-text">
                        <strong>Villavicencio y Meta</strong>
                        <p>Encuentra negocios cerca de ti</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="info-button"
                    onClick={() => handleNavigation('/emprendedores')}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 - Events Info */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Próximos eventos / convocatorias</h2>
                <div className="card-info-section">
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-icon">📅</span>
                      <div className="info-text">
                        <strong>Ferias empresariales</strong>
                        <p>Eventos mensuales para mostrar tu negocio</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🎓</span>
                      <div className="info-text">
                        <strong>Talleres de capacitación</strong>
                        <p>Aprende sobre marketing, finanzas y gestión</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📢</span>
                      <div className="info-text">
                        <strong>Convocatorias públicas</strong>
                        <p>Programas de la Alcaldía y entidades aliadas</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="info-button"
                    onClick={() => handleNavigation('/eventos')}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 - Funding Info */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Oportunidades de financiación / apoyo</h2>
                <div className="card-info-section">
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-icon">💰</span>
                      <div className="info-text">
                        <strong>Fondos municipales</strong>
                        <p>Capital semilla y créditos blandos</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🏛️</span>
                      <div className="info-text">
                        <strong>Programas SENA</strong>
                        <p>Financiación y acompañamiento técnico</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📈</span>
                      <div className="info-text">
                        <strong>Asesoría gratuita</strong>
                        <p>Consultoría en planes de negocio y crecimiento</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="info-button"
                    onClick={() => handleNavigation('/financiamiento')}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      <Footer />
    </>
  );
};

export default Main;