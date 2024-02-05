const REGULAR_EXPRESSIONS = Object.freeze({
  PASSWORD: /[^\s]{6,}/,
  PRICE: /^[1-9][0-9]*\.[0-9]{2}$/i,
  STUDIO_PRICE: /^[0-9][0-9]*\.[0-9]{2}$/i,

  // /^[\p{L}\p{N}\p{P}\p{S}\p{Z}\p{M}]+$/u - will match an entire string that contains one or more Unicode characters belonging to any of the categories: letters, numbers, punctuation, symbols, separators, and combining marks
  ARTIST: /^[\p{L}\p{N}\p{P}\p{S}\p{Z}\p{M}]+$/u,
  ARTIST_URL: /^[\p{L}\p{N}\p{P}\p{S}\p{Z}\p{M}]+$/u,
  CHANNEL_URL: /^[A-Za-z0-9-]*$/,
  PORTFOLIO_URL: /^(?!.*?[.]{2})[a-zA-Z0-9][a-zA-Z0-9\-]+\.[a-z0-9\.\-]+$/,
  CUSTOM_URL: /^[a-zA-Z0-9_]{0,15}$/,
  ADVERTISING: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
  STUDIO: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
  // PASSWORD    : /(?=.*[0-9@$%&*!^()+=-])[0-9a-zA-Z!]{6,40}/,
  EMAIL_REGEXP: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  OBJECT_ID: /^[0-9a-fA-F]{24}$/,
  VERSION: /^(\d+\.)?(\d+\.)?(\*|\d+)$/,
  SPEC_SYMBOLS: /[-[\]{}()*+?`"<>.,\\/^$|#\s]/g,
  SEARCH_REGEXP: /[-[\]{}()*+%:;?`"<>.,\\/^$|#]/g,
  ALL_SPEC_SYMBOLS: /[-[\]{}()*+?`"<>%&.,\\/^$|#\s]/g,
  PHONE: /^[0-9\-\+]{9,15}$/,
  SMS_CODE: /^[0-9]{4}$/,
  RESOLUTION: /(^auto$)|(^\d{1,5}x\d{1,5}$)/,
  ZIP: /^[0-9]{5}(?:-[0-9]{4})?$/,
  URLID: /^[0-9]*$/g,
  URL: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
  REDIRECT_URL: /^(http|https):\/\/(\S+(:\S+)?@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  WEBLINK_URL: /^((http|https):\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[a-z0-9]*)?\/?([A-z0-9\-._?,'/\\+&amp;%$#=~])*$/i,
  FULL_NAME: /^\s*(^[A-Z]{1}[a-z]{1,}([\.,] |[-']| ))+[A-Z]{1}[a-z]*\.?\s*$/,
  DATE_FORMAT: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/, // date format MM/DD/YYYY
  DATE_FORMAT_REVERSED: /^([0-9]{4}[\/]?((0[13-9]|1[012])[\/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[\/]?31|02[\/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[\/]?02[\/]?29)$/m, // date format YYYY/MM/DD
  TIME_FORMAT: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  GMT_FORMAT: /^GMT[+-].*$/m,
  PATTERN: /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  MERCH_LINK: /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  MIME_TYPES_TO_BUFFERRIZE: /application\/octet-stream|image|zip|application\/vnd.apple.mpegurl\/*/,
  BSC_WALLET: /^0x[a-fA-F0-9]{40}$/,
  ARTIST_TWITTER_URL: /^https:\/\/(www\.)?twitter\.com\/[^/]{3,}\/?$/,
  ARTIST_FACEBOOK_URL: /^https:\/\/(www\.)?facebook\.com\/[^/]{3,}\/?$/,
  ARTIST_INSTAGRAM_URL: /^https:\/\/(www\.)?instagram\.com\/[^/]{3,}\/?$/,
  ARTIST_APPLE_MUSIC_URL: /^https?:\/\/music.apple.com\/([a-z]{2,3})?\/(artist)\/[a-zA-Z0-9]/,
  ARTIST_WEBSITE_URL: /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/,
  ARTIST_SPOTIFY_URL: /^https?:\/\/open.spotify.com\/(artist)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(artist):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|)/,
  UUIDv1: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  /**
   * (?=.*\d) - requires minimum 1 digit
   * (?=.*[a-z]) - requires minimum 1 lower case letter
   * (?=.*[A-Z]) - requires minimum 1 upper case letter
   * (?=.*[!@#$%^&*()_+{}:"<>?]) - requires minimum 1 special symbol: !@#$%^&*()_+{}:"<>?
   * [^\s]{15,31} - 16-32 length without spaces
   */
  ADMIN_PASSWORD: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:"<>?]).*).[^\s]{15,31}$/,
  TWITTER_NAME: /^(?:@)?[a-zA-Z0-9_]{0,15}$/,
  CURRENT_VERSIONS: /^[0-9]{1,2}(\.[0-9]{1,2})+$/,
});

module.exports = { REGULAR_EXPRESSIONS };
