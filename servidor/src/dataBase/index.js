require('dotenv').config();
const { Pool } = require('pg');

const dataBase = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATA_BASE,
  port: 5432,
  allowExitOnIdle: true,
})
dataBase.on('connect', () => {
  console.log('Conexión con la base de datos, ok');
});

dataBase.on('error', (error) => {
  console.error('Conexión con la base de datos, fallida:', error.message);
});

module.exports = dataBase