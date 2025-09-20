import React, { useState, useEffect } from 'react';
import '../Componentes/Perfil.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx'

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Datos guardados:', formData);
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <> 
    <Header />
    <div className="profile-container">
      <div className="profile-content">
        {/* Sección de Foto */}
        <div className="photo-section">
          <h3 className="photo-title">📸 Foto de Perfil</h3>
          
          <div className="photo-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-photo" />
            ) : (
              <div className="camera-icon">📷</div>
            )}
          </div>
          
          <p className="photo-text">Haz clic para subir tu foto</p>
          
          <button className="upload-btn" onClick={triggerFileInput}>
            Subir Foto
          </button>
          
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          
          <div className="file-info">JPG, PNG (máx. 2MB)</div>
        </div>

        {/* Sección de Datos */}
        <div className="form-section">
          <h3 className="form-title">👤 Datos Personales</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input 
                type="text" 
                name="nombre"
                className="form-input" 
                placeholder="Ingresa tu nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input 
                type="text" 
                name="apellido"
                className="form-input" 
                placeholder="Ingresa tu apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="Tu correo"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input 
                type="tel" 
                name="telefono"
                className="form-input" 
                placeholder="Tu número de teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <button className="save-btn" onClick={handleSave}>
            Guardar Cambios
          </button>
          <button className="save-btn" onClick={handleSave}>
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;