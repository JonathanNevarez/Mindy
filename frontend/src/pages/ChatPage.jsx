import { useState, useEffect } from 'react';
import socket from '../socket';
import Navbar from '../components/Navbar';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import './ChatPage.css';

const ChatPage = () => {
  const [amigos, setAmigos] = useState([]);
  const [receptor, setReceptor] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [conversacion, setConversacion] = useState([]);

  const miId = localStorage.getItem('usuarioId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!socket.connected) socket.connect();

    fetch(`${import.meta.env.VITE_API_URL}/api/usuario/amigos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAmigos(data));
  }, []);

  useEffect(() => {
    socket.on('nuevoMensaje', (data) => {
      if (receptor && data.de === receptor._id) {
        setConversacion(prev => [...prev, data]);
      } else {
        // Opcional: actualizar el badge en tiempo real
        setAmigos(prev =>
          prev.map(a =>
            a._id === data.de ? { ...a, noLeidos: (a.noLeidos || 0) + 1 } : a
          )
        );
      }
    });

    return () => socket.off('nuevoMensaje');
  }, [receptor]);

  const enviarMensaje = () => {
    if (!mensaje || !receptor) return;

    socket.emit('mensajePrivado', {
      para: receptor._id,
      mensaje
    });

    setConversacion(prev => [...prev, { de: miId, mensaje }]);
    setMensaje('');
  };

  const cargarHistorial = (amigo) => {
    // Marcar como leídos
    fetch(`${import.meta.env.VITE_API_URL}/api/mensajes/leido/${amigo._id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });

    // Cargar historial
    fetch(`${import.meta.env.VITE_API_URL}/api/mensajes/${amigo._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const mensajesFormateados = data.map(msg => ({
          de: msg.de,
          mensaje: msg.mensaje
        }));
        setConversacion(mensajesFormateados);

        // Quitar resaltado localmente
        setAmigos(prev =>
          prev.map(a =>
            a._id === amigo._id ? { ...a, noLeidos: 0 } : a
          )
        );
      });
  };

  return (
    <div>
      <Navbar />
      <div className="chat-layout">
        <aside className="amigos">
          {amigos.map((amigo) => (
            <div
              key={amigo._id}
              className={`amigo ${receptor && receptor._id === amigo._id ? 'activo' : ''} ${amigo.noLeidos > 0 ? 'no-leido' : ''}`}
              onClick={() => {
                setReceptor(amigo);
                cargarHistorial(amigo);
              }}
            >
              {amigo.foto ? (
                <img src={amigo.foto} alt="foto" className="foto-amigo" />
              ) : (
                <UserCircleIcon className="foto-amigo" />
              )}
              <span>{amigo.name}</span>
              {amigo.noLeidos > 0 && <span className="badge">{amigo.noLeidos}</span>}
            </div>
          ))}
        </aside>

        <main className="chat-area">
          {receptor ? (
            <>
              <div className="chat-encabezado">
                {receptor.foto ? (
                  <img src={receptor.foto} alt="foto" className="foto-chat" />
                ) : (
                  <UserCircleIcon className="foto-chat" />
                )}
                <span>{receptor.name}</span>
              </div>

              <div className="chat-mensajes">
                {conversacion.map((msg, i) => (
                  <div key={i} className={`mensaje ${msg.de === miId ? 'enviado' : 'recibido'}`}>
                    {msg.mensaje}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') enviarMensaje(); }}
                  placeholder="Escribe tu mensaje..."
                />
                <button onClick={enviarMensaje}>➤</button>
              </div>
            </>
          ) : (
            <div className="chat-placeholder">Selecciona un amigo para chatear</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
