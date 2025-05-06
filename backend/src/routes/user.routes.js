const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User');

// ✅ Obtener usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // nunca enviar password
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

// ✅ Actualizar perfil del usuario autenticado
router.put('/me', authMiddleware, async (req, res) => {
  try {
    console.log('📦 Datos recibidos en req.body:', req.body);
    console.log('🧑 ID del usuario autenticado:', req.user?.id);

    const fields = ['carrera', 'semestre', 'materiasFuertes', 'biografia', 'foto'];
    const updates = {};

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    console.log('📤 Campos que se actualizarán:', updates);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select('-password');

    console.log('✅ Usuario actualizado:', user);

    res.json(user);
  } catch (err) {
    console.error('❌ Error actualizando perfil:', err);
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

// ✅ Obtener perfil público por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('❌ Error al obtener perfil público:', error);
    res.status(500).json({ message: 'Error al obtener perfil público' });
  }
});

// 👤 Obtener perfil público por username
router.get('/:username', authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findOne({ username: req.params.username }).select('-password -email');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('❌ Error al obtener perfil público:', error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
});

module.exports = router;
