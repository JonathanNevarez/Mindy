import React from 'react';
import './EticaModal.css';

const EticaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-etica-backdrop">
      <div className="modal-etica">
        <button className="modal-etica-cerrar" onClick={onClose}>✖</button>
        <h2>🧭 Código de Ética – Plataforma Mindy</h2>
        <p>
          En Mindy, creemos que el aprendizaje colaborativo solo puede florecer en un entorno de respeto, honestidad y responsabilidad.
          Al registrarte y utilizar esta plataforma como estudiante de la Escuela Superior Politécnica de Chimborazo (ESPOCH),
          te comprometes a actuar según los siguientes principios éticos:
        </p>

        <h4>🎓 1. Respeto y convivencia</h4>
        <ul>
          <li>Tratarás con cortesía a todos los usuarios, sin importar su nivel de conocimientos, carrera o situación académica.</li>
          <li>Te abstendrás de utilizar lenguaje ofensivo, discriminatorio, violento o acosador en cualquier publicación, mensaje o interacción.</li>
        </ul>

        <h4>📘 2. Uso responsable de los recursos</h4>
        <ul>
          <li>Utilizarás Mindy exclusivamente con fines educativos, solicitando o brindando apoyo académico.</li>
          <li>No promoverás contenido publicitario, spam, ni actividades ajenas al propósito académico de la plataforma.</li>
        </ul>

        <h4>🧠 3. Integridad académica</h4>
        <ul>
          <li>No utilizarás Mindy para promover el plagio, suplantación de identidad ni otras formas de deshonestidad académica.</li>
          <li>Serás transparente al solicitar o brindar tutorías, sin promesas falsas ni alterar información personal.</li>
        </ul>

        <h4>🧑‍🏫 4. Colaboración y crecimiento mutuo</h4>
        <ul>
          <li>Fomentarás una cultura de ayuda entre compañeros, compartiendo conocimientos con responsabilidad y empatía.</li>
          <li>Reconocerás el esfuerzo de otros usuarios y valorarás sus aportes de forma constructiva.</li>
        </ul>

        <h4>🔐 5. Privacidad y seguridad</h4>
        <ul>
          <li>No divulgarás datos personales tuyos ni de otros sin consentimiento.</li>
          <li>Reportarás cualquier comportamiento sospechoso o incumplimiento de estas normas al equipo de Mindy.</li>
        </ul>

        <h4>📌 Consecuencias del incumplimiento</h4>
        <p>
          Mindy se reserva el derecho de suspender o eliminar cuentas que violen este código de ética, con el fin de proteger a la comunidad académica
          y mantener un entorno sano para todos los estudiantes.
        </p>
      </div>
    </div>
  );
};

export default EticaModal;
