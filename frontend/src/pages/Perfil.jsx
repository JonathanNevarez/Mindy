import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Perfil.css';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const irAEditarPerfil = () => {
    navigate('/editarperfil');
  };

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/usuario/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const datos = await respuesta.json();
        setUsuario(datos);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    obtenerUsuario();
  }, []);

  if (!usuario) return <div className="perfil-cargando">Cargando perfil...</div>;

  const tieneFoto = usuario.foto && usuario.foto.trim() !== '';
  const fotoUrl = tieneFoto
    ? (usuario.foto.startsWith('http')
      ? usuario.foto
      : `${import.meta.env.VITE_API_URL}${usuario.foto}`)
    : null;

  return (
    <>
      <Navbar />

      <div className="perfil-wrapper">
        <div className="perfil-layout">

          {/* Columna izquierda */}
          <div className="perfil-sidebar">
            <h3>Información del perfil</h3>
            <p><strong>Biografía:</strong> {usuario.biografia}</p>
            <p><strong>Carrera:</strong> {usuario.carrera}</p>
            <p><strong>Semestre:</strong> {usuario.semestre}</p>
            <p><strong>Materias Fuertes:</strong> {usuario.materiasFuertes}</p>
          </div>

          {/* Columna derecha */}
          <div className="perfil-main">
            <div className="perfil-header">
              {tieneFoto ? (
                <img
                  src={fotoUrl}
                  alt="Foto de perfil"
                  className="perfil-foto"
                />
              ) : (
                <UserCircleIcon className="perfil-foto-icon" />
              )}
              <div className="perfil-nombres">
                <h2>{usuario.name}</h2>
                <p className="username">@{usuario.username}</p>
                <button className="btn-editar-perfil" onClick={irAEditarPerfil}>
                  Editar perfil
                </button>
                <div className="perfil-stats">
                  <span>{usuario.amigos?.length || 0} amigos</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Perfil;
