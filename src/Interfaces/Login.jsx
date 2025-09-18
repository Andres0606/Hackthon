import React from "react";
import "../Componentes/Login.css";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Login = () => {
  return (
    <> 
    <Header></Header>
    <div className="login-container">
      <form className="login-form">
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" placeholder="Ingresa tu correo" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Ingresa tu contraseña" required />
        </div>
        <button type="submit" className="btn">Ingresar</button>
        <p className="switch-form">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </form>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Login;
