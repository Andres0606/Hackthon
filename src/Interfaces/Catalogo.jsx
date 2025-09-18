import React, { useState, useEffect } from 'react';
import '../Componentes/Catalogo.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Catalogo = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo para los productos
  const productos = [
    { id: 1, nombre: 'Producto Artesanal 1', categoria: 'productos', descripcion: 'Producto hecho a mano con materiales locales', precio: '$25.000' },
    { id: 2, nombre: 'Producto Gourmet 2', categoria: 'productos', descripcion: 'Delicioso producto local de alta calidad', precio: '$35.000' },
    { id: 3, nombre: 'Producto Ecológico 3', categoria: 'productos', descripcion: 'Producto sostenible y amigable con el medio ambiente', precio: '$40.000' },
    { id: 4, nombre: 'Servicio de Consultoría', categoria: 'servicios', descripcion: 'Asesoría especializada para tu negocio', precio: '$50.000/hora' },
    { id: 5, nombre: 'Servicio de Diseño', categoria: 'servicios', descripcion: 'Diseño gráfico y web personalizado', precio: '$80.000' },
    { id: 6, nombre: 'Producto Premium', categoria: 'filtros', descripcion: 'Producto exclusivo de edición limitada', precio: '$120.000' },
    { id: 7, nombre: 'Artesanía Local', categoria: 'productos', descripcion: 'Hermosa artesanía hecha por artesanos locales', precio: '$45.000' },
    { id: 8, nombre: 'Servicio de Catering', categoria: 'servicios', descripcion: 'Servicio de comidas para eventos especiales', precio: '$15.000/persona' },
  ];

  // Simulación de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = productos.filter(item => {
    const matchesTab = activeTab === 'productos' ? 
      (item.categoria === 'productos' || item.categoria === 'servicios') : 
      item.categoria === activeTab;
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const ProductoCard = ({ producto, index }) => (
    <div className="producto-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="producto-placeholder">
        <span>🎨 {producto.categoria === 'servicios' ? 'Servicio' : 'Producto'}</span>
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        {producto.precio && (
          <div style={{ 
            marginTop: '1rem', 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: '#00695C' 
          }}>
            {producto.precio}
          </div>
        )}
      </div>
    </div>
  );

  const LoadingCard = ({ index }) => (
    <div className="producto-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="producto-placeholder loading-shimmer">
        <span>Cargando...</span>
      </div>
      <div className="producto-info">
        <h3>Cargando producto...</h3>
        <p>Por favor espera un momento</p>
      </div>
    </div>
  );

  return (
    <div className="catalogo-wrapper">
      <Header />
      
      <div className="catalogo-container">
        <div className="catalogo-header">
          <div className="catalogo-title">
            <div className="left-section">
              <h1>🛍️ Catálogo</h1>
              <div className="impulso-villavo">
                💼 Impulso Villavo
              </div>
            </div>
            <div className="buscador-container">
              <input
                type="text"
                className="buscador"
                placeholder="🔍 Buscar productos y servicios..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <nav className="catalogo-nav">
          <div 
            className={`nav-item ${activeTab === 'productos' ? 'active' : ''}`}
            onClick={() => handleTabChange('productos')}
          >
            📦 Productos y Servicios
          </div>
          <div 
            className={`nav-item ${activeTab === 'filtros' ? 'active' : ''}`}
            onClick={() => handleTabChange('filtros')}
          >
            🔍 Productos Premium
          </div>
          <div className="nav-item" onClick={() => window.location.reload()}>
            🔄 Actualizar
          </div>
        </nav>

        <div className="productos-grid">
          {isLoading ? (
            // Mostrar loading cards
            Array.from({ length: 6 }, (_, index) => (
              <LoadingCard key={`loading-${index}`} index={index} />
            ))
          ) : filteredItems.length > 0 ? (
            filteredItems.map((producto, index) => (
              <ProductoCard key={producto.id} producto={producto} index={index} />
            ))
          ) : (
            // Mostrar mensaje cuando no hay resultados
            <div className="no-results" style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <h3>😔 No se encontraron productos</h3>
              <p>Intenta con otros términos de búsqueda o cambia de categoría</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalogo;