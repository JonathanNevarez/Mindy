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
          <h1>Tu espacio para <span>aprender, conectar y avanzar</span></h1>
          <div className="home-cta-buttons">
            <Link to="/login"><button className="btn-primary">Empezar ahora</button></Link>
            <a href="#about"><button className="btn-outline">Saber más</button></a>
          </div>
        </div>
      </section>

      {/* ¿Qué es Mindy? */}
      <section className="home-about" id="about">
        <div className="about-text">
          <h2>¿Qué es Mindy?</h2>
          <p>Mindy es una plataforma para estudiantes universitarios que conecta con tutores, recursos y una comunidad de apoyo para potenciar tu rendimiento académico.</p>
        </div>
        <div className="about-icon">📘</div>
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

      {/* Testimonios */}
      <section className="home-testimonials">
        <h2>Lo que dicen los estudiantes</h2>
        <blockquote>"Desde que uso Mindy, mis notas mejoraron un montón. Es como tener un aliado en la uni."</blockquote>
        <cite>- María, Ingeniería</cite>
      </section>

      {/* Llamado final */}
      <section className="home-contact">
        <h2>¿Listo para llevar tu estudio al siguiente nivel?</h2>
        <Link to="/register"><button className="btn-primary">Crear cuenta</button></Link>
        <p>¿Dudas? Escríbenos a <a href="mailto:soporte@mindy.com">soporte@mindy.com</a></p>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Mindy. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
