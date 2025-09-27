// backend/src/_helper/db.js
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = {};

async function initialize() {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.end();

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      logging: false,
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    // Load the User model and add it to the db object.
    db.User = require('../modules/user/user.model')(sequelize, DataTypes);
    
    // Sync the models with the database.
    await sequelize.sync({ alter: true });

  } catch (err) {
    console.error('Error initializing DB:', err);
    throw err;
  }
}

module.exports = {
  db,
  initialize,
};