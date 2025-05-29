const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User');

// ✅ Obtener usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

// ✅ Actualizar perfil del usuario autenticado
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const fields = ['carrera', 'semestre', 'materiasFuertes', 'biografia', 'foto'];
    const updates = {};

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
});

// 🔍 Buscar usuarios por nombre, username o correo
router.get('/buscar', authMiddleware, async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Falta el término de búsqueda' });

  try {
    const regex = new RegExp(q, 'i');
    const usuarios = await User.find({
      $or: [
        { name: regex },
        { username: regex },
        { email: regex }
      ]
    }).select('-password');

    res.json(usuarios);
  } catch (error) {
    console.error('❌ Error al buscar usuarios:', error);
    res.status(500).json({ message: 'Error en la búsqueda' });
  }
});

// ✅ Obtener perfil público por username (DEBE IR ANTES que /:id)
router.get('/username/:username', async (req, res) => {
  try {
    const usuario = await User.findOne({ username: req.params.username }).select('-password -email');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('❌ Error al obtener perfil por username:', error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
});

// ✅ Obtener lista de amigos del usuario autenticado
router.get('/amigos', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('amigos', 'name username foto');
    res.json(user.amigos);
  } catch (err) {
    console.error('❌ Error al obtener amigos:', err);
    res.status(500).json({ error: 'Error al obtener la lista de amigos' });
  }
});

// ✅ Obtener perfil público por ID (ESTO SIEMPRE VA AL FINAL)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('❌ Error al obtener perfil por ID:', error);
    res.status(500).json({ message: 'Error al obtener perfil público' });
  }
});

module.exports = router;