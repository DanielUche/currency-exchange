/* eslint max-classes-per-file: 0 */
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidatorError extends AppError {
  constructor(fieldName, value, errorMessage) {
    super();
    this.errorCode = 900;
    this.fieldName = fieldName;
    this.value = value;
    this.message = errorMessage;
  }
}

class DatabaseRecordExistException extends AppError {
  constructor(message) {
    super();
    this.errorCode = 400;
    this.message = message;
  }
}

class UnauthorizedException extends AppError {
  constructor(message) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}

class NotFoundException extends AppError {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'The resource you are looking for was not found.';
  }
}

class InternalServerException extends AppError {
  constructor() {
    super();
    this.statusCode = 500;
    this.message = 'An Internal Server error has occured';
  }
}

class ServiceUnavailableException extends AppError {
  constructor(name) {
    super();
    this.statusCode = 503;
    this.message = `Service [${name}] is unreachable`;
  }
}


module.exports = {
  ValidatorError,
  DatabaseRecordExistException,
  InternalServerException,
  UnauthorizedException,
  NotFoundException,
  ServiceUnavailableException
};

/*
   * When we tell express to res.json(err) we expect it to serialize all of the
   * properties of our Error classes; however the superclass's message field is
   * marked as `enumerable: false` which prevents it from being included in the
   * response. To get around this, we're implementing a toJSON on the Error
   * prototype which creates a dummy object with all of the OwnProperties of our
   * Error classes which allows its message field to serialize.
   *
   * This code was taken from https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
   */
if (!('toJSON' in Error.prototype)) {
  /* eslint no-extend-native: 0 */
  Object.defineProperty(Error.prototype, 'toJSON', {
    value() {
      var alt = {};

      Object.getOwnPropertyNames(this).forEach((key) => {
        alt[key] = this[key];
      }, this);
      // We don't want to serialize the whole stack trace
      delete alt.stack;
      return alt;
    },
    configurable: true,
    writable: true
  });
}
