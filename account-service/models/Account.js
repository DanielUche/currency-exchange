
const bcrypt = require('bcrypt');
const { sequelize, Sequelize } = require('../config/database');

const Account = sequelize.define('account', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  login_type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'accounts',
  sequelize,
  hooks: {
    beforeCreate: (data) => {
      const account = data;
      const { password } = account.dataValues;
      {
        const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));
        account.dataValues.password = bcrypt.hashSync(password, salt);
      }
      return account;
    }
  }
});


module.exports = Account;
