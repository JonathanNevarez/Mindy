const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nombre único
  }
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', authMiddleware, upload.single('foto'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ninguna imagen' });

  const imagePath = `/uploads/${req.file.filename}`;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { foto: imagePath } },
      { new: true }
    );

    res.json({ mensaje: 'Foto actualizada', foto: imagePath, user });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la foto' });
  }
});

module.exports = router;
