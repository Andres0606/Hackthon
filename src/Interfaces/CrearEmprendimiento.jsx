import React, { useState } from 'react';
import '../Componentes/CrearEmprendimiento.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const CrearEmprendimiento = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    nit: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    email: '',
    categoria: '',
    sector: '',
    camaraComercio: '',
    descripcion: '',
    redesSociales: '',
    logo_url: ''
  });

  const categorias = [
    { value: '', label: 'Selecciona una categoría' },
    { value: 'Fisica', label: 'Física' },
    { value: 'Digital', label: 'Digital' },
    { value: 'Mixta', label: 'Mixta' }
  ];

  const estadosCamara = [
    { value: '', label: 'Selecciona el estado' },
    { value: 'Formalizado', label: 'Formalizado' },
    { value: 'En Proceso', label: 'En proceso de obtenerla' },
    { value: 'Por Formalizar', label: 'No tiene (Por Formalizar)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      nit: '',
      razon_social: '',
      direccion: '',
      telefono: '',
      email: '',
      categoria: '',
      sector: '',
      camaraComercio: '',
      descripcion: '',
      redesSociales: '',
      logo_url: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` // si usas JWT
        },
        body: JSON.stringify({
          tipoEmpresa: formData.categoria,
          nombre_empresa: formData.nombre,
          nit: formData.nit || null,
          razon_social: formData.razon_social || formData.nombre,
          direccion: formData.direccion || null,
          telefonoEmpresa: formData.telefono,
          email_contacto: formData.email,
          sector: formData.sector || formData.categoria,
          estado_formalizacion: formData.camaraComercio || 'Por Formalizar',
          logo_url: formData.logo_url || null,
          descripcion: formData.descripcion,

          // 👇 Enviar el id del usuario logueado
          id_usuario: sessionStorage.getItem("userId")
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Emprendimiento registrado en la base de datos!");
        console.log("Empresa guardada:", data);
        handleCancel();
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al registrar empresa:", error);
      alert("⚠️ Error de conexión con el servidor");
    }
  };

  return (
    <>
      <Header />
      <div className="emprendimiento-container">
        <div className="main-content">
          <div className="form-section">
            <h2 className="form-title">📝 Registrar Emprendimiento</h2>

            <form className="emprendimiento-form" onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="form-group">
                <label>Nombre del Emprendimiento *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              </div>

              {/* NIT */}
              <div className="form-group">
                <label>NIT</label>
                <input type="text" name="nit" value={formData.nit} onChange={handleInputChange} />
              </div>

              {/* Razón Social */}
              <div className="form-group">
                <label>Razón Social</label>
                <input type="text" name="razon_social" value={formData.razon_social} onChange={handleInputChange} />
              </div>

              {/* Dirección */}
              <div className="form-group">
                <label>Dirección</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} />
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>

              {/* Categoría */}
              <div className="form-group">
                <label>Categoría *</label>
                <select name="categoria" value={formData.categoria} onChange={handleInputChange} required>
                  {categorias.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Sector */}
              <div className="form-group">
                <label>Sector</label>
                <input type="text" name="sector" value={formData.sector} onChange={handleInputChange} placeholder="Ej: Turismo, Tecnología..." />
              </div>

              {/* Estado Cámara */}
              <div className="form-group">
                <label>Estado Cámara de Comercio *</label>
                <select name="camaraComercio" value={formData.camaraComercio} onChange={handleInputChange} required>
                  {estadosCamara.map((estado) => (
                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                  ))}
                </select>
              </div>

              {/* Descripción */}
              <div className="form-group">
                <label>Descripción *</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} rows="4" required />
              </div>

              {/* Redes Sociales */}
              <div className="form-group">
                <label>Redes Sociales</label>
                <input type="text" name="redesSociales" value={formData.redesSociales} onChange={handleInputChange} />
              </div>

              {/* Logo */}
              <div className="form-group">
                <label>Logo (URL)</label>
                <input type="text" name="logo_url" value={formData.logo_url} onChange={handleInputChange} />
              </div>

              {/* Botones */}
              <div className="form-actions">
                <button type="submit" className="btn-primary">🚀 Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CrearEmprendimiento;
