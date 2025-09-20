import React, { useState, useEffect } from "react";
import "../Componentes/Emprendedores.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Emprendedores = () => {
  const [filtroSector, setFiltroSector] = useState("Categoria");
  const [filtroFormalizacion, setFiltroFormalizacion] = useState("Semaforizacion");
  const [filtroUbicacion, setFiltroUbicacion] = useState("Ubicación");

  const [favoritos, setFavoritos] = useState({});
  const [visitas, setVisitas] = useState({});
  const [empresas, setEmpresas] = useState([]); // ← Empresas desde backend

  // 1. Traer empresas del backend
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/empresas");
        const data = await res.json();
        if (data.success) {
          setEmpresas(data.data);
        } else {
          console.error("Error al obtener empresas:", data.message);
        }
      } catch (error) {
        console.error("Error de conexión con backend:", error);
      }
    };

    fetchEmpresas();
  }, []);

  const toggleFavorito = (id) => {
    setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const registrarVisita = (id) => {
    setVisitas((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // 2. Aplicar filtros
  const filtrados = empresas.filter((emp) => {
    return (
      (filtroSector === "Categoria" || emp.sector === filtroSector) &&
      (filtroFormalizacion === "Semaforizacion" || emp.estado_formalizacion === filtroFormalizacion) &&
      (filtroUbicacion === "Ubicación" || emp.direccion?.includes(filtroUbicacion))
    );
  });

  const badgeColor = (estado) => {
    switch (estado) {
      case "Formalizado":
        return "badge verde";
      case "En proceso":
        return "badge amarillo";
      case "Por formalizar":
        return "badge rojo";
      default:
        return "badge";
    }
  };

  return (
    <>
      <Header />
      <div className="emprendedores-container">
        <h1>Conoce a los Emprendedores Locales</h1>

        {/* Filtros */}
        <div className="filtros">
          <select onChange={(e) => setFiltroSector(e.target.value)}>
            <option>Categoria</option>
            <option>Gastronomía</option>
            <option>Artesanías</option>
            <option>Moda</option>
            <option>Tecnología</option>
            <option>Servicios</option>
            <option>Turismo</option>
          </select>

          <select onChange={(e) => setFiltroFormalizacion(e.target.value)}>
            <option>Semaforizacion</option>
            <option>Formalizado</option>
            <option>En proceso</option>
            <option>Por formalizar</option>
          </select>

          <select onChange={(e) => setFiltroUbicacion(e.target.value)}>
            <option>Ubicación</option>
            <option>Zona Norte</option>
            <option>Zona Centro</option>
            <option>Zona Sur</option>
          </select>
        </div>

        {/* Cards */}
        <div className="cards-container">
          {filtrados.map((emp) => (
            <div
              className="card"
              key={emp.id_empresa}
              onClick={() => registrarVisita(emp.id_empresa)}
            >
              <img
                src={emp.logo_url || "https://via.placeholder.com/300x200.png?text=Sin+Logo"}
                alt={emp.nombre_empresa}
                className="card-img"
              />
              <div className="card-body">
                <h2>{emp.nombre_empresa}</h2>
                <h3>{emp.razon_social || emp.nombre_empresa}</h3>
                <span className={badgeColor(emp.estado_formalizacion)}>
                  {emp.estado_formalizacion}
                </span>
                <div className="card-actions">
                  <button
                    className={`like-btn ${favoritos[emp.id_empresa] ? "liked" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorito(emp.id_empresa);
                    }}
                  >
                    {favoritos[emp.id_empresa] ? "❤️ Me gusta" : "🤍 Me gusta"}
                  </button>
                  <span className="visitas">
                    👁️ {visitas[emp.id_empresa] || 0} visitas
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Emprendedores;
