import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "../Componentes/Login.css";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Bienvenido " + data.user.nombre);
        console.log("Usuario logueado:", data);

        //  Guardamos el id en sessionStorage
        sessionStorage.setItem("userId", data.user.id_usuario);

        navigate("/inicio"); 
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
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Ingresa tu correo" 
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
              placeholder="Ingresa tu contraseña" 
              value={formData.contrasena}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn">Ingresar</button>
          <p className="switch-form">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
