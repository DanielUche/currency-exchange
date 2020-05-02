const Sequelize = require('sequelize');
require('dotenv').config({ path: '../.env' });

const sequelize = new Sequelize(`${process.env.DB_URL}`);


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

// // Uncomment to test connection string
// testConnection();