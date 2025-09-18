import React, { useState, useEffect } from 'react';
import '../Componentes/Perfil.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('informacion');
  const [selectedMenu, setSelectedMenu] = useState('datos-personales');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [showFotoMenu, setShowFotoMenu] = useState(false);

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

  const menuItems = {
    informacion: [
      { id: 'datos-personales', icon: '👤', label: 'Datos Personales' },
      { id: 'contacto', icon: '📞', label: 'Información de Contacto' },
      { id: 'direccion', icon: '📍', label: 'Dirección' },
      { id: 'documentos', icon: '📄', label: 'Documentos' }
    ],
    productos: [
      { id: 'mis-productos', icon: '📦', label: 'Mis Productos' },
      { id: 'agregar-producto', icon: '➕', label: 'Agregar Producto' },
      { id: 'ventas', icon: '💰', label: 'Historial de Ventas' },
      { id: 'estadisticas', icon: '📊', label: 'Estadísticas' }
    ],
    configuracion: [
      { id: 'cuenta', icon: '⚙️', label: 'Configuración de Cuenta' },
      { id: 'notificaciones', icon: '🔔', label: 'Notificaciones' },
      { id: 'privacidad', icon: '🔒', label: 'Privacidad' },
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

    return (
      <div className="main-content-area fade-in">
        <h2 style={{ color: '#0D47A1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{content.icon}</span> {content.title}
        </h2>
        <div className="content-placeholder">
          <div className="icon">{content.icon}</div>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
          <button 
            className="foto-upload-btn" 
            style={{ marginTop: '1rem' }}
          >
            Comenzar
          </button>
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
              <div className="impulso-villavo">
                💼 Impulso Villavo
              </div>
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
            className={`nav-item ${activeTab === 'productos' ? 'active' : ''}`}
            onClick={() => handleTabChange('productos')}
          >
            📦 Mis Productos y Servicios
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
                {activeTab === 'productos' && '📦 Productos'}
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
              <h3>📊 Resumen</h3>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <p><strong>Productos publicados:</strong> 0</p>
                <p><strong>Vistas este mes:</strong> 0</p>
                <p><strong>Contactos recibidos:</strong> 0</p>
                <p><strong>Miembro desde:</strong> {new Date().toLocaleDateString('es-CO')}</p>
              </div>
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