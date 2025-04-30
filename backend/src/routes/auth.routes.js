const express = require('express');
const router = express.Router(); // ✅ Solo aquí

const { registerUser, loginUser } = require('../controllers/auth.controller');

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
