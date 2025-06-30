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
  },
  {
    usuario: 'Daniela S.',
    texto: 'Estoy buscando un tutor para reforzar estructuras de datos. Urgente.',
    hora: 'Hace 4 horas'
  },
  {
    usuario: 'Pedro N.',
    texto: 'Puedo apoyar en electrónica básica. Materiales incluidos.',
    hora: 'Hace 5 horas'
  }
];

const perfilesRecomendados = [
  'Andrea P.',
  'Bryan C.',
  'Fernanda H.',
  'Esteban J.',
  'Lucía M.',
  'Sebastián T.'
];

const Inicio = () => {
  return (
    <div className="pagina-inicio">
      <Navbar />
      <div className="inicio-container">
        <main className="feed">
          <div className="publicar">
            <textarea placeholder="¿Necesitas una tutoría? ¡Publica aquí!" />
            <button className="btn-publicar">Publicar</button>
          </div>

          <h2>📝 Publicaciones recientes</h2>
          {publicacionesEjemplo.map((publi, index) => (
            <div key={index} className="publicacion">
              <div className="publicacion-usuario">
                <img 
                  src="https://images.icon-icons.com/3868/PNG/512/profile_circle_icon_242774.png" 
                  alt="Perfil" 
                  className="icono-perfil" 
                />
                {publi.usuario}
              </div>
              <div className="publicacion-texto">{publi.texto}</div>
              <div className="publicacion-hora">{publi.hora}</div>
              <div className="publicacion-interacciones">
                <button className="btn-like">👍 Me gusta</button>
                <button className="btn-coment">💬 Comentar</button>
              </div>
            </div>
          ))}
        </main>

        <aside className="lateral-derecho fijo">
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
      </div>
    </div>
  );
};

export default Inicio;
