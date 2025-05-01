require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const connectDB = require('./db');
const path = require('path');

const app = express();

// CORS CONFIGURADO PARA TU DOMINIO PERSONALIZADO
app.use(cors({
  origin: ['https://peneclone.info'],
  credentials: true
}));

app.use(express.json());
app.use('/api/usuario', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/upload', require('./routes/upload.routes'));

// Conexión a MongoDB
connectDB();

// Rutas
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Servidor Mindy activo'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
});
