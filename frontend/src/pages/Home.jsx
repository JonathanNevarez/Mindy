import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="home-header">
        <div className="home-logo">Mindy</div>
        <div className="home-header-buttons">
          <Link to="/login"><button className="btn-header">Ingresar</button></Link>
          <Link to="/register"><button className="btn-header btn-registro">Registrarse</button></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-overlay"></div>
        <div className="home-hero-content">
          <h1>Aprende, conecta y crece con <span className="marca">Mindy</span></h1>
          <p>Tu plataforma de tutorías, comunidad y apoyo académico en la universidad</p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="home-benefits">
        <h2>¿Por qué usar Mindy?</h2>
        <div className="benefit-cards">
          <div className="card">📚 Tutorías personalizadas</div>
          <div className="card">🤝 Comunidad universitaria</div>
          <div className="card">💬 Apoyo 24/7</div>
        </div>
      </section>

      {/* Vista previa de la plataforma */}
      <section className="home-preview">
        <h2>Explora cómo luce por dentro</h2>
        <img src="https://i.imgur.com/EAK6i5I.png" alt="Vista previa Mindy" />
      </section>

      {/* Testimonios */}
      <section className="home-testimonials">
        <h2>Testimonios</h2>
        <div className="testimonio">
          <blockquote>"Desde que uso Mindy, mis notas han mejorado mucho."</blockquote>
          <cite>- María, Ingeniería</cite>
        </div>
        <div className="testimonio">
          <blockquote>"Conseguí ayuda en menos de una hora para mi examen de física."</blockquote>
          <cite>- Kevin, Sistemas</cite>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Mindy. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
