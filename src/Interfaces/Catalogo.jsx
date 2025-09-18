import React, { useState } from 'react';
import '../Componentes/Catalogo.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Catalogo = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para los productos
  const productos = [
    { id: 1, nombre: 'Producto 1', categoria: 'productos', descripcion: 'Descripción del producto' },
    { id: 2, nombre: 'Producto 2', categoria: 'productos', descripcion: 'Descripción del producto' },
    { id: 3, nombre: 'Producto 3', categoria: 'productos', descripcion: 'Descripción del producto' },
    { id: 4, nombre: 'Servicio 1', categoria: 'servicios', descripcion: 'Descripción del servicio' },
    { id: 5, nombre: 'Servicio 2', categoria: 'servicios', descripcion: 'Descripción del servicio' },
    { id: 6, nombre: 'Producto Filtrado', categoria: 'filtros', descripcion: 'Producto especial' },
  ];

  const filteredItems = productos.filter(item => {
    const matchesTab = activeTab === 'productos' ? 
      (item.categoria === 'productos' || item.categoria === 'servicios') : 
      item.categoria === activeTab;
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const ProductoCard = ({ producto }) => (
    <div className="producto-card fade-in">
      <div className="producto-placeholder">
        <span>📦 Imagen del producto</span>
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
      </div>
    </div>
  );

  return (
    <> 
    <Header />
    <div className="catalogo-container">
      <div className="catalogo-header">
        <div className="catalogo-title">
          <div>
            <h1>🛍 Catálogo</h1>
            <div className="impulso-villavo">
              💼 Impulso Villavo
            </div>
          </div>
          <div className="buscador-container">
            <input
              type="text"
              className="buscador"
              placeholder="🔍 Buscar productos..."
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
          📦 Productos o Servicios
        </div>
        <div 
          className={`nav-item ${activeTab === 'filtros' ? 'active' : ''}`}
          onClick={() => handleTabChange('filtros')}
        >
          🔍 Filtros
        </div>
        <div className="nav-item">
          ⚙ Aplicar
        </div>
      </nav>

      <div className="productos-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))
        ) : (
          // Mostrar cards vacías si no hay productos
          Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="producto-card">
              <div className="producto-placeholder loading-shimmer">
                <span>Sin productos disponibles</span>
              </div>
              <div className="producto-info">
                <h3>Producto no disponible</h3>
                <p>Próximamente más productos</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Catalogo;