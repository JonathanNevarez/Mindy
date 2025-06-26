import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import PerfilUsuario from './pages/PerfilUsuario';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import socket from './socket';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    socket.auth = { token };
    socket.connect();

    socket.on('connect', () => {
      console.log('✅ Conectado al socket con ID:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Error al conectar socket:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/inicio" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="/editarperfil" element={<ProtectedRoute><EditarPerfil /></ProtectedRoute>} />
      <Route path="/usuario/:username" element={<PerfilUsuario />} />
      <Route path="/mensajes" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} /> {/* ✅ ruta agregada */}
    </Routes>
  );
};

export default App;