import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { BellIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [notifications, setNotifications] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);

    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {

        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/usuario/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const usuario = await respuesta.json();
        if (usuario.foto) {
          if (usuario.foto.startsWith('http')) {
            setFotoPerfil(usuario.foto);
          } else {
            setFotoPerfil(`${import.meta.env.VITE_API_URL}${usuario.foto}`);
          }
        }
      } catch (error) {
        console.error('Error al cargar foto de perfil:', error);

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="navbar-logo">Mindy</div>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        className="navbar-search"
      />
      {/* Iconos */}
      <div className="navbar-icons">
        {/* Notificaciones */}
        <div className="notification-icon">
          <BellIcon className="icon" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </div>

        {/* Usuario */}
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
