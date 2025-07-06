const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  de: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  para: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensaje: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  leido: { type: Boolean, default: false } // ✅ nuevo campo
});

module.exports = mongoose.model('Mensaje', mensajeSchema);