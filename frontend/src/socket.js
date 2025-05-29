import { io } from 'socket.io-client';

// Solo usamos la URL definida en .env
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('token') // JWT guardado tras login
  }
});

export default socket;