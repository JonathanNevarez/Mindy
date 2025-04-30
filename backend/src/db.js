const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado exitosamente a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB Atlas:', err.message);
    process.exit(1); // Sale si no puede conectar
  }
};

module.exports = connectDB;
