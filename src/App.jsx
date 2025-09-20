import React from 'react';
import EmprendedoresVillavicencio from './Interfaces/Perfil.jsx';

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