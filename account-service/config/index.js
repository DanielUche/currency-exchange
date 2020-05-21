const database = require('./database');

module.exports = {
  name: 'Account Services',
  database,
  defaultErrMsg: 'An error has occured',
  port: process.env.PORT || 8000,
  environment: process.env.ENVIRONMENT || 'dev',
  jwtsecret: process.env.JWT_SECRET,
  messagebus: process.env.MESSAGE_BUS || 'amqp://rabbitmq',
  messageTimeout: process.MESSAGE_TIEMOUT || 5000
};
