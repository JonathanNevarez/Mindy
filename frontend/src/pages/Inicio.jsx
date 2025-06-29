import Navbar from '../components/Navbar';
import './Inicio.css';

const Inicio = () => {
  return (
    <div>
      <Navbar />
      <div className="inicio-container">
        <div className="feed">
          <div className="publicar">
            <textarea placeholder="¿Necesitas una tutoría? ¡Publica aquí!" />
            <button>Publicar</button>
          </div>
          <div className="publicacion">
            <h4>Jonathan</h4>
            <p>Necesito ayuda con física 2. ¿Alguien disponible esta semana?</p>
          </div>
          <div className="publicacion">
            <h4>Sofía</h4>
            <p>Busco tutores de cálculo para repaso antes del examen.</p>
          </div>
        </div>

        <div className="eventos">
          <h3>Próximos Eventos</h3>
          <ul>
            <li><strong>29 junio:</strong> Sesión grupal de Matemáticas</li>
            <li><strong>30 junio:</strong> Taller de técnicas de estudio</li>
            <li><strong>1 julio:</strong> Tutoría abierta de Programación</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inicio;