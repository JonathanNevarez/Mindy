import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Perfil.css';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [yaSolicitado, setYaSolicitado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = localStorage.getItem('token');
        const cleanUsername = username.replace(/^@/, '');

        // Obtener el perfil público
        const respuesta = await fetch(
          `${import.meta.env.VITE_API_URL}/api/usuario/username/${cleanUsername}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!respuesta.ok) throw new Error('Usuario no encontrado');
        const datos = await respuesta.json();
        setUsuario(datos);

        // Obtener usuario autenticado
        const resMe = await fetch(`${import.meta.env.VITE_API_URL}/api/usuario/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const me = await resMe.json();
        setUsuarioActual(me);

        // Si no es uno mismo, verificar si ya existe una solicitud pendiente
        if (me._id !== datos._id) {
          const check = await fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receptorId: datos._id }),
          });

          if (check.status === 400) setYaSolicitado(true);
          if (check.status === 201) {
            // solicitud creada con éxito
            setYaSolicitado(true);
          }
        }
      } catch (err) {
        console.error('Error al obtener datos:', err);
        setError('No se encontró el usuario.');
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [username]);

  const enviarSolicitud = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/solicitudes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receptorId: usuario._id }),
      });

      if (res.ok) {
        setYaSolicitado(true);
      } else {
        const err = await res.json();
        alert(err.message || 'Error al enviar solicitud');
      }
    } catch (err) {
      console.error('Error al enviar solicitud:', err);
    }
  };

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

                {/* Mostrar botón solo si no es uno mismo */}
                {usuarioActual && usuarioActual._id !== usuario._id && (
                  <button
                    className="btn-editar-perfil"
                    disabled={yaSolicitado}
                    onClick={enviarSolicitud}
                  >
                    {yaSolicitado ? 'Solicitado' : 'Agregar'}
                  </button>
                )}

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

export default PerfilUsuario;