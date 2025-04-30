import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Asegúrate de que la ruta esté bien
import './Perfil.css';
import { useNavigate } from 'react-router-dom';

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
        const respuesta = await fetch('http://192.168.44.237:5000/api/usuario/me', {
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

  return (
    <>
      <Navbar />

      <div className="perfil-wrapper">
        <div className="perfil-layout">

          {/* Columna izquierda */}
          <div className="perfil-sidebar">
            <h3>information del perfil</h3>
            <p><strong>Biografía:</strong> {usuario.biografia}</p>
            <p><strong>Carrera:</strong> {usuario.carrera}</p>
            <p><strong>Semestre:</strong> {usuario.semestre}</p>
            <p><strong>Materias Fuertes:</strong> {usuario.materiasFuertes}</p>
          </div>

          {/* Columna derecha */}
          <div className="perfil-main">
            <div className="perfil-header">
              <img
                src={`http://192.168.44.237:5000${usuario.foto}`}
                alt="Foto de perfil"
                className="perfil-foto"
              />
              <div className="perfil-nombres">
                <h2>{usuario.name}</h2>
                <p className="username">@{usuario.username}</p>
                <button className="btn-editar-perfil" onClick={irAEditarPerfil}>
                  Editar perfil
                </button>
                <div className="perfil-stats">
                  <span>0 publicaciones</span>
                  <span>1 seguidor</span>
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

export default Perfil;
