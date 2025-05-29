require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

// DB y rutas
const connectDB = require('./db');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const solicitudRoutes = require('./routes/solicitud.routes');
const uploadRoutes = require('./routes/upload.routes');

// Utilidades para el chat
const { verificarAmistad } = require('./utils/verificarAmistad');
const { guardarMensajeEnDB } = require('./utils/guardarMensajeEnDB');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // cámbialo si usas un frontend específico
    methods: ['GET', 'POST']
  }
});

// Usuarios conectados: userId -> socket.id
const usuariosConectados = new Map();

// Middleware socket.io: autenticación con token
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('No autorizado'));

  try {
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
    if (!usuariosConectados.has(para)) return;

    const esAmigo = await verificarAmistad(socket.userId, para);
    if (!esAmigo) return;

    await guardarMensajeEnDB(socket.userId, para, mensaje);

    const receptorSocketId = usuariosConectados.get(para);
    io.to(receptorSocketId).emit('nuevoMensaje', {
      de: socket.userId,
      mensaje,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Usuario desconectado: ${socket.userId}`);
    usuariosConectados.delete(socket.userId);
  });
});

// Middlewares y rutas
app.use(cors());
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