const Email = require('email-templates');
const Logger = require('../utils/logger');
require('dotenv').config({ path: '../.env' });


const { MAIL_TRAP_PASS, MAIL_TRAP_USER } = process.env;

Logger.info(MAIL_TRAP_PASS, '=======', MAIL_TRAP_USER);

const accountCreated = (message) => {
  const account = JSON.parse(message.content.toString());
  const email = new Email({
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
        user: `${MAIL_TRAP_USER}`, // your Mailtrap username
        pass: `${MAIL_TRAP_PASS}` // your Mailtrap password
      }
    }
  });
  try {
    email.send({
      template: 'welcome',
      message: {
        to: account.email
      }
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
