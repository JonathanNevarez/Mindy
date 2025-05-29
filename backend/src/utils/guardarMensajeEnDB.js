const Mensaje = require('../models/Mensaje');

const guardarMensajeEnDB = async (de, para, mensaje) => {
  await Mensaje.create({ de, para, mensaje });
};

module.exports = { guardarMensajeEnDB };