const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Uživatel pod tímto jménem už existuje' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Uživatel byl úspěšně registrován.', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při registraci.', error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Nesprávné přihlašovací údaje.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Nesprávné přihlašovací údaje.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Přihlášení bylo úspěšné.', token });
  } catch (error) {
    console.error('Chyba při přihlášení uživatele:', error);
    res.status(500).json({ message: 'Chyba serveru.' });
  }
};