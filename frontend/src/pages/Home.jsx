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
            Tu espacio para <span>aprender, conectar y avanzar</span>
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
              Mindy es una plataforma educativa pensada para estudiantes universitarios que desean
              mejorar su aprendizaje a través de tutorías colaborativas, recursos compartidos y una
              comunidad que impulsa el éxito académico.
            </p>
            <p>
              Nuestra misión es ofrecer un espacio seguro y eficiente donde los estudiantes puedan
              encontrar apoyo, compartir conocimientos y avanzar juntos hacia sus metas.
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
        <h2>¿Por qué elegir Mindy?</h2>
        <div className="benefit-cards">
          <div className="card">📚 Tutorías personalizadas</div>
          <div className="card">🤝 Comunidad activa</div>
          <div className="card">💻 Plataforma intuitiva</div>
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
        <p>© {new Date().getFullYear()} Mindy. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
