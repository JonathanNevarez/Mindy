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
  }
];

const Inicio = () => {
  return (
    <div>
      <Navbar />
      <div className="inicio-container">
        <div className="bienvenida">
          <h1>Bienvenido a Mindy</h1>
          <p>Conecta con otros estudiantes, encuentra tutorías o ayuda académica en tu universidad.</p>
        </div>

        <div className="publicaciones">
          <h2>Publicaciones recientes</h2>
          {publicacionesEjemplo.map((publi, index) => (
            <div key={index} className="publicacion">
              <div className="publicacion-usuario">{publi.usuario}</div>
              <div className="publicacion-texto">{publi.texto}</div>
              <div className="publicacion-hora">{publi.hora}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
