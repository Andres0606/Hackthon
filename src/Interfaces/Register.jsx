import React, { useState } from "react";
import "../Componentes/Register.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    telefono_usuario: "",
    // 👇 ya no pedimos rol, se envía siempre "ciudadano"
    rol: "ciudadano",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Usuario registrado con éxito");
        console.log("Usuario:", data);
      } else {
        alert(`⚠️ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("❌ No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>

          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Tu apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              placeholder="Crea una contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono_usuario">Teléfono</label>
            <input
              type="text"
              id="telefono_usuario"
              name="telefono_usuario"
              placeholder="Tu número de teléfono"
              value={formData.telefono_usuario}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn">Registrarme</button>
          <p className="switch-form">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
