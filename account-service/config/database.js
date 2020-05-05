const Sequelize = require('sequelize');
require('dotenv').config({ path: '../.env' });

const sequelize = new Sequelize(`${process.env.DB_URL}`);


module.exports = { sequelize, Sequelize };
