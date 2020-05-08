const Email = require('email-templates');
const Logger = require('../utils/logger');
require('dotenv').config({ path: '../.env' });


const { MAIL_TRAP_PASS, MAIL_TRAP_USER } = process.env;

const accountCreated = (message) => {
  const account = JSON.parse(message.content.toString());
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'hi@example.com'
    },
    send: true,
    transport: {
      host: 'smtp.mailtrap.io',
      port: 2525,
      ssl: false,
      tls: true,
      auth: {
        user: `${MAIL_TRAP_USER}`,
        pass: `${MAIL_TRAP_PASS}`
      }
    }
  });
  try {
    // email.renderAll('templates/welcome', account);
    email.send({
      template: 'templates/welcome',
      message: {
        to: account.email
      },
      locals: account
    });
  }
  catch (error) {
    Logger.error(`Error sending Account Creation Email ${error}`);
    throw new Error('Error sending Account Creation Email');
  }
};


module.exports = {
  accountCreated
};
