module.exports = {
  name: 'Notification Service',
  port: process.env.PORT || 8001,
  environment: process.env.ENVIRONMENT || 'dev',
  messagebus: process.env.MESSAGE_BUS || 'amqp://rabbitmq',
  messageTimeout: process.MESSAGE_TIEMOUT || 5000
};
