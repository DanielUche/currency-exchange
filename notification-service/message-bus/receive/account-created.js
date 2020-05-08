
const amqp = require('amqp-ts-async');
const config = require('../../config');
const Logger = require('../../utils/logger');
const AccountEmailService = require('../../email-services/accouts-emails');

const exchangeName = 'account.created';
const queueName = '';

const connection = new amqp.Connection(config.messagebus);
const exchange = connection.declareExchange(exchangeName, 'fanout', { durable: false });
const queue = connection.declareQueue(queueName, { exclusive: true });
queue.bind(exchange);


module.exports = {
  start: () => {
    try {
      queue.activateConsumer(AccountEmailService.accountCreated);
    }
    catch (err) {
      Logger.error(`Error Listening to ${exchangeName}, ${queueName}: ${err}`);
    }
  }
};
