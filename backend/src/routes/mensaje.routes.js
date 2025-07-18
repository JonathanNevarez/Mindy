const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Mensaje = require('../models/Mensaje');

router.get('/:amigoId', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token faltante' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const miId = decoded.id;
    const amigoId = req.params.amigoId;

    const mensajes = await Mensaje.find({
      $or: [
        { de: miId, para: amigoId },
        { de: amigoId, para: miId }
      ]
    }).sort({ timestamp: 1 });

    res.json(mensajes);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ message: 'Error al obtener mensajes' });
  }
});

router.put('/leido/:amigoId', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token faltante' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const miId = decoded.id;
    const amigoId = req.params.amigoId;

    await Mensaje.updateMany(
      { de: amigoId, para: miId, leido: false },
      { $set: { leido: true } }
    );

    res.json({ message: 'Mensajes marcados como leídos' });
  } catch (err) {
    console.error('❌ Error al marcar mensajes como leídos:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
