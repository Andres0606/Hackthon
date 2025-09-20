import React, { useState } from 'react';
import '../Componentes/CrearEmprendimiento.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const EmprendimientoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    telefono: '',
    email: '',
    redesSociales: '',
    camaraComercio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del emprendimiento:', formData);
    alert('✅ Emprendimiento registrado exitosamente!');
    // Aquí podrías enviar los datos a tu backend con fetch o axios
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      categoria: '',
      descripcion: '',
      telefono: '',
      email: '',
      redesSociales: '',
      camaraComercio: ''
    });
  };

  const categorias = [
    { value: '', label: 'Selecciona una categoría' },
    { value: 'gastronomia', label: 'Gastronomía' },
    { value: 'artesania', label: 'Artesanía' },
    { value: 'moda', label: 'Moda' },
    { value: 'servicios', label: 'Servicios' },
    { value: 'joyeria', label: 'Joyería' },
    { value: 'otros', label: 'Otros' }
  ];

  const estadosCamara = [
    { value: '', label: 'Selecciona el estado' },
    { value: 'tiene', label: 'Tiene Cámara de Comercio' },
    { value: 'proceso', label: 'En proceso de obtenerla' },
    { value: 'no_tiene', label: 'No tiene' }
  ];

  return (
    <>
      <Header />
      <div className="emprendimiento-container">
        <div className="main-content">
          <div className="form-section">
            <h2 className="form-title">📝 Registrar Emprendimiento</h2>
            
            {/* FORMULARIO */}
            <form className="emprendimiento-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  Nombre del Emprendimiento <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Artesanías María, Café del Meta..."
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoria" className="form-label">
                  Categoría <span className="required">*</span>
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  {categorias.map(categoria => (
                    <option key={categoria.value} value={categoria.value}>
                      {categoria.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="camaraComercio" className="form-label">
                  Estado Cámara de Comercio <span className="required">*</span>
                </label>
                <select
                  id="camaraComercio"
                  name="camaraComercio"
                  value={formData.camaraComercio}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  {estadosCamara.map(estado => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion" className="form-label">
                  Descripción del Emprendimiento <span className="required">*</span>
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe tu emprendimiento, qué ofreces, tu historia..."
                  className="form-textarea"
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="300 123 4567"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="mi-emprendimiento@email.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="redesSociales" className="form-label">
                  Redes Sociales
                </label>
                <input
                  type="text"
                  id="redesSociales"
                  name="redesSociales"
                  value={formData.redesSociales}
                  onChange={handleInputChange}
                  placeholder="Instagram, Facebook, WhatsApp Business..."
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  🚀 Registrar Emprendimiento
                </button>
              </div>
            </form>
          </div>

          {/* PREVISUALIZACIÓN */}
          <div className="preview-section">
            <div className="preview-card">
              <h3 className="preview-title">Vista Previa</h3>
              <div className="preview-content">
                <div className="preview-item">
                  <strong>Nombre:</strong> {formData.nombre || 'Sin definir'}
                </div>
                <div className="preview-item">
                  <strong>Categoría:</strong> {
                    categorias.find(c => c.value === formData.categoria)?.label || 'Sin definir'
                  }
                </div>
                <div className="preview-item">
                  <strong>Cámara de Comercio:</strong> {
                    estadosCamara.find(e => e.value === formData.camaraComercio)?.label || 'Sin definir'
                  }
                </div>
                <div className="preview-item">
                  <strong>Descripción:</strong> {formData.descripcion || 'Sin descripción'}
                </div>
                {formData.telefono && (
                  <div className="preview-item">
                    <strong>Teléfono:</strong> {formData.telefono}
                  </div>
                )}
                {formData.email && (
                  <div className="preview-item">
                    <strong>Email:</strong> {formData.email}
                  </div>
                )}
                {formData.redesSociales && (
                  <div className="preview-item">
                    <strong>Redes Sociales:</strong> {formData.redesSociales}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmprendimientoForm;
