/**
 * Unhandled exception
 * @param {String} [reason] - Reason of exit
 */
const UnhandledError = (reason) => {
  console.error(reason);

  // eslint-disable-next-line n/no-process-exit
  process.exit(1);
};

module.exports = { UnhandledError };
