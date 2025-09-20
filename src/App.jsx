import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './Utilis/ScrollToTop.js';
import EmprendedoresVillavicencio from './Interfaces/Inicio.jsx';
import CrearEmprendimiento from './Interfaces/CrearEmprendimiento.jsx'; // Importar el componente
import Catalogo from './Interfaces/Catalogo.jsx';
import Eventos from './Interfaces/Eventos.jsx';
import Financiamiento from './Interfaces/Financiamiento.jsx';
import Emprendedores from './Interfaces/Emprendedores.jsx';
import Login from './Interfaces/Login.jsx';
import Register from './Interfaces/Register.jsx';
import Perfil from './Interfaces/Perfil.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<EmprendedoresVillavicencio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/emprendedores" element={<Emprendedores />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/financiamiento" element={<Financiamiento />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crear-emprendimiento" element={<CrearEmprendimiento />} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;