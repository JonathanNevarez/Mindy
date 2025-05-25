const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Solicitud = require('../models/Solicitud');

// 📨 Crear solicitud de amistad
router.post('/', auth, async (req, res) => {
  const { receptorId } = req.body;

  if (receptorId === req.user.id) {
    return res.status(400).json({ message: 'No puedes enviarte una solicitud a ti mismo.' });
  }

  try {
    const yaExiste = await Solicitud.findOne({
      emisor: req.user.id,
      receptor: receptorId,
      estado: 'pendiente',
    });

    if (yaExiste) {
      return res.status(400).json({ message: 'Ya enviaste una solicitud a este usuario.' });
    }

    const solicitud = new Solicitud({
      emisor: req.user.id,
      receptor: receptorId,
    });

    await solicitud.save();
    res.status(201).json(solicitud);
  } catch (error) {
    console.error('❌ Error al crear solicitud:', error);
    res.status(500).json({ error: 'Error al crear la solicitud.' });
  }
});

// 📥 Obtener solicitudes recibidas (pendientes)
router.get('/recibidas', auth, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({
      receptor: req.user.id,
      estado: 'pendiente'
    }).populate('emisor', 'name username foto');

    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// ✅ Aceptar solicitud
router.put('/:id/aceptar', auth, async (req, res) => {
  try {
    const solicitud = await Solicitud.findOneAndUpdate(
      { _id: req.params.id, receptor: req.user.id },
      { estado: 'aceptada' },
      { new: true }
    );
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al aceptar solicitud' });
  }
});

// ❌ Rechazar solicitud
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Solicitud.findOneAndDelete({
      _id: req.params.id,
      receptor: req.user.id
    });
    res.json({ message: 'Solicitud rechazada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al rechazar solicitud' });
  }
});

module.exports = router;