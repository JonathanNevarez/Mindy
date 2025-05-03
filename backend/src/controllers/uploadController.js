const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });

    const result = await cloudinary.uploader.upload(file.path);
    res.json({ foto: result.secure_url });
  } catch (err) {
    console.error('❌ Error al subir imagen a Cloudinary:', err);
    res.status(500).json({ error: 'Error al subir imagen' });
  }
};

module.exports = { uploadImage };
