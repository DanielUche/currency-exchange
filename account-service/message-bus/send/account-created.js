const amqp = require('amqp-ts-async');
const config = require('../../config');
const Logger = require('../../utils/logger');

const exchangeName = 'account.created';
module.exports = {
  send: (account) => {
    try {
      if (!account) {
        throw new Error('Should send a valid account');
      }
      const connection = new amqp.Connection(config.messagebus);
      const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
      exchange.send(new amqp.Message(JSON.stringify(account)));
      setTimeout(() => {
        connection.close();
      }, config.messageTimeout);
    }
    catch (error) {
      Logger.error(`Error sending Acoount Created Event to ${exchangeName}: ${error}`);
    }
  }
};
