import React, { useState, useEffect } from 'react';
import '../Componentes/Catalogo.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Catalogo = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'productos',
    descripcion: '',
    precio: '',
    contacto: '',
    ubicacion: '',
    imagen: null,
    imagenPreview: null
  });

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

  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleImageChange = React.useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB.');
        return;
      }
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imagen: file,
          imagenPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const eliminarImagen = React.useCallback(() => {
    setFormData(prev => ({
      ...prev,
      imagen: null,
      imagenPreview: null
    }));
    // Limpiar el input file
    const fileInput = document.getElementById('imagen-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  }, []);

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validaciones
    if (!formData.nombre.trim()) {
      alert('Por favor ingresa el nombre del producto/servicio');
      return;
    }
    
    if (!formData.descripcion.trim()) {
      alert('Por favor ingresa una descripción del producto/servicio');
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre: formData.nombre.trim(),
      categoria: formData.categoria,
      descripcion: formData.descripcion.trim(),
      precio: formData.precio.trim(),
      contacto: formData.contacto.trim(),
      ubicacion: formData.ubicacion.trim(),
      imagen: formData.imagenPreview, // Guardamos el preview como imagen
      fechaCreacion: new Date().toLocaleDateString('es-CO')
    };

    setProductos(prev => [...prev, nuevoProducto]);
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      categoria: 'productos',
      descripcion: '',
      precio: '',
      contacto: '',
      ubicacion: '',
      imagen: null,
      imagenPreview: null
    });
    
    // Limpiar el input file
    const fileInput = document.getElementById('imagen-upload');
    if (fileInput) {
      fileInput.value = '';
    }
    
    // Cerrar formulario y mostrar mensaje
    setShowForm(false);
    
    // Cambiar a la pestaña correcta para ver el producto
    if (nuevoProducto.categoria === 'filtros') {
      setActiveTab('filtros');
    } else {
      setActiveTab('productos');
    }
    
    alert('¡Producto/Servicio agregado exitosamente! 🎉');
  }, [formData]);

  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto/servicio?')) {
      setProductos(prev => prev.filter(item => item.id !== id));
    }
  };

  const ProductoCard = ({ producto, index, onEliminar }) => (
    <div className="producto-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="producto-actions">
        <button 
          className="eliminar-btn"
          onClick={() => onEliminar(producto.id)}
          title="Eliminar producto"
        >
          🗑️
        </button>
      </div>
      <div className="producto-placeholder">
        {producto.imagen ? (
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            className="producto-imagen"
          />
        ) : (
          <span>🎨 {producto.categoria === 'servicios' ? 'Servicio' : 'Producto'}</span>
        )}
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        {producto.precio && (
          <div className="producto-precio">
            💰 {producto.precio}
          </div>
        )}
        {producto.contacto && (
          <div className="producto-contacto">
            📞 {producto.contacto}
          </div>
        )}
        {producto.ubicacion && (
          <div className="producto-ubicacion">
            📍 {producto.ubicacion}
          </div>
        )}
        <div className="producto-fecha">
          📅 Agregado: {producto.fechaCreacion}
        </div>
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

  const cerrarFormulario = React.useCallback(() => {
    setShowForm(false);
  }, []);

  const FormularioProducto = React.memo(() => (
    <div className="formulario-overlay" onClick={(e) => e.target.classList.contains('formulario-overlay') && cerrarFormulario()}>
      <div className="formulario-container">
        <div className="formulario-header">
          <h2>🆕 Agregar Nuevo Producto/Servicio</h2>
          <button 
            type="button" 
            className="cerrar-btn" 
            onClick={cerrarFormulario}
          >
            ✖️
          </button>
        </div>
        <form onSubmit={handleSubmit} className="formulario-producto">
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Producto/Servicio *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Artesanías en madera, Servicio de catering..."
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
            >
              <option value="productos">Producto</option>
              <option value="servicios">Servicio</option>
              <option value="filtros">Producto Premium</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe tu producto o servicio..."
              rows="3"
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagen-field">Imagen del Producto/Servicio</label>
            <div className="imagen-upload-container">
              {!formData.imagenPreview ? (
                <div className="imagen-upload-area">
                  <input
                    type="file"
                    id="imagen-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="imagen-upload" className="upload-label">
                    <div className="upload-content">
                      <div className="upload-icon">📸</div>
                      <p>Haz clic para subir una imagen</p>
                      <small>JPG, PNG o GIF (máx. 5MB)</small>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="imagen-preview-container">
                  <img 
                    src={formData.imagenPreview} 
                    alt="Preview" 
                    className="imagen-preview"
                  />
                  <button 
                    type="button" 
                    className="eliminar-imagen-btn"
                    onClick={eliminarImagen}
                    title="Eliminar imagen"
                  >
                    ✖️
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio (opcional)</label>
            <input
              type="text"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              placeholder="Ej: $25.000, $50.000/hora, Desde $30.000"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contacto">Contacto (opcional)</label>
            <input
              type="text"
              id="contacto"
              name="contacto"
              value={formData.contacto}
              onChange={handleInputChange}
              placeholder="WhatsApp, teléfono, email..."
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación (opcional)</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              placeholder="Barrio, sector de Villavicencio..."
              autoComplete="off"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={cerrarFormulario}>
              Cancelar
            </button>
            <button type="submit" className="btn-agregar">
              ✅ Agregar Producto/Servicio
            </button>
          </div>
        </form>
      </div>
    </div>
  ));

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
            📦 Productos y Servicios ({productos.filter(p => p.categoria === 'productos' || p.categoria === 'servicios').length})
          </div>
          <div 
            className={`nav-item ${activeTab === 'filtros' ? 'active' : ''}`}
            onClick={() => handleTabChange('filtros')}
          >
            🔍 Productos Premium ({productos.filter(p => p.categoria === 'filtros').length})
          </div>
          <div className="nav-item add-product" onClick={() => setShowForm(true)}>
            ➕ Agregar Producto/Servicio
          </div>
        </nav>

        <div className="productos-grid">
          {isLoading ? (
            Array.from({ length: 3 }, (_, index) => (
              <LoadingCard key={`loading-${index}`} index={index} />
            ))
          ) : filteredItems.length > 0 ? (
            filteredItems.map((producto, index) => (
              <ProductoCard 
                key={producto.id} 
                producto={producto} 
                index={index}
                onEliminar={eliminarProducto}
              />
            ))
          ) : (
            <div className="no-results" style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
              <h3>¡Aún no hay productos!</h3>
              <p>Sé el primero en agregar un producto o servicio</p>
              <button 
                className="btn-agregar-principal"
                onClick={() => setShowForm(true)}
              >
                ➕ Agregar mi primer producto
              </button>
            </div>
          )}
        </div>
      </div>
      
      {showForm && <FormularioProducto />}
      <Footer />
    </div>
  );
};

export default Catalogo;