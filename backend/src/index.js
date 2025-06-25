require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// DB y rutas
const connectDB = require('./db');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const solicitudRoutes = require('./routes/solicitud.routes');
const uploadRoutes = require('./routes/upload.routes');
const mensajeRoutes = require('./routes/mensaje.routes');
app.use('/api/mensajes', mensajeRoutes);

// Utilidades para el chat
const verificarAmistad = require('./utils/verificarAmistad');
const guardarMensajeEnDB = require('./utils/guardarMensajeEnDB');

const app = express();

// Confía en proxy (necesario para Render y HTTPS proxy)
app.set('trust proxy', 1);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://peneclone.info', // dominio frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Usuarios conectados: userId -> socket.id
const usuariosConectados = new Map();

// Middleware socket.io: autenticación con token
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('No autorizado'));

  try {
    console.log('🔐 JWT_SECRET en socket.io:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error('Token inválido'));
  }
});

// Eventos socket.io
io.on('connection', (socket) => {
  console.log(`🟢 Usuario conectado: ${socket.userId}`);
  usuariosConectados.set(socket.userId, socket.id);

  socket.on('mensajePrivado', async ({ para, mensaje }) => {
    if (!mongoose.Types.ObjectId.isValid(socket.userId) || !mongoose.Types.ObjectId.isValid(para)) {
      console.log('ID de usuario o receptor inválido');
      return;
    }
    console.log(`Mensaje recibido de ${socket.userId} para ${para}: ${mensaje}`);

    if (!usuariosConectados.has(para)) {
      console.log(`Receptor ${para} no está conectado`);
      // Puedes guardar el mensaje para entrega diferida si quieres
    }

    const esAmigo = await verificarAmistad(socket.userId, para);
    console.log(`¿Son amigos? ${esAmigo}`);

    if (!esAmigo) {
      console.log('No son amigos, mensaje no enviado');
      return;
    }

    try {
      await guardarMensajeEnDB(socket.userId, para, mensaje);
      console.log('Mensaje guardado en DB');
    } catch (error) {
      console.error('Error guardando mensaje:', error);
      return; // No sigas con la emisión si fallo guardar
    }

    const receptorSocketId = usuariosConectados.get(para);
    if (receptorSocketId) {
      io.to(receptorSocketId).emit('nuevoMensaje', {
        de: socket.userId,
        mensaje,
        timestamp: new Date()
      });
      console.log('Mensaje emitido al receptor');
    } else {
      console.log('Receptor no conectado, no se emitió mensaje');
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Usuario desconectado: ${socket.userId}`);
    usuariosConectados.delete(socket.userId);
  });
});

// Middlewares y rutas
app.use(cors({
  origin: 'https://peneclone.info', // dominio frontend
  credentials: true
}));
app.use(express.json());

app.use('/api/usuario', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Conexión a MongoDB
connectDB();

app.get('/', (req, res) => res.send('Servidor Mindy activo'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
});