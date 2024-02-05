const ERROR_CODES = Object.freeze({
  401: {
    TWO_FA_OTP_REQUIRED: '401001',
    USER_NOT_AUTHORIZED: '401002',
    USER_NOT_CONFIRMED: '401003',
    USER_TOKEN_EXPIRED: '401004',
  },
  404: {
    ENTITY_NOT_FOUND: '404001',
  },
});

module.exports = { ERROR_CODES };
