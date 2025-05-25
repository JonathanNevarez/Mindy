import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { BellIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [notifications, setNotifications] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setResultados(data);
    } catch (err) {
      console.error('Error en la búsqueda:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const obtenerFoto = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/usuario/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const usuario = await respuesta.json();
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
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-logo">Mindy</div>

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
              <Link
                to={`/perfil/${usuario._id}`}
                key={usuario._id}
                className="search-item"
                onClick={() => {
                  console.log("Navegando a:", usuario._id);
                  setBusqueda('');
                  setResultados([]);
                }}
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
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="navbar-icons">
        <div className="notification-icon">
          <BellIcon className="icon" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </div>

        <div className="user-icon-container" onClick={toggleMenu}>
          {fotoPerfil ? (
            <img
              src={fotoPerfil}
              alt="Perfil"
              className="icon profile-photo"
            />
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

