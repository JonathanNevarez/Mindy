const express = require('express');
const { upload, cloudinary } = require('../config/cloudinary'); // usa lo exportado
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User');

const router = express.Router();

// POST /api/upload
router.post('/', authMiddleware, upload.single('foto'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }

    const imageUrl = req.file.path; // ya es la URL de Cloudinary

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { foto: imageUrl } },
      { new: true }
    );

    res.json({ mensaje: 'Foto actualizada', foto: imageUrl, user });
  } catch (err) {
    console.error('❌ Error al actualizar la foto con Cloudinary:', err);
    res.status(500).json({ error: 'Error al actualizar la foto' });
  }
});

module.exports = router;
