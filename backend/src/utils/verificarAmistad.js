const Usuario = require('../models/User');

const verificarAmistad = async (id1, id2) => {
  const usuario = await Usuario.findById(id1);
  return usuario && usuario.amigos.includes(id2);
};

module.exports = verificarAmistad;