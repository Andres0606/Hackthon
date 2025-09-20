  import React, { useState, useEffect, useRef } from 'react';
  import '../Componentes/Catalogo.css';
  import Header from './Header.jsx';
  import Footer from './Footer.jsx';

  const Catalogo = () => {
    const [activeTab, setActiveTab] = useState('productos');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const fileInputRef = useRef(null);
    
    // Cargar productos desde localStorage al inicio
    const [productos, setProductos] = useState(() => {
      try {
        const guardados = localStorage.getItem('productos');
        return guardados ? JSON.parse(guardados) : [];
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        return [];
      }
    });

    // Estado del formulario separado en un objeto plano
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('productos');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [contacto, setContacto] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [imagenPreview, setImagenPreview] = useState(null);
    
    // Guardar productos en localStorage cuando cambien
    useEffect(() => {
      try {
        localStorage.setItem('productos', JSON.stringify(productos));
      } catch (error) {
        console.error('Error saving products to localStorage:', error);
      }
    }, [productos]);

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

    const limpiarFormulario = () => {
      setNombre('');
      setCategoria('productos');
      setDescripcion('');
      setPrecio('');
      setContacto('');
      setUbicacion('');
      setImagenPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB.');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagenPreview(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const eliminarImagen = () => {
      setImagenPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!nombre.trim()) {
        alert('Por favor ingresa el nombre del producto/servicio');
        return;
      }
      
      if (!descripcion.trim()) {
        alert('Por favor ingresa una descripción del producto/servicio');
        return;
      }

      const nuevoProducto = {
        id: Date.now(),
        nombre: nombre.trim(),
        categoria: categoria,
        descripcion: descripcion.trim(),
        precio: precio.trim(),
        contacto: contacto.trim(),
        ubicacion: ubicacion.trim(),
        imagen: imagenPreview,
        fechaCreacion: new Date().toLocaleDateString('es-CO')
      };

      setProductos(prevProductos => [...prevProductos, nuevoProducto]);
      limpiarFormulario();
      setShowForm(false);
      
      if (nuevoProducto.categoria === 'filtros') {
        setActiveTab('filtros');
      } else {
        setActiveTab('productos');
      }
      
      alert('¡Producto/Servicio agregado exitosamente! 🎉');
    };

    const eliminarProducto = (id) => {
      if (window.confirm('¿Estás seguro de eliminar este producto/servicio?')) {
        setProductos(prevProductos => prevProductos.filter(item => item.id !== id));
      }
    };

    const cerrarFormulario = () => {
      setShowForm(false);
    };

    return (
      <div className="catalogo-wrapper">
        <Header />
        
        <div className="catalogo-container">
          <div className="catalogo-header">
            <div className="catalogo-title">
              <div className="left-section">
                <h1>Catálogo</h1>
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
          </nav>

          <div className="productos-grid">
            {isLoading ? (
              Array.from({ length: 3 }, (_, index) => (
                <div key={`loading-${index}`} className="producto-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="producto-placeholder loading-shimmer">
                    <span>Cargando...</span>
                  </div>
                  <div className="producto-info">
                    <h3>Cargando producto...</h3>
                    <p>Por favor espera un momento</p>
                  </div>
                </div>
              ))
            ) : filteredItems.length > 0 ? (
              filteredItems.map((producto, index) => (
                <div key={producto.id} className="producto-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="producto-actions">
                    <button 
                      className="eliminar-btn"
                      onClick={() => eliminarProducto(producto.id)}
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
              </div>
            )}
          </div>
        </div>
        
        {showForm && (
          <div className="formulario-overlay" onClick={(e) => {
            if (e.target.classList.contains('formulario-overlay')) {
              cerrarFormulario();
            }
          }}>
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
                  <label htmlFor="nombre-input">Nombre del Producto/Servicio *</label>
                  <input
                    type="text"
                    id="nombre-input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Artesanías en madera, Servicio de catering..."
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoria-input">Categoría *</label>
                  <select
                    id="categoria-input"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="productos">Producto</option>
                    <option value="servicios">Servicio</option>
                    <option value="filtros">Producto Premium</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="descripcion-input">Descripción *</label>
                  <textarea
                    id="descripcion-input"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Describe tu producto o servicio..."
                    rows="3"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imagen-field">Imagen del Producto/Servicio</label>
                  <div className="imagen-upload-container">
                    {!imagenPreview ? (
                      <div className="imagen-upload-area">
                        <input
                          ref={fileInputRef}
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
                          src={imagenPreview} 
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
                  <label htmlFor="precio-input">Precio (opcional)</label>
                  <input
                    type="text"
                    id="precio-input"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Ej: $25.000, $50.000/hora, Desde $30.000"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contacto-input">Contacto (opcional)</label>
                  <input
                    type="text"
                    id="contacto-input"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="WhatsApp, teléfono, email..."
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ubicacion-input">Ubicación (opcional)</label>
                  <input
                    type="text"
                    id="ubicacion-input"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    placeholder="Barrio, sector de Villavicencio..."
                    autoComplete="off"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancelar" onClick={cerrarFormulario}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    );
  };

  export default Catalogo;