const { Sequelize } = require('sequelize');

// Připojení k databázi 'fintrack_db' s uživatelem 'root' a heslem 'root'.
const sequelize = new Sequelize('undeath-db', 'root', 'Password123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;