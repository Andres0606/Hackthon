import React, { useState } from "react";
import "../Componentes/Emprendedores.css";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Emprendedores = () => {
  const [filtroSector, setFiltroSector] = useState("Categoria");
  const [filtroFormalizacion, setFiltroFormalizacion] = useState("Semaforizacion");
  const [filtroUbicacion, setFiltroUbicacion] = useState("Ubicación");

  const [favoritos, setFavoritos] = useState({});
  const [visitas, setVisitas] = useState({});

  const emprendedores = [
    {
      id: 1,
      nombre: "María González",
      negocio: "Café Llanero Orgánico",
      sector: "Gastronomía",
      formalizacion: "Formalizado",
      ubicacion: "Zona Centro",
      descripcion: "Productora de café orgánico sostenible con comercio justo.",
      imagen:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      nombre: "Carlos Ramírez",
      negocio: "Artesanías Villavicencio",
      sector: "Artesanías",
      formalizacion: "En proceso",
      ubicacion: "Zona Norte",
      descripcion: "Artesanías típicas con materiales reciclados.",
      imagen:
        "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      nombre: "Ana López",
      negocio: "Moda Llanera",
      sector: "Moda",
      formalizacion: "Por formalizar",
      ubicacion: "Zona Sur",
      descripcion: "Diseños de ropa llanera con estilo moderno.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvuut_gyKHwf_34ltPs5-PdvwzMfJdNp8uw&s", // Nueva imagen
    },
    {
        id: 4,
        nombre: "Luis Martínez",
        negocio: "Dulces Tradicionales",
        sector: "Gastronomía",
        formalizacion: "Formalizado",
        ubicacion: "Zona Centro",
        descripcion: "Elaboración de dulces típicos de la región.",
        imagen:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 5,
        nombre: "Sofía Pérez",
        negocio: "Joyería Artesanal",
        sector: "Artesanías",
        formalizacion: "En proceso",
        ubicacion: "Zona Norte",
        descripcion: "Joyería hecha a mano con materiales locales.",
        imagen:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",}
          

  ];

  const toggleFavorito = (id) => {
    setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const registrarVisita = (id) => {
    setVisitas((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const filtrados = emprendedores.filter((emp) => {
    return (
      (filtroSector === "Categoria" || emp.sector === filtroSector) &&
      (filtroFormalizacion === "Semaforizacion" || emp.formalizacion === filtroFormalizacion) &&
      (filtroUbicacion === "Ubicación" || emp.ubicacion === filtroUbicacion)
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
            key={emp.id}
            onClick={() => registrarVisita(emp.id)}
          >
            <img src={emp.imagen} alt={emp.nombre} className="card-img" />
            <div className="card-body">
              <h2>{emp.nombre}</h2>
              <h3>{emp.negocio}</h3>
              <span className={badgeColor(emp.formalizacion)}>
                {emp.formalizacion}
              </span>
              <p>{emp.descripcion}</p>
              <div className="card-actions">
                <button
                  className={`like-btn ${favoritos[emp.id] ? "liked" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(emp.id);
                  }}
                >
                  {favoritos[emp.id] ? "❤️ Me gusta" : "🤍 Me gusta"}
                </button>
                <span className="visitas">
                  👁️ {visitas[emp.id] || 0} visitas
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
