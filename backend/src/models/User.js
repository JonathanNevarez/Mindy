// backend/src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
    username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 16,
    match: /^[a-zA-Z0-9_]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
    carrera: {
    type: String
  },
    semestre: {
    type: String
  },
    materiasFuertes: {
    type: String
  },
    biografia: {
    type: String
  },
    foto: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
