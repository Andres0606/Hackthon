import React from "react";
import "../Componentes/Register.css";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Register = () => {
  return (
    <> 
    <Header></Header>
    <div className="register-container">
      <form className="register-form">
        <h2>Crear Cuenta</h2>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input type="text" id="name" placeholder="Tu nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" placeholder="Tu correo" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Crea una contraseña" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input type="password" id="confirm-password" placeholder="Repite tu contraseña" required />
        </div>
        <button type="submit" className="btn">Registrarme</button>
        <p className="switch-form">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Register;
