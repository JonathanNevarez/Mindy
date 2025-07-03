import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { BellIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);

  const menuRef = useRef(null);
  const notiRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotificaciones = () => setNotificacionesAbiertas(!notificacionesAbiertas);
  const irAMensajes = () => navigate('/mensajes');

  const handleProfileClick = () => {
    navigate('/perfil');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setMenuOpen(false);
  };

  const handleBuscar = async (e) => {
    const query = e.target.value;
    setBusqueda(query);

    if (query.trim().length === 0) {
      setResultados([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuario/buscar?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setResultados(data);
    } catch (err) {
      console.error('Error en la búsqueda:', err);
    }
  };

  const handleUserClick = (username) => {
    setBusqueda('');
    setResultados([]);
    navigate(`/usuario/${username}`);
  };

  const obtenerSolicitudes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes/recibidas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSolicitudes(data);
      }
    } catch (err) {
      console.error('Error al obtener solicitudes:', err);
    }
  };

  const aceptarSolicitud = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes/${id}/aceptar`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    obtenerSolicitudes();
  };

  const rechazarSolicitud = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    obtenerSolicitudes();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const obtenerFoto = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuario/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usuario = await res.json();
        if (usuario.foto?.startsWith('http')) {
          setFotoPerfil(usuario.foto);
        } else if (usuario.foto) {
          setFotoPerfil(`${import.meta.env.VITE_API_URL}${usuario.foto}`);
        }
      } catch (error) {
        console.error('Error al cargar foto de perfil:', error);
      }
    };

    obtenerFoto();
    obtenerSolicitudes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
      if (!notiRef.current?.contains(event.target)) setNotificacionesAbiertas(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div
        className="navbar-logo"
        onClick={() => navigate('/inicio')}
        style={{ cursor: 'pointer' }}
      >
        <img
          src="./src/assets/ico_mindy_navbar.png"
          alt="Logo Mindy"
          className="logo-img"
        />
      </div>

      <div className="navbar-search-container">
        <input
          type="text"
          placeholder="Buscar..."
          className="navbar-search"
          value={busqueda}
          onChange={handleBuscar}
        />
        {resultados.length > 0 && (
          <div className="search-results">
            {resultados.map((usuario) => (
              <div
                key={usuario._id}
                className="search-item"
                onClick={() => handleUserClick(usuario.username)}
              >
                {usuario.foto ? (
                  <img src={usuario.foto} alt="Foto" className="search-foto" />
                ) : (
                  <UserCircleIcon className="icon profile-icon" />
                )}
                <div>
                  <strong>{usuario.name}</strong>
                  <p>@{usuario.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="navbar-icons">
        {/* Ícono de chat */}
        <div className="chat-icon" onClick={irAMensajes}>
          <ChatBubbleLeftEllipsisIcon className="icon" />
        </div>

        {/* Ícono de notificaciones */}
        <div className="notification-icon" onClick={toggleNotificaciones} ref={notiRef}>
          <BellIcon className="icon" />
          {solicitudes.length > 0 && (
            <span className="notification-badge">{solicitudes.length}</span>
          )}

          {notificacionesAbiertas && (
            <div className="notifications-dropdown">
              <h4>Solicitudes</h4>
              {solicitudes.length === 0 ? (
                <p className="noti-vacia">Sin solicitudes</p>
              ) : (
                solicitudes.map((sol) => (
                  <div key={sol._id} className="noti-item">
                    {sol.emisor.foto ? (
                      <img src={sol.emisor.foto} alt="foto" className="noti-foto" />
                    ) : (
                      <UserCircleIcon className="noti-foto" />
                    )}
                    <div>
                      <strong>{sol.emisor.name}</strong>
                      <p>@{sol.emisor.username}</p>
                      <div className="noti-botones">
                        <button onClick={() => aceptarSolicitud(sol._id)}>Aceptar</button>
                        <button onClick={() => rechazarSolicitud(sol._id)}>Rechazar</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Ícono de usuario */}
        <div className="user-icon-container" onClick={toggleMenu}>
          {fotoPerfil ? (
            <img src={fotoPerfil} alt="Perfil" className="icon profile-photo" />
          ) : (
            <UserCircleIcon className="icon profile-icon" />
          )}

          {menuOpen && (
            <div className="user-menu" ref={menuRef}>
              <button onClick={handleProfileClick}>Ir a perfil</button>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
