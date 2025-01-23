const { Sequelize } = require('sequelize');

// Připojení k databázi 'fintrack_db' s uživatelem 'root' a heslem 'root'.
const sequelize = new Sequelize('undeath-db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;