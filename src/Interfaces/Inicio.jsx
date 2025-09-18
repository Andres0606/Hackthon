import React from 'react';
import '../Componentes/Inicio.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Main = () => {
  return (
    <> 
      <Header />
      <div className="main-container">
        {/* Welcome Section - Mejorada y centrada */}
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
      </div>

      {/* Main Content */}
        <main className="content">
          <div className="cards-container">
            {/* Card 1 */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Conoce emprendedores locales</h2>
                <div className="card-image-placeholder card-red">
                  <div className="camera-icon">📷</div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Próximos eventos / convocatorias</h2>
                <div className="card-image-placeholder card-yellow">
                  <div className="camera-icon">📷</div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Oportunidades de financiación / apoyo</h2>
                <div className="card-image-placeholder card-green">
                  <div className="camera-icon">📷</div>
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