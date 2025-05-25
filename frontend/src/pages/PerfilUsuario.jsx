import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Perfil.css';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const cleanUsername = username.replace(/^@/, '');

        const respuesta = await fetch(
          `${import.meta.env.VITE_API_URL}/api/usuario/username/${cleanUsername}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!respuesta.ok) {
          throw new Error('Usuario no encontrado');
        }

        const datos = await respuesta.json();
        setUsuario(datos);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setError('No se encontró el usuario.');
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();
  }, [username]);

  if (loading) return <div className="perfil-cargando">Cargando perfil público...</div>;
  if (error) return <div className="perfil-error">{error}</div>;

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
              <img
                src={
                  usuario.foto?.startsWith('http')
                    ? usuario.foto
                    : `${import.meta.env.VITE_API_URL}${usuario.foto}`
                }
                alt="Foto de perfil"
                className="perfil-foto"
              />
              <div className="perfil-nombres">
                <h2>{usuario.name}</h2>
                <p className="username">@{usuario.username}</p>
                <button className="btn-editar-perfil">Agregar</button>
                <div className="perfil-stats">
                  <span>0 publicaciones</span>
                  <span>0 seguidores</span>
                  <span>0 seguidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfilUsuario;