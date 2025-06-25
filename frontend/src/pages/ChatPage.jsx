import { useState, useEffect } from 'react';
import socket from '../socket';
import Navbar from '../components/Navbar'; // asegúrate de que existe y esté bien importado
import { UserCircleIcon } from '@heroicons/react/24/solid';
import './ChatPage.css';

const ChatPage = () => {
  const [amigos, setAmigos] = useState([]);
  const [receptor, setReceptor] = useState(null); // objeto del amigo
  const [mensaje, setMensaje] = useState('');
  const [conversacion, setConversacion] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(${import.meta.env.VITE_API_URL}/api/usuario/amigos, {
      headers: { Authorization: Bearer ${token} }
    })
      .then(res => res.json())
      .then(data => setAmigos(data));
  }, []);

  useEffect(() => {
    socket.on('nuevoMensaje', (data) => {
      if (receptor && data.de === receptor._id) {
        setConversacion(prev => [...prev, data]);
      }
    });

    return () => {
      socket.off('nuevoMensaje');
    };
  }, [receptor]);

  const enviarMensaje = () => {
    if (!mensaje || !receptor) return;

    socket.emit('mensajePrivado', {
      para: receptor._id,
      mensaje
    });

    setConversacion(prev => [...prev, { de: 'yo', mensaje }]);
    setMensaje('');
  };

  return (
    <div>
      <Navbar />

      <div className="chat-layout">
        <aside className="amigos">
          {amigos.map((amigo) => (
            <div
              key={amigo._id}
              className={amigo ${receptor && receptor._id === amigo._id ? 'activo' : ''}}
              onClick={() => {
                setReceptor(amigo);
                setConversacion([]); // opcional: resetear
              }}
            >
              {amigo.foto ? (
                <img src={amigo.foto} alt="foto" className="foto-amigo" />
              ) : (
                <UserCircleIcon className="foto-amigo" />
              )}
              <span>{amigo.name}</span>
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
                  <div
                    key={i}
                    className={mensaje ${msg.de === 'yo' ? 'enviado' : 'recibido'}}
                  >
                    {msg.mensaje}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
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