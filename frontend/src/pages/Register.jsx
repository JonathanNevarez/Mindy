import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EticaModal from '../components/EticaModal';
import './Login.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [aceptaEtica, setAceptaEtica] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    return regex.test(username);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 20;
  };

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!aceptaEtica) {
      setError('Debes aceptar el Código de Ética de Mindy.');
      return;
    }

    if (!validateUsername(formData.username)) {
      setError('El username debe tener entre 3 y 16 caracteres sin espacios ni símbolos especiales');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('La contraseña debe tener entre 8 y 20 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.email.endsWith('@espoch.edu.ec')) {
      setError('Solo se permiten correos institucionales @espoch.edu.ec');
      return;
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-70%)',
                cursor: 'pointer'
              }}
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              👁️
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-70%)',
                cursor: 'pointer'
              }}
              onMouseDown={() => setShowConfirmPassword(true)}
              onMouseUp={() => setShowConfirmPassword(false)}
              onMouseLeave={() => setShowConfirmPassword(false)}
            >
              👁️
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <input
              type="checkbox"
              checked={aceptaEtica}
              onChange={(e) => setAceptaEtica(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <label style={{ fontSize: '14px', display: 'inline' }}>
              Acepto el{' '}
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setMostrarModal(true);
                }}
                style={{ color: '#b70000', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Código de Ética de Mindy
              </span>
            </label>
          </div>

          <button type="submit" className="auth-btn">Registrarme</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {mostrarModal && <EticaModal isOpen={mostrarModal} onClose={() => setMostrarModal(false)} />}
      </div>
    </div>
  );
};

export default Register;
