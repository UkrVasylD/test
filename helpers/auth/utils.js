const crypto = require('crypto');

const {
  config: { SECRET_KEY },
} = require('../../config');

module.exports = {
  setPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto
      .pbkdf2Sync(password, `${salt}${SECRET_KEY}`, 10000, 512, 'sha512')
      .toString('hex');

    return { salt, hash };
  },

  validPassword(password, salt, userHash) {
    //---------------
    const hash = crypto
      .pbkdf2Sync(password, `${salt}${SECRET_KEY}`, 10000, 512, 'sha512')
      .toString('hex');

    return userHash === hash;
  },
};
