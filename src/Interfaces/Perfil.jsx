import React, { useState, useEffect } from 'react';
import '../Componentes/Perfil.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('informacion');
  const [selectedMenu, setSelectedMenu] = useState('datos-personales');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [showFotoMenu, setShowFotoMenu] = useState(false);
  const [tieneEmprendimiento, setTieneEmprendimiento] = useState(false); // Estado para detectar si tiene emprendimiento
  const [showEmprendimientoForm, setShowEmprendimientoForm] = useState(false);

  // Cerrar menú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFotoMenu && !event.target.closest('.foto-container')) {
        setShowFotoMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFotoMenu]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMenuChange = (menu) => {
    setSelectedMenu(menu);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar tamaño del archivo (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es muy grande. Por favor selecciona una imagen menor a 2MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPerfil(e.target.result);
        setShowFotoMenu(false); // Cerrar el menú después de subir
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarFoto = () => {
    setFotoPerfil(null);
    setShowFotoMenu(false);
    // Limpiar el input file
    const fileInput = document.getElementById('foto-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const toggleFotoMenu = () => {
    setShowFotoMenu(!showFotoMenu);
  };

  // Función para crear emprendimiento
  const crearEmprendimiento = (datosEmprendimiento) => {
    setTieneEmprendimiento(true);
    setActiveTab('emprendimiento');
    setSelectedMenu('mi-emprendimiento');
    alert('¡Emprendimiento creado exitosamente! 🎉 Bienvenido a la comunidad de emprendedores de Villavicencio.');
  };

  // Componente del formulario de emprendimiento
  const FormularioEmprendimiento = () => {
    const [formData, setFormData] = useState({
      nombreEmprendimiento: '',
      categoria: '',
      descripcion: '',
      telefono: '',
      email: '',
      direccion: '',
      redesSociales: '',
      logo: null
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.nombreEmprendimiento || !formData.categoria || !formData.descripcion) {
        alert('Por favor completa los campos obligatorios');
        return;
      }
      crearEmprendimiento(formData);
    };

    return (
      <div className="formulario-emprendimiento">
        <h2 style={{ color: '#0D47A1', marginBottom: '2rem' }}>🚀 Crear Mi Emprendimiento</h2>
        <form onSubmit={handleSubmit} className="emprendimiento-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nombre del Emprendimiento *</label>
              <input
                type="text"
                name="nombreEmprendimiento"
                value={formData.nombreEmprendimiento}
                onChange={handleChange}
                placeholder="Ej: Artesanías María, Café del Meta..."
                required
              />
            </div>
            <div className="form-group">
              <label>Categoría *</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="alimentacion">🍽️ Alimentación</option>
                <option value="artesanias">🎨 Artesanías</option>
                <option value="tecnologia">💻 Tecnología</option>
                <option value="servicios">🛠️ Servicios</option>
                <option value="moda">👗 Moda</option>
                <option value="salud">⚕️ Salud y Bienestar</option>
                <option value="educacion">📚 Educación</option>
                <option value="otro">🌟 Otro</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Descripción del Emprendimiento *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe tu emprendimiento, qué ofreces, tu historia..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="300 123 4567"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mi-emprendimiento@email.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Barrio, dirección en Villavicencio"
            />
          </div>

          <div className="form-group">
            <label>Redes Sociales</label>
            <input
              type="text"
              name="redesSociales"
              value={formData.redesSociales}
              onChange={handleChange}
              placeholder="Instagram, Facebook, WhatsApp Business..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setSelectedMenu('beneficios')}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              🚀 Crear Mi Emprendimiento
            </button>
          </div>
        </form>
      </div>
    );
  };

  const menuItems = {
    informacion: [
      { id: 'datos-personales', icon: '👤', label: 'Datos Personales' },
      { id: 'contacto', icon: '📞', label: 'Información de Contacto' },
      { id: 'direccion', icon: '📍', label: 'Dirección' },
      { id: 'documentos', icon: '📄', label: 'Documentos' }
    ],
    emprendimiento: tieneEmprendimiento ? [
      { id: 'mi-emprendimiento', icon: '🏢', label: 'Mi Emprendimiento' },
      { id: 'mis-productos', icon: '📦', label: 'Mis Productos' },
      { id: 'agregar-producto', icon: '➕', label: 'Agregar Producto' },
      { id: 'ventas', icon: '💰', label: 'Historial de Ventas' },
      { id: 'estadisticas', icon: '📊', label: 'Estadísticas' },
      { id: 'clientes', icon: '👥', label: 'Mis Clientes' }
    ] : [
      { id: 'crear-emprendimiento', icon: '🚀', label: 'Crear Mi Emprendimiento' },
      { id: 'requisitos', icon: '📋', label: 'Requisitos' },
    ],
    configuracion: [
      { id: 'cuenta', icon: '⚙️', label: 'Configuración de Cuenta' },
      { id: 'notificaciones', icon: '🔔', label: 'Notificaciones' },
      { id: 'ayuda', icon: '❓', label: 'Ayuda y Soporte' }
    ]
  };

  const renderMainContent = () => {
    const contentMap = {
      'datos-personales': {
        title: 'Datos Personales',
        icon: '👤',
        description: 'Aquí puedes actualizar tu información personal como nombre, apellidos, fecha de nacimiento, etc.'
      },
      'contacto': {
        title: 'Información de Contacto',
        icon: '📞',
        description: 'Gestiona tu información de contacto: teléfono, email, WhatsApp, redes sociales.'
      },
      'direccion': {
        title: 'Dirección',
        icon: '📍',
        description: 'Actualiza tu dirección de residencia y datos de ubicación en Villavicencio.'
      },
      'documentos': {
        title: 'Documentos',
        icon: '📄',
        description: 'Sube y gestiona tus documentos: cédula, certificados, permisos comerciales.'
      },
      // Contenido para emprendedores existentes
      'mi-emprendimiento': {
        title: 'Mi Emprendimiento',
        icon: '🏢',
        description: 'Información general de tu emprendimiento, logo, descripción, historia.'
      },
      'mis-productos': {
        title: 'Mis Productos',
        icon: '📦',
        description: 'Visualiza y administra todos los productos y servicios que has publicado.'
      },
      'agregar-producto': {
        title: 'Agregar Producto',
        icon: '➕',
        description: 'Publica un nuevo producto o servicio en el catálogo de Impulso Villavo.'
      },
      'ventas': {
        title: 'Historial de Ventas',
        icon: '💰',
        description: 'Revisa tu historial de ventas, ganancias y transacciones realizadas.'
      },
      'estadisticas': {
        title: 'Estadísticas',
        icon: '📊',
        description: 'Analiza el rendimiento de tus productos: vistas, contactos, conversiones.'
      },
      'clientes': {
        title: 'Mis Clientes',
        icon: '👥',
        description: 'Gestiona la base de datos de tus clientes y su historial de compras.'
      },
      // Contenido para usuarios sin emprendimiento
      'crear-emprendimiento': {
        title: 'Crear Mi Emprendimiento',
        icon: '🚀',
        description: 'Registra tu emprendimiento en Impulso Villavo y comienza a vender tus productos.',
        isEmprendimientoForm: true
      },
      'beneficios': {
        title: 'Beneficios de Emprender',
        icon: '⭐',
        description: 'Descubre todas las ventajas de registrar tu emprendimiento en nuestra plataforma.'
      },
      'requisitos': {
        title: 'Requisitos',
        icon: '📋',
        description: 'Conoce los documentos y requisitos necesarios para registrar tu emprendimiento.'
      },
      'ayuda-emprendimiento': {
        title: 'Guía para Emprender',
        icon: '💡',
        description: 'Tips, consejos y recursos para hacer crecer tu negocio en Villavicencio.'
      },
      // Configuración
      'cuenta': {
        title: 'Configuración de Cuenta',
        icon: '⚙️',
        description: 'Modifica tu contraseña, configuraciones de seguridad y preferencias.'
      },
      'notificaciones': {
        title: 'Notificaciones',
        icon: '🔔',
        description: 'Configura qué notificaciones quieres recibir y cómo recibirlas.'
      },
      'privacidad': {
        title: 'Privacidad',
        icon: '🔒',
        description: 'Controla la privacidad de tu perfil y la visibilidad de tu información.'
      },
      'ayuda': {
        title: 'Ayuda y Soporte',
        icon: '❓',
        description: 'Encuentra respuestas a preguntas frecuentes y contacta al soporte técnico.'
      }
    };

    const content = contentMap[selectedMenu];

    // Si es el formulario de crear emprendimiento, mostrar formulario especial
    if (content.isEmprendimientoForm) {
      return <FormularioEmprendimiento />;
    }

    return (
      <div className="main-content-area fade-in">
        <h2 style={{ color: '#0D47A1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{content.icon}</span> {content.title}
        </h2>
        <div className="content-placeholder">
          <div className="icon">{content.icon}</div>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
          {selectedMenu === 'beneficios' && (
            <div className="beneficios-list" style={{ textAlign: 'left', marginTop: '1rem' }}>
              <h4>🌟 Ventajas de tener un emprendimiento:</h4>
              <ul style={{ color: '#666', lineHeight: '1.6' }}>
                <li>📈 Vende tus productos online</li>
                <li>🎯 Llega a más clientes en Villavicencio</li>
                <li>📊 Estadísticas de tu negocio</li>
                <li>💬 Comunicación directa con clientes</li>
                <li>🏆 Sello de "Emprendimiento Verificado"</li>
                <li>📱 Presencia digital profesional</li>
              </ul>
            </div>
          )}
          {selectedMenu === 'requisitos' && (
            <div className="requisitos-list" style={{ textAlign: 'left', marginTop: '1rem' }}>
              <h4>📋 Documentos necesarios:</h4>
              <ul style={{ color: '#666', lineHeight: '1.6' }}>
                <li>📄 Cédula de ciudadanía</li>
                <li>🏢 RUT (si aplica)</li>
                <li>📜 Cámara de comercio (opcional)</li>
                <li>📸 Logo o imagen del emprendimiento</li>
                <li>📝 Descripción del negocio</li>
                <li>📞 Información de contacto</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="perfil-wrapper">
      <Header />
      
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="perfil-title">
            <div className="left-section">
              <h1>👤 Perfil</h1>
            </div>
          </div>
        </div>

        <nav className="perfil-nav">
          <div 
            className={`nav-item ${activeTab === 'informacion' ? 'active' : ''}`}
            onClick={() => handleTabChange('informacion')}
          >
            📋 Información Personal
          </div>
          <div 
            className={`nav-item ${activeTab === 'emprendimiento' ? 'active' : ''}`}
            onClick={() => handleTabChange('emprendimiento')}
          >
            {tieneEmprendimiento ? '🏢 Mi Emprendimiento' : '🚀 Crear Emprendimiento'}
          </div>
          <div 
            className={`nav-item ${activeTab === 'configuracion' ? 'active' : ''}`}
            onClick={() => handleTabChange('configuracion')}
          >
            ⚙️ Configuración
          </div>
        </nav>

        <div className="perfil-content">
          <aside className="perfil-sidebar">
            {/* Sección de foto */}
            <div className="sidebar-section foto-section">
              <h3>📸 Foto de Perfil</h3>
              <div className="foto-container">
                {!fotoPerfil ? (
                  // Estado sin foto
                  <>
                    <div 
                      className="foto-placeholder"
                      onClick={() => document.getElementById('foto-upload').click()}
                    >
                      <div className="foto-icon">📷</div>
                      <div className="foto-text">Haz clic para subir tu foto</div>
                    </div>
                    <button 
                      className="foto-upload-btn"
                      onClick={() => document.getElementById('foto-upload').click()}
                    >
                      Subir Foto
                    </button>
                    <div className="foto-info">JPG, PNG (máx. 2MB)</div>
                  </>
                ) : (
                  // Estado con foto
                  <div 
                    className="foto-placeholder"
                    onClick={toggleFotoMenu}
                  >
                    <img 
                      src={fotoPerfil} 
                      alt="Foto de perfil" 
                      className="foto-perfil-img"
                    />
                    <div className="foto-overlay">
                      ✏️
                    </div>
                  </div>
                )}
                
                {/* Menú contextual para cambiar/eliminar foto */}
                {showFotoMenu && fotoPerfil && (
                  <div className="foto-menu">
                    <button 
                      className="menu-item"
                      onClick={() => document.getElementById('foto-upload').click()}
                    >
                      📷 Cambiar foto
                    </button>
                    <button 
                      className="menu-item eliminar"
                      onClick={eliminarFoto}
                    >
                      🗑️ Eliminar foto
                    </button>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                id="foto-upload"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Menú lateral */}
            <div className="sidebar-section">
              <h3>
                {activeTab === 'informacion' && '📋 Información'}
                {activeTab === 'emprendimiento' && (tieneEmprendimiento ? '🏢 Emprendimiento' : '🚀 Crear Negocio')}
                {activeTab === 'configuracion' && '⚙️ Configuración'}
              </h3>
              <ul className="sidebar-menu">
                {menuItems[activeTab]?.map((item) => (
                  <li
                    key={item.id}
                    className={selectedMenu === item.id ? 'active' : ''}
                    onClick={() => handleMenuChange(item.id)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Información rápida */}
            <div className="sidebar-section">
              {tieneEmprendimiento ? (
                // Panel para emprendedores
                <>
                  <h3>📊 Mi Negocio</h3>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <p><strong>Productos publicados:</strong> 5</p>
                    <p><strong>Vistas este mes:</strong> 127</p>
                    <p><strong>Contactos recibidos:</strong> 23</p>
                    <p><strong>Ventas este mes:</strong> $450.000</p>
                    <div style={{ 
                      background: 'linear-gradient(45deg, #00E676, #00C853)', 
                      color: 'white', 
                      padding: '0.5rem', 
                      borderRadius: '8px', 
                      marginTop: '1rem',
                      textAlign: 'center',
                      fontSize: '0.8rem'
                    }}>
                      🏆 Emprendimiento Verificado
                    </div>
                  </div>
                </>
              ) : (
                // Panel para usuarios comunes
                <>
                  <h3>🌟 ¡Emprende con Nosotros!</h3>
                  <div style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                    <div style={{ 
                      background: 'linear-gradient(45deg, #e3f2fd, #f1f8e9)', 
                      padding: '1rem', 
                      borderRadius: '10px', 
                      marginBottom: '1rem' 
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#0D47A1' }}>
                        ¿Tienes un negocio?
                      </p>
                      <p style={{ margin: 0, fontSize: '0.8rem' }}>
                        Únete a más de 200 emprendedores en Villavicencio
                      </p>
                    </div>
                    <button 
                      className="foto-upload-btn"
                      onClick={() => {
                        setActiveTab('emprendimiento');
                        setSelectedMenu('crear-emprendimiento');
                      }}
                      style={{ width: '100%', fontSize: '0.8rem' }}
                    >
                      🚀 Crear Emprendimiento
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>

          <main className="perfil-main">
            {renderMainContent()}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Perfil;