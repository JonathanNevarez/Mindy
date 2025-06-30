import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="home-header">
        <div className="home-logo">Mindy</div>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-overlay"></div>
        <div className="home-hero-content">
          <h1>
            Tu espacio para <span>aprender, conectar y avanzar</span> en la ESPOCH
          </h1>
          <div className="home-cta-buttons">
            <Link to="/login">
              <button className="btn-primary">Ingresar</button>
            </Link>
            <Link to="/register">
              <button className="btn-outline">Registrarse</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ¿Qué es Mindy? */}
      <section className="home-about" id="about">
        <div className="about-content">
          <div className="about-text">
            <h2>¿Qué es Mindy?</h2>
            <p>
              Mindy es una plataforma exclusiva para estudiantes de la ESPOCH que desean mejorar su aprendizaje a través de tutorías entre compañeros, recursos colaborativos y eventos académicos.
            </p>
            <p>
              Aquí puedes pedir ayuda, ofrecer tus conocimientos, conocer estudiantes afines y potenciar tu experiencia universitaria en un entorno amigable y organizado.
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Estudiante"
            className="about-img"
          />
        </div>
      </section>

      {/* Beneficios */}
      <section className="home-benefits">
        <h2>Beneficios de usar Mindy</h2>
        <div className="benefit-cards">
          <div className="card">
            <h3>📚 Tutorías personalizadas</h3>
            <p>Recibe ayuda directa de otros estudiantes que ya dominaron las materias. Horarios flexibles, virtual o presencial.</p>
          </div>
          <div className="card">
            <h3>🤝 Comunidad activa</h3>
            <p>Conéctate con compañeros de la ESPOCH que están dispuestos a colaborar, compartir recursos y motivarse mutuamente.</p>
          </div>
          <div className="card">
            <h3>📅 Eventos académicos</h3>
            <p>Accede a sesiones grupales, talleres, y charlas organizadas por estudiantes para estudiantes, 100% ESPOCH.</p>
          </div>
        </div>
      </section>

      {/* Contacto final */}
      <section className="home-contact">
        <h2>¿Tienes preguntas?</h2>
        <p>
          Escríbenos a <a href="mailto:soporte@mindy.com">soporte@mindy.com</a>
        </p>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Mindy - ESPOCH. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
