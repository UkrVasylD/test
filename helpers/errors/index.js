const { HttpException } = require('./http');
const { UnhandledError } = require('./system');
const DomainExceptions = require('./domains/');

module.exports = {
  ...DomainExceptions,
  HttpException,
  UnhandledError,
};
