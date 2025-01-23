require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Definice routu pro hlavní stránku
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '', ''));
});

// Definice routů pro API
app.use('/api/auth', authRoutes);

// Připojení k databázi
sequelize.authenticate()
  .then(() => console.log('Připojení k databázi bylo úspěšné!'))
  .catch(error => console.error('Připojení k databázi selhalo:', error));

// Synchronizace databáze a spuštění serveru
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});