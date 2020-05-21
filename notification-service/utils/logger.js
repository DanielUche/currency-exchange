const appRoot = require('app-root-path');
const winston = require('winston');

const { createLogger, format, transports } = winston;
const {
  combine, timestamp, label, printf
} = format;


const getFileNameAndLineNumber = () => {
  const oldStackTrace = Error.prepareStackTrace;
  try {
    // eslint-disable-next-line handle-callback-err
    Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
    Error.captureStackTrace(this);
    return `${this.stack[11].getFileName()}:${this.stack[11].getLineNumber()}`;
  }
  finally {
    Error.prepareStackTrace = oldStackTrace;
  }
};

const myFormat = printf(({
  level: lvl, message, label: lbl, timestamp: time
}) => `${time} [${lbl.toUpperCase()} | ${getFileNameAndLineNumber()}] ${lvl}: ${message} `);

const sharedOpt = {
  level: 'info',
  humanReadableUnhandledException: true,
  handleExceptions: true,
  json: true,
  colorize: false
};

var options = {
  file: {
    ...sharedOpt,
    filename: `${appRoot}/logs/app.log`,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  console: {
    ...sharedOpt,
    stderrLevels: ['warn', 'error', 'alert'],
    formatter: myFormat
  }
};

// instantiate a new Winston Logger with the settings defined above
const CreateLogger = createLogger;
const Logger = new CreateLogger({
  format: combine(
    label({ label: 'Account Service' }),
    winston.format.colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});
module.exports = Logger;
