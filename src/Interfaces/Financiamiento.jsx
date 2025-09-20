import React, { useState } from 'react';
import '../Componentes/Financiamiento.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const OportunidadesFinanciamiento = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const oportunidades = [
    {
      id: 1,
      titulo: "Fondo de Inversión para Emprendedores",
      descripcion: "Capital semilla para nuevos emprendimientos en Villavicencio. Financiamiento hasta $50 millones para proyectos innovadores.",
      categoria: "fondos-inversion",
      monto: "Hasta $50.000.000",
      plazo: "12-24 meses",
      requisitos: ["Plan de negocio", "Registro mercantil", "Experiencia en el sector"],
      interes: "0% - 8%",
      estado: "Abierta",
      fechaLimite: "30 de Diciembre 2025"
    },
    {
      id: 2,
      titulo: "Microcréditos para PYMES",
      descripcion: "Financiamiento rápido para pequeñas y medianas empresas del sector agropecuario y comercial.",
      categoria: "creditos",
      monto: "$5.000.000 - $20.000.000",
      plazo: "6-18 meses",
      requisitos: ["Cédula", "Estados financieros", "Garantía"],
      interes: "12% - 18%",
      estado: "Disponible",
      fechaLimite: "Proceso continuo"
    },
    {
      id: 3,
      titulo: "Subsidio para Mujeres Emprendedoras",
      descripcion: "Apoyo económico no reembolsable para mujeres que inicien proyectos productivos en el Meta.",
      categoria: "subsidios",
      monto: "Hasta $15.000.000",
      plazo: "N/A",
      requisitos: ["Ser mujer", "Proyecto productivo", "Residir en el Meta"],
      interes: "0% (No reembolsable)",
      estado: "Próximamente",
      fechaLimite: "15 de Enero 2026"
    },
    {
      id: 4,
      titulo: "Fondo Verde para Proyectos Sostenibles",
      descripcion: "Financiamiento para proyectos con impacto ambiental positivo y sostenibilidad económica.",
      categoria: "fondos-inversion",
      monto: "$30.000.000 - $100.000.000",
      plazo: "24-60 meses",
      requisitos: ["Evaluación ambiental", "Plan sostenible", "Experiencia previa"],
      interes: "3% - 6%",
      estado: "Abierta",
      fechaLimite: "28 de Febrero 2026"
    },
    {
      id: 5,
      titulo: "Línea de Crédito para Tecnología",
      descripcion: "Financiamiento especializado para empresas del sector tecnológico y digital.",
      categoria: "creditos",
      monto: "$10.000.000 - $80.000.000",
      plazo: "12-36 meses",
      requisitos: ["Proyecto tecnológico", "Equipo técnico", "Prototipo"],
      interes: "8% - 14%",
      estado: "Disponible",
      fechaLimite: "Proceso continuo"
    },
    {
      id: 6,
      titulo: "Apoyo para Jóvenes Rurales",
      descripcion: "Subsidio para jóvenes entre 18-28 años que desarrollen proyectos agropecuarios innovadores.",
      categoria: "subsidios",
      monto: "Hasta $25.000.000",
      plazo: "N/A",
      requisitos: ["18-28 años", "Proyecto agropecuario", "Residencia rural"],
      interes: "0% (No reembolsable)",
      estado: "En evaluación",
      fechaLimite: "10 de Marzo 2026"
    }
  ];

  const categorias = [
    { id: 'todos', label: 'Todas las Oportunidades', icon: '🌟' },
    { id: 'fondos-inversion', label: 'Fondos de Inversión', icon: '💰' },
    { id: 'creditos', label: 'Créditos', icon: '🏦' },
    { id: 'subsidios', label: 'Subsidios', icon: '🎁' }
  ];

  const oportunidadesFiltradas = oportunidades.filter(oportunidad => {
    const cumpleFiltro = filtroActivo === 'todos' || oportunidad.categoria === filtroActivo;
    const cumpleBusqueda = oportunidad.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                           oportunidad.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'Abierta': return 'estado-abierta';
      case 'Disponible': return 'estado-disponible';
      case 'Próximamente': return 'estado-proximamente';
      case 'En evaluación': return 'estado-evaluacion';
      default: return 'estado-disponible';
    }
  };

  const handleContactar = (oportunidad) => {
    alert(`Contactar para: ${oportunidad.titulo}`);
    // Aquí puedes implementar la funcionalidad de contacto
  };

  return (
    <div className="oportunidades-wrapper">
      <Header />
      
      <div className="oportunidades-container">
        {/* Header Principal */}
        <div className="oportunidades-header">
          <div className="oportunidades-title">
            <div className="left-section">
              <h1>Oportunidades de Financiamiento</h1>
            </div>
            
            <div className="buscador-container">
              <input
                type="text"
                className="buscador"
                placeholder="Buscar oportunidades..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Navegación de Categorías */}
        <nav className="oportunidades-nav">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className={`nav-item ${filtroActivo === categoria.id ? 'active' : ''}`}
              onClick={() => setFiltroActivo(categoria.id)}
            >
              {categoria.icon} {categoria.label}
            </div>
          ))}
        </nav>

        {/* Grid de Oportunidades */}
        <div className="oportunidades-grid">
          {oportunidadesFiltradas.map((oportunidad, index) => (
            <div
              key={oportunidad.id}
              className={`oportunidad-card fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header de la tarjeta */}
              <div className="oportunidad-header">
                <h3 className="oportunidad-titulo">
                  {oportunidad.titulo}
                </h3>
                <div className={`estado-badge ${getEstadoClass(oportunidad.estado)}`}>
                  {oportunidad.estado}
                </div>
              </div>

              {/* Descripción */}
              <p className="oportunidad-descripcion">
                {oportunidad.descripcion}
              </p>

              {/* Información clave */}
              <div className="oportunidad-info">
                <div className="info-item">
                  <strong>💰 Monto:</strong>
                  <div>{oportunidad.monto}</div>
                </div>
                <div className="info-item">
                  <strong>⏰ Plazo:</strong>
                  <div>{oportunidad.plazo}</div>
                </div>
                <div className="info-item">
                  <strong>📈 Interés:</strong>
                  <div>{oportunidad.interes}</div>
                </div>
                <div className="info-item">
                  <strong>📅 Fecha límite:</strong>
                  <div>{oportunidad.fechaLimite}</div>
                </div>
              </div>

              {/* Requisitos */}
              <div className="requisitos-section">
                <strong className="requisitos-title">
                  📋 Requisitos:
                </strong>
                <div className="requisitos-list">
                  {oportunidad.requisitos.map((requisito, i) => (
                    <div key={i} className="requisito-item">• {requisito}</div>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="oportunidad-actions">
                <button 
                  className="btn-contactar"
                  onClick={() => handleContactar(oportunidad)}
                >
                  📞 Contactar
                </button>
              </div>
            </div>
          ))}

          {/* Mensaje cuando no hay resultados */}
          {oportunidadesFiltradas.length === 0 && (
            <div className="no-resultados" style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: '#0D47A1', marginBottom: '0.5rem' }}>
                No se encontraron oportunidades
              </h3>
              <p>
                {busqueda 
                  ? `No hay oportunidades que coincidan con "${busqueda}"` 
                  : 'No hay oportunidades disponibles en esta categoría'
                }
              </p>
              <button 
                onClick={() => {
                  setBusqueda('');
                  setFiltroActivo('todos');
                }}
                style={{
                  background: 'linear-gradient(45deg, #00E676, #00C853)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  marginTop: '1rem'
                }}
              >
                Ver todas las oportunidades
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OportunidadesFinanciamiento;