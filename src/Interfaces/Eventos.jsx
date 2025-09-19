import React from "react";
import "../Componentes/Eventos.css";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Eventos = () => {
  const eventos = [
    {
      id: 1,
      titulo: "Feria de Emprendimiento Villavicencio",
      fecha: "15 Octubre 2025",
      lugar: "Plaza Los Libertadores",
      descripcion:
        "Un espacio para que los emprendedores locales exhiban sus productos y servicios a la comunidad.",
      imagen:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      titulo: "Convocatoria Fondo de Innovación",
      fecha: "30 Octubre 2025",
      lugar: "Alcaldía de Villavicencio",
      descripcion:
        "Apoyo económico y asesoría para proyectos innovadores en tecnología, gastronomía y artesanías.",
      imagen:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      titulo: "Capacitación en Marketing Digital",
      fecha: "5 Noviembre 2025",
      lugar: "Universidad de los Llanos",
      descripcion:
        "Taller gratuito para emprendedores que deseen potenciar sus ventas en redes sociales y e-commerce.",
      imagen:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <>
    <Header />
    <div className="eventos-container">
      <h1>Próximos Eventos y Convocatorias</h1>
      <p className="intro-text">
        No te pierdas las oportunidades que tenemos para fortalecer tu
        emprendimiento.
      </p>

      <div className="eventos-grid">
        {eventos.map((evento) => (
          <div key={evento.id} className="evento-card">
            <img src={evento.imagen} alt={evento.titulo} className="evento-img" />
            <div className="evento-body">
              <h2>{evento.titulo}</h2>
              <p className="evento-fecha">📅 {evento.fecha}</p>
              <p className="evento-lugar">📍 {evento.lugar}</p>
              <p className="evento-descripcion">{evento.descripcion}</p>
              <button className="btn">Link de inscripción</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
     </>
  );
};

export default Eventos;
