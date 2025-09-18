import React, { useState } from "react";
import "../Componentes/Register.css";
import Header from './Header';
import Footer from './Footer';
const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    console.log("Nombre:", nombre);
    console.log("Correo:", email);
    console.log("Contraseña:", password);

    // Aquí va tu lógica de registro (backend)
  };

  return (
    <> 
    <Header></Header>
    <div className="register-container">
      <div className="register-card">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="register-form">

          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Registrarme
          </button>
        </form>

        <p className="login-text">
          ¿Ya tienes cuenta? <a href="#">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};


export default Register;

