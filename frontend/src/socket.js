import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
  auth: (cb) => {
    const token = localStorage.getItem('token');
    cb({ token }); // ✅ se obtiene justo antes de conectar
  },
  withCredentials: true
});

export default socket;