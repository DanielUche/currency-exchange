const sequelize = require('../config/database');

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
      allowNull: false
    },
    userid: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },{
      tableName: 'accounts',
      sequelize,
});

module.exports = Account;
