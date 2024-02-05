const OTP_SUBJECTS = Object.freeze({
  // ===========================================================================
  // Private
  // ===========================================================================
  CONFIG_SETUP: 'fb55',
  // ===========================================================================
  // Public
  // ===========================================================================
  // 2FA Configuration =========================================================
  CONFIG_UPDATE: 'f5b8',
  CONFIG_STATUS: '916b',
  CONFIG_DELETE: '85c4',

  // Authentication ============================================================
  SIGN_IN: '42df',
  RESET_PASSWORD: 'd165',

  // Payments ==================================================================
  CONFIRM_PAYMENT: 'd789',
  // '075d'
  // 'f455'
  // 'f7d6'
  // 'cef2'
  // '1fd8'
  // 'c3fc'
});

const SESSION = Object.freeze({
  LIFETIME: '7d',
  EXT_LIFETIME: '14d',
  REFRESH_RATE: '1d',
});

const TWO_FA_PROVIDERS = Object.freeze({
  SMS: 'SMS',
  EMAIL: 'EMAIL',
  TOTP_CODE: 'TOTP',
});

const TWO_FA_PROCESSING_STATUS = Object.freeze({
  OK: 0,
  NOT_FOUND: 1,
  INVALID: 2,
  RETRY: 3,
  LIMIT: 4,
});

const TWO_FA_PROCESSING_MESSAGE = Object.freeze({
  [TWO_FA_PROCESSING_STATUS.OK]: `Successfully confirmed!`,
  [TWO_FA_PROCESSING_STATUS.NOT_FOUND]: `Confirmation request not found or can be expired!`,
  [TWO_FA_PROCESSING_STATUS.INVALID]: `Invalid configuration has been provided`,
  [TWO_FA_PROCESSING_STATUS.RETRY]: `Confirmation code is invalid. New code will be send!`,
  [TWO_FA_PROCESSING_STATUS.LIMIT]: `Too many unsuccessful attempts. Account will be suspended due to security reasons.`,
});

const OTP_LIMITATIONS = Object.freeze({
  TTL: '2m',
  CONFIRMATION_TTL: '3m',
  MAX_CONFIRMATION_RETRIES: 5,
  CONFIRMATION_RETRIES_TIME_FRAME: '3m',
  MAX_RESTORE_RETRIES: 3,
  RESTORE_RETRIES_TIME_FRAME: '24h',
  MAX_REFRESHES_RETRIES: 3,
  MAX_REFRESHES_RETRIES_TIME_FRAME: '5m',
  INITIAL_CONFIG_SNAPSHOT_TTL: '10m',
});

const AUTH_LIMITATIONS = Object.freeze({
  MAX_LOGIN_PASSWORD_RETRIES: 5,
});

/**
 * @readonly
 */
module.exports = {
  SESSION,
  OTP_SUBJECTS,
  OTP_LIMITATIONS,
  AUTH_LIMITATIONS,
  TWO_FA_PROVIDERS,
  TWO_FA_PROCESSING_STATUS,
  TWO_FA_PROCESSING_MESSAGE,
  OTP_SUBJECTS_LIST: Object.freeze(Object.values(OTP_SUBJECTS)),
  TWO_FA_PROVIDERS_LIST: Object.freeze(Object.values(TWO_FA_PROVIDERS)),
};
