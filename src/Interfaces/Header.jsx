import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Componentes/Header.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Contador de no leídas

  // Función para navegar a diferentes páginas
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para alternar el panel de notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Función para cerrar notificaciones
  const closeNotifications = () => {
    setShowNotifications(false);
  };

  // Función para marcar como leídas manualmente
  const markAsRead = () => {
    setUnreadCount(0);
  };

  // Datos de ejemplo para notificaciones
  const notifications = [
    { id: 1, message: "Nuevo evento disponible", time: "hace 2 horas" },
    { id: 2, message: "Tu financiamiento fue aprobado", time: "hace 1 día" },
    { id: 3, message: "Recordatorio: reunión mañana", time: "hace 2 días" }
  ];

  // ✅ Validar sesión al dar click en el icono de usuario
  const handleUserClick = () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      navigate("/perfil"); // Si ya está logueado 👉 va a Perfil
    } else {
      navigate("/login"); // Si no está logueado 👉 va a Login
    }
  };

  return (
    <header className="header">
      <nav className="nav-container">

        {/* Logo Izquierda */}
        <div className="logo" onClick={() => handleNavigation("/inicio")}>
          Impulsa Villavo
        </div>

        {/* Centro: Menú + Buscador */}
        <div className="nav-center">
          <ul className="nav-menu">
            <li>
              <a onClick={() => handleNavigation("/inicio")}>Inicio</a>
            </li>
            <li>
              <a onClick={() => handleNavigation("/catalogo")}>Catálogo</a>
            </li>
          </ul>
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar..."
          />
        </div>

        {/* Derecha: Notificaciones + Usuario */}
        <div className="nav-right">
          <div className="notification-container">
            <FaBell 
              className="icon bell" 
              onClick={toggleNotifications}
            />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
            
            {showNotifications && (
              <div className="notifications-panel">
                <div className="notifications-header">
                  <h4>Notificaciones</h4>
                  <button 
                    className="close-btn"
                    onClick={closeNotifications}
                  >
                    ×
                  </button>
                </div>
                <div className="notifications-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-notifications">No hay notificaciones</p>
                  )}
                </div>
                
                {unreadCount > 0 && (
                  <div className="notifications-footer">
                    <button 
                      className="mark-read-btn"
                      onClick={markAsRead}
                    >
                      Marcar todas como leídas
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* 👤 Icono usuario con validación de sesión */}
          <FaUserCircle 
            className="icon user" 
            onClick={handleUserClick}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
