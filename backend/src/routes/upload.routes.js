const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User');

const router = express.Router();
const upload = multer({ dest: 'temp/' }); // Temporal

router.post('/', authMiddleware, upload.single('foto'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ninguna imagen' });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'mindy-perfiles',
    });

    // Borra archivo temporal
    fs.unlinkSync(req.file.path);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { foto: result.secure_url } },
      { new: true }
    );

    res.json({ mensaje: 'Foto actualizada', foto: result.secure_url, user });
  } catch (err) {
    console.error('❌ Error subiendo a Cloudinary:', err);
    res.status(500).json({ error: 'Error al actualizar la foto' });
  }
});

module.exports = router;
