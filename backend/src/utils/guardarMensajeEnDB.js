const Mensaje = require('../models/Mensaje');

const guardarMensajeEnDB = async (de, para, mensaje) => {
  try {
    const nuevoMensaje = await Mensaje.create({ de, para, mensaje });
    console.log('Mensaje guardado:', nuevoMensaje);
  } catch (error) {
    console.error('Error guardando mensaje en DB:', error);
    throw error; // para que se propague al llamador y manejes el error
  }
};

module.exports = guardarMensajeEnDB;