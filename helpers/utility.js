const { createHash } = require('crypto');

const CONSTANTS = require('../constants');

function isEmptyObject(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

const generateStreamingInputAccessToken = () => {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

function numberToDHM(arg) {
  let delta = arg;
  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);

  delta -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;

  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;

  delta -= minutes * 60;

  return `${days} days ${hours} hours ${minutes} minutes`;
}

/**
 * @param {Number} passLength password length
 */
function generateForgotPassToken(passLength) {
  let useTime = false;
  const now = new Date().valueOf();
  const alphabetical = `${CONSTANTS.ALPHABETICAL_STRING}${now}`;
  let res = '';
  let doit = true;
  let i = 0;
  let length = passLength;

  function randomNumber(m) {
    return Math.floor(Math.random() * m);
  }

  if (!length) {
    useTime = true;

    length = 50;
  }

  while (doit) {
    res += alphabetical.substr(randomNumber(alphabetical.length), 1);

    if (i === length) {
      doit = false;
    }

    i += 1;
  }

  if (!doit) {
    if (useTime) {
      return res + now;
    }

    return res;
  }
}

function generateSearchHashKey(payload) {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

/**
 * Freeze object and his nested components
 * @template T
 * @param {T} obj target object
 * @returns {T} freezedObj (isFrozen=true)
 */
const deepFreeze = (obj) => {
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {
      // eslint-disable-next-line no-unused-vars
      deepFreeze(obj[prop]);
    }
  });

  return Object.freeze(obj);
};

const delay = (time, unref = false) =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, time);

    if (unref && timer.unref) {
      timer.unref();
    }
  });

module.exports = {
  generateStreamingInputAccessToken,
  numberToDHM,
  generateForgotPassToken,
  isEmptyObject,
  deepFreeze,
  generateSearchHashKey,
  delay,
};
