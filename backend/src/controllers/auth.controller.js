const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTRO
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log("🧪 Entrando a registerUser...");
  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
  console.error('💥 Error al registrar usuario:\n', JSON.stringify(err, null, 2));
  res.status(500).json({ message: 'Error al registrar usuario' });
}
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { registerUser, loginUser };
