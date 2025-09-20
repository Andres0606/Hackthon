import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './Utilis/ScrollToTop.js';
import EmprendedoresVillavicencio from './Interfaces/Inicio.jsx';
import Catalogo from './Interfaces/Catalogo.jsx';
import Eventos from './Interfaces/Eventos.jsx';
import Financiamiento from './Interfaces/Financiamiento.jsx';
import Login from './Interfaces/Login.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<EmprendedoresVillavicencio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/financiamiento" element={<Financiamiento />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;