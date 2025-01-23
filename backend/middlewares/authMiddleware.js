const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pro ověření tokenu
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token chybí.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Uživatel neexistuje.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Chyba při ověřování tokenu:', error.message);
    res.status(401).json({ message: 'Token je neplatný nebo vypršel.' });
  }
};