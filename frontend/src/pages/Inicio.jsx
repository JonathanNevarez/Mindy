import Navbar from '../components/Navbar';
import './Inicio.css';

const publicacionesEjemplo = [
  {
    usuario: 'Jonathan R.',
    texto: 'Necesito ayuda con Cálculo Integral, ¿alguien disponible esta semana?',
    hora: 'Hace 5 min'
  },
  {
    usuario: 'Ana M.',
    texto: 'Ofrezco tutorías de Estadística I, experiencia previa y material incluido.',
    hora: 'Hace 15 min'
  },
  {
    usuario: 'Carlos V.',
    texto: '¿Alguien tiene apuntes de Álgebra Lineal del profe Zambrano?',
    hora: 'Hace 30 min'
  },
  {
    usuario: 'Luis F.',
    texto: 'Disponible para tutorías de programación en C++, virtual o presencial.',
    hora: 'Hace 1 hora'
  },
  {
    usuario: 'Valeria G.',
    texto: '¿Quién puede ayudarme a entender cinemática en Física 1?',
    hora: 'Hace 2 horas'
  },
  {
    usuario: 'Mateo T.',
    texto: 'Doy tutorías de cálculo los fines de semana, interesados escribirme.',
    hora: 'Hace 3 horas'
  }
];

const perfilesRecomendados = [
  'Andrea P.',
  'Bryan C.',
  'Fernanda H.',
  'Esteban J.'
];

const Inicio = () => {
  return (
    <div>
      <Navbar />
      <div className="inicio-container">
        <aside className="lateral-izquierdo">
          <div className="eventos">
            <h3>📅 Próximos Eventos</h3>
            <ul>
              <li><strong>29 junio:</strong> Sesión grupal de Matemáticas</li>
              <li><strong>30 junio:</strong> Taller de técnicas de estudio</li>
              <li><strong>1 julio:</strong> Tutoría abierta de Programación</li>
            </ul>
          </div>
          <div className="perfiles-recomendados">
            <h3>👥 Perfiles recomendados</h3>
            <ul>
              {perfilesRecomendados.map((perfil, idx) => (
                <li key={idx}>{perfil}</li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="feed">
          <div className="publicar">
            <textarea placeholder="¿Necesitas una tutoría? ¡Publica aquí!" />
            <button>Publicar</button>
          </div>

          <h2>📝 Publicaciones recientes</h2>
          {publicacionesEjemplo.map((publi, index) => (
            <div key={index} className="publicacion">
              <div className="publicacion-usuario">{publi.usuario}</div>
              <div className="publicacion-texto">{publi.texto}</div>
              <div className="publicacion-hora">{publi.hora}</div>
              <div className="publicacion-interacciones">
                <button>❤️ Me gusta</button>
                <button>💬 Comentar</button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Inicio;
