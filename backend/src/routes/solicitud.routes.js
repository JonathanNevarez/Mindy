const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const Solicitud = require('../models/Solicitud');
const User = require('../models/User');

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

// ✅ Aceptar solicitud y crear amistad mutua
router.put('/:id/aceptar', auth, async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud || solicitud.receptor.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Solicitud no encontrada o no autorizada' });
    }

    // Agregar ambos usuarios como amigos mutuamente
    await User.findByIdAndUpdate(solicitud.emisor, {
      $addToSet: { amigos: solicitud.receptor }
    });

    await User.findByIdAndUpdate(solicitud.receptor, {
      $addToSet: { amigos: solicitud.emisor }
    });

    // Eliminar la solicitud (ya no es necesaria)
    await solicitud.deleteOne();

    res.json({ message: 'Solicitud aceptada. Ahora son amigos.' });
  } catch (error) {
    console.error('❌ Error al aceptar solicitud:', error);
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
