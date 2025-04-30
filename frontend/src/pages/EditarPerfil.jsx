import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

const EditarPerfil = () => {
  const [form, setForm] = useState({
    carrera: '',
    semestre: '',
    materiasFuertes: '',
    biografia: '',
    foto: ''
  });

  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState('');

  const navigate = useNavigate();

  const carreras = [
    'Agronomía',
    'Turismo',
    'Ingeniería Ambiental',
    'Zootecnia',
    'Tecnologías de la Información'
  ];

  const semestres = Array.from({ length: 9 }, (_, i) => `PAO${i}`);

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

        const usuario = await respuesta.json();
        setForm({
          carrera: usuario.carrera || '',
          semestre: usuario.semestre || '',
          materiasFuertes: usuario.materiasFuertes || '',
          biografia: usuario.biografia || '',
          foto: usuario.foto || ''
        });

        if (usuario.foto) {
          if (usuario.foto.startsWith('http')) {
            setPreview(usuario.foto);
          } else {
            setPreview(`http://192.168.44.237:5000${usuario.foto}`);
          }
        } else {
          setPreview('');
        }

      } catch (error) {
        console.error('Error al obtener el perfil para editar:', error);
      }
    };

    obtenerUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const imageUrl = URL.createObjectURL(archivo);
      setPreview(imageUrl);
      setImagen(archivo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No se encontró un token. Por favor inicia sesión nuevamente.');
      return;
    }

    try {
      if (imagen) {
        const formData = new FormData();
        formData.append('foto', imagen);

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();
        if (data.foto) {
          form.foto = data.foto;
        }
      }

      const perfilRes = await fetch('/api/usuario/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const respuestaTexto = await perfilRes.text();
      try {
        const data = JSON.parse(respuestaTexto);
        navigate('/perfil');
      } catch (error) {
        console.warn('⚠️ La respuesta no era JSON válido');
      }

    } catch (err) {
      console.error('❌ Error al guardar perfil:', err);
      alert('Ocurrió un error al guardar los cambios');
    }
  };

  return (
    <div className="perfil-container">
      <h2>Editar Perfil</h2>

      <form onSubmit={handleSubmit}>

       <label>Foto de perfil</label>

        {preview && (
          <img
            src={preview}
            alt="Vista previa"
          />
        )}

        <input type="file" accept="image/*" onChange={handleImagen} />

        <label>Carrera</label>
        <select name="carrera" value={form.carrera} onChange={handleChange} required>
          <option value="">Selecciona una carrera</option>
          {carreras.map((carrera) => (
            <option key={carrera} value={carrera}>{carrera}</option>
          ))}
        </select>

        <label>Semestre</label>
        <select name="semestre" value={form.semestre} onChange={handleChange} required>
          <option value="">Selecciona tu semestre</option>
          {semestres.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label>Materias fuertes</label>
        <input
          type="text"
          name="materiasFuertes"
          value={form.materiasFuertes}
          onChange={handleChange}
          placeholder="Ej. Matemáticas, Química"
        />

        <label>Bibliografía</label>
        <textarea
          name="biografia"
          value={form.biografia}
          onChange={handleChange}
          placeholder="Comparte algo sobre ti o tus lecturas favoritas..."
        />

        <button type="submit" className="btn-guardar">
          Guardar Cambios
        </button>

      </form>
    </div>
  );
};

export default EditarPerfil;
