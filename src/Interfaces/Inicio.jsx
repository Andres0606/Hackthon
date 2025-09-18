import React from 'react';
import '../Componentes/Inicio.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Inicio = () => {
  return (
    <> 
      <Header />
      <div className="main-container">
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
      </div>
      <Footer />
    </>
  );
};

export default Inicio;
