const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User');

// GET /api/usuario/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // nunca enviar password
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

// PUT /api/usuario/me
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

module.exports = router;
