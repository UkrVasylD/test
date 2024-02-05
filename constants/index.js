const roleSuperAdmin = 1;
const usedSuperAdminEmail = 'admin@admin.com';

module.exports = {
  DEFAULT_PAGE: 1,
  CMS_DEFAULT_ITEMS_AMOUNT: 25,
  CMS_DEFAULT_SORT: { createdAt: -1 },

  ALPHABETICAL_STRING: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',

  AWS_URL_LIFE_TIME: {
    FOR_AVATAR: 60 * 60 * 24,
    FOR_ANOUTHER: 60 * 60 * 4,
    FILE_DIDIMO: 86400, // 24 hours
    FOR_ANIMATIONS_AND_RIDES: 60 * 60 * 24, // 24 hours, maybe will be updated
  },

  SUBSCRIPTION_WITH_SKU_TYPE: {
    OCULUS_RIFT: 'oculus',
    GEAR_VR: 'gear_vr',
  },

  SKU_FOR_SUBSCRIPTION: {
    M: 'Sub_month',
    S: 'Sub_3_month',
    Y: 'Sub_year',
  },

  CURRENCY: {
    LIST: ['USD', 'GHS', 'EUR', 'GBP'],
    USD: 'USD',
    GHS: 'GHS',
  },

  PURCHASE_TARGETS: {
    PURCHASE_PACKAGE: 'PURCHASE_PACKAGE',
    SUBSCRIPTION: 'SUBSCRIPTION',
    BSC_TOKEN: 'BSC_TOKEN',
    CONTENT: 'CONTENT',
    CHANNEL: 'CHANNEL',
    DONATION: 'DONATION',
    CLOTHES: 'CLOTHES',
    ANIMATIONS: 'ANIMATIONS',
    RIDES: 'RIDES',
    LIVE: 'LIVE',
    ROOM: 'ROOM',
    ARTIST_DONATION: 'STAR_DONATION',
    USER_DONATION: 'STAR_DONATION',
    ASK_ME_ANYTHING: 'ASK_ME_ANYTHING',
    NFT_TOKEN: 'NFT_TOKEN',
  },

  PURCHASE_TYPE_LABELS: {
    BSC_TOKEN: 'CEEK',
    CONTENT: 'Content',
    CHANNEL: 'Channel',
    SUBSCRIPTION: 'Subscription',
    PURCHASE_PACKAGE: 'Purchase Package',
    DONATION: 'Donation',
    STAR_DONATION: 'Reward',
    CLOTHES: 'Clothes',
    ROOM: 'Room',
    ANIMATIONS: 'Animations',
    RIDES: 'Rides',
    ASK_ME_ANYTHING: 'Ask Me Anything',
    NFT_TOKEN: 'Nft Token',
  },

  NFT_TYPES: {
    Collectables: ['VideoFile', 'AudioFile', 'ImageFile', 'AnimationFile'],
    Event: 'Event',
    Properties: 'Properties',
    Ticket: ['ClothesTicket', 'RoomTicket', 'VideoTicket'],
    Wearables: 'Wearables',
    Rides: 'Rides', // ????
    Land: 'Land',
    Speed: 'Speed',
  },

  PAYMENT_SYSTEMS: {
    AIRDROP: 'Airdrop',
    AIRTEL: 'Airtel',
    STRIPE: 'Stripe',
    PAYPAL: 'PayPal',
    MOMOPAY: 'MomoPay',
    GOOGLE: 'PlayStore',
    APPLE: 'AppleStore',
    PAYSTACK: 'PayStack',
    BSC_TOKEN: 'BSC_Token',
  },

  PAYMENT_SYSTEMS_FOR_SUBSCRIPTION: {
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    ALL: 'all',
  },

  PAYMENT_SYSTEMS_LIST: [
    'Airdrop',
    'Airtel',
    'Stripe',
    'PayPal',
    'MomoPay',
    'PlayStore',
    'AppleStore',
    'PayStack',
    'BSC_Token',
  ],

  PURCHASE_STATUSES: {
    PENDING: 'Pending',
    SUCCESSFUl: 'Successful',
    FAILED: 'Failed',
  },

  ARTIST_DONATION_CODES: {
    NO_TOKENS: 0,
    SUCCESS: 1,
    PENDING: 2,
  },

  USER_DONATION_CODES: {
    NO_TOKENS: 0,
    SUCCESS: 1,
    PENDING: 2,
  },

  CONTENT_IMAGE_FIELDS: [
    'preview',
    'detailImage',
    'verticalCover',
    'horizontalCover',
    'squareCover',
    'previewTransparent',
    'previewFirst',
    'previewSecond',
    'previewThird',
    'posterTV',
    'icon',
    'sliderTV',
  ],

  ALLOWED_PREVIEWS: [
    'verticalCover',
    'horizontalCover',
    'squareCover',
    'previewTransparent',
    'previewFirst',
    'previewSecond',
    'previewThird',
    'posterTV',
    'icon',
    'sliderTV',
  ],

  ALLOWED_IMAGE_VIDEO: ['verticalCover', 'horizontalCover', 'posterTV', 'sliderTV'],
  ALLOWED_IMAGE_ARTIST: ['icon', 'avatar'],
  ALLOWED_IMAGE_LIVE: ['verticalCover', 'horizontalCover', 'posterTV', 'preview', 'sliderTV'],
  ALLOWED_VIDEOS: ['name', 'trailerName'],
  PREVIEWS_FORMAT: {
    previewTransparent: 'png',
    previewFirst: 'png',
    previewSecond: 'png',
    previewThird: 'png',
    posterTV: 'jpg',
  },
  RESOLUTION: ['1280x720', '1920x1080', '4096x2160'],
  ASPECT_RATIO: ['1:1', '4:3', '3:2', '16:9'],
  IMAGES_RESOLUTION: {
    verticalCover: '480*854',
    horizontalCover: '854*480',
    squareCover: '480*480',
    posterTV: '480*270',
  },
  IMAGES_TYPES_FOR_TV: {
    verticalCover: 'poster',
    horizontalCover: 'marquee',
    squareCover: 'square',
    previewTransparent: 'transparentPreview',
    previewFirst: 'firstPreview',
    previewSecond: 'secondPreview',
    previewThird: 'thirdPreview',
    posterTV: 'tvPoster',
    sliderTV: 'sliderTV',
  },
  CONTENT_TO_UPLOAD: [
    'video',
    'verticalCover',
    'horizontalCover',
    'squareCover',
    'previewTransparent',
    'previewFirst',
    'previewSecond',
    'previewThird',
  ],
  COINS_AMOUNT: {
    'one.ceek.pts': 1,
    'five.ceek.pts': 5,
    'ten.ceek.pts': 10,
    'thirty.ceek.pts': 30,
    'hundred.ceek.pts': 100,
    'monthly.ceek.subscription': 'M',
    'yearly.ceek.subscription': 'Y',
  },
  SUBSCRIPTION_WITH: {
    'ten.ceek.pts': 'M',
    'thirty.ceek.pts': 'S',
    'hundred.ceek.pts': 'Y',
  },
  ADMIN_EMAIL: 'admin@admin.com',
  ADMIN_PASSWORD: 'Pass2017!',

  USED_ADMIN_EMAIL: usedSuperAdminEmail,
  ADMIN_CRITERIA: {
    role: roleSuperAdmin,
    email: usedSuperAdminEmail,
  },

  VIDEO_STATUSES: {
    CREATED: 'Created',
    DECODING: 'Decoding',
    COMPLETED: 'Completed',
    ERROR: 'Error',
  },

  VIDEO_TYPES: [
    '2D' /* '3D', 'VR3D', */,
    'Mono 180',
    'Mono 360',
    'Stereo 3D Vertical',
    'Stereo 3D Horizontal',
    'Stereo 3D 180 Vertical',
    'Stereo 3D 180 Horizontal',
    'Stereo 3D 360 Vertical',
    'Stereo 3D 360 Horizontal',
  ],
  VIDEO_TYPES_BACKEND: [
    '2D',
    '180',
    '360',
    'StFlatVer',
    'StFlatHor',
    'StHalfSpherVer',
    'StHalfSpherHor',
    'StSpherVer',
    'StSpherHor',
  ],
  GENDER: {
    MALE: 'male',
    FEMALE: 'female',
    NONE: 'none',
    LIST: ['male', 'female'],
  },
  ROOM_TYPES: {
    HALL: {
      title: 'HALL',
      maxSlotsCount: 28,
      maxTopCount: 8,
      maxBottomCount: 0,
      maxRightCount: 10,
      maxLeftCount: 10,
      maxTopRooms: 0,
      maxBottomRooms: 0,
      maxRightRooms: 0,
      maxLeftRooms: 0,
    },
    ARENA: {
      title: 'ARENA',
    },
    THEATER: {
      title: 'THEATER',
      maxSlotsCount: 34,
      maxTopCount: 30,
      maxBottomCount: 0,
      maxRightCount: 30,
      maxLeftCount: 30,
      maxTopRooms: 0,
      maxBottomRooms: 0,
      maxRightRooms: 0,
      maxLeftRooms: 0,
    },
  },
  SORT_TYPES: {
    CEEK_PICKS_ALL: 'CeekPicksAll',
    CEEK_PICKS: 'CeekPicks',
    POPULAR: 'Popular',
    RECENTLY_ADDED: 'Recently Added',
    TRENDING: 'Trending',
  },
  CONTENT_TYPES: {
    ALL: 'All',
    VIDEO: 'Video',
    POSTER: 'Poster',
    AVATARS: 'Avatar',
    ROOM: 'Room',
    CHANNEL: 'Channel',
    CONTENT: 'Content',
    LIVETVVIDEO: 'LiveTVVideo',
    VIDEOFORTV: 'VideoForTV',
    VIDEOORLIVE: /Video|LiveTVVideo/,
  },
  CLOTHES_TYPE: {
    MAN: 'man',
    WOMAN: 'woman',
    BOY: 'boy',
    GIRL: 'girl',
  },
  CLOTHES_COLOR: {
    BLACK: 'Black',
    WHITE: 'White',
  },
  CONTENT_FOR_TV: {
    LIST: ['withLive', 'withoutLive', 'liveVideo', 'suggestions'],
    ALL: 'withLive',
    VIDEO: 'withoutLive',
    LIVE: 'liveVideo',
    SUGGESTIONS: 'suggestions',
    WATCHED_BY_USER: 'watched',
  },
  CONTENT_TYPES_FOR_ROOMS: {
    VIDEO: 'Video',
    POSTER: 'Poster',
    ROOM: 'Room',
    LIVETVVIDEO: 'LiveTVVideo',
  },
  /**
   * @name CHANNEL_TYPES
   * @readonly
   * @enum {String}
   * @property {String} CHANNEL
   * @property {String} SERIES
   */
  CHANNEL_TYPES: {
    CHANNEL: 'CHANNEL',
    SERIES: 'SERIES',
  },
  DEFAULT_ORDER: {
    PICKS: 'Ceek Picks',
    POPULAR: 'Popular',
    RECENTLY_ADDED: 'Recently Added',
    TRENDING: 'Trending',
  },
  MERCH_TYPE: {
    LIST: ['Merch', 'Sponsor', 'Donation'],
    MERCH: 2,
    DONATION: 1,
    SPONSOR: 0,
  },
  ROLES: {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    ARTIST: 3,
    CART_USER: 10,
    VR_USER: 11,
  },
  PROMO_CODES_TYPES: {
    AFFILIATE: 'Affiliate',
    ONETIME: 'One Time',
  },
  PROMO_CODES_CREATED_TYPES: {
    MANUAL: 'Manual',
    CSV: 'CSV',
  },

  NEWS_LETTERS: {
    DISCOUNT_TYPE: {
      LIST: ['Always', 'Never', 'Only mobile', 'Only desktop'],
      ALWAYS: 'Always',
      NEVER: 'Never',
      ONLY_MOBILE: 'Only mobile',
      ONLY_DESKTOP: 'Only desktop',
    },
    TYPE: {
      LIST: ['default', 'landlot'],
      DEFAULT: 'default',
      LAND_LOT: 'landlot',
    },
    CONTENT_TYPE: {
      ALL: ['description', 'list'],
      DESCRIPTION: 'description',
      LIST: 'list',
    },
  },

  MODELS: {
    NFT: 'NFT',
    CHATS: 'chats',
    USERS: 'Users',
    ROOMS: 'Rooms',
    EMAILS: 'Emails',
    GENRES: 'Genres',
    MERCHS: 'Merchs',
    POSTER: 'Poster',
    BATCHES: 'Batches',
    REPORTS: 'Reports',
    ARTISTS: 'Artists',
    STUDIOS: 'Studios',
    MODULES: 'Modules',
    SEARCH: 'Search',
    BANNERS: 'Banners',
    COUNTRIES: 'Countries',
    CONTENTS: 'Contents',
    CHANNELS: 'Channels',
    META_TAGS: 'MetaTags',
    REDIRECTS: 'Redirects',
    LANGUAGES: 'Languages',
    CATEGORIES: 'Categories',
    PURCHASES: 'Purchases',
    NFT_BANNERS: 'NFTBanners',
    PROMO_CODES: 'PromoCodes',
    HELP_VIDEOS: 'HelpVideos',
    NFT_HISTORY: 'NFTHistory',
    SUBSCRIBERS: 'Subscribers',
    PERMISSIONS: 'Permissions',
    MARKETPLACE: 'Marketplace',
    BSC_PACKAGES: 'bscPackage',
    INTERNAL_NFT: 'InternalNFT',
    ROOM_SEGMENTS: 'RoomSegments',
    NEWS_LETTERS: 'NewsLetters',
    NOTIFICATIONS: 'notifications',
    USERS_NOTIFICATION: 'usersNotification',
    SUBSCRIPTIONS: 'Subscriptions',
    USER_PLAYLIST: 'Users_Playlist',
    PROGRAM_REMINDS: 'programreminds',
    NFT_COLLECTIONS: 'NFTCollections',
    NFT_ABILITIES: 'NFTAbilities',
    ACCESS_PROFILE: 'AccessProfile',
    USER_PREFERENCES: 'Users_Preferences',
    PURCHASE_PACKAGES: 'PurchasePackages',
    USER_BILLING_INFO: 'Users_Billing_Info',
    SUBSCRIPTION_TYPES: 'SubscriptionTypes',
    USER_SHIPPING_INFO: 'Users_Shipping_Info',
    EMAIL_DISTRIBUTION: 'EmailDistribution',
    MULTI_STREAMS: 'multistreams',
    BLOGS: 'Blogs',
    CONTENT_POSITION: 'ContentPosition',
    FILES: 'Files',
    CLOTHES: 'Clothes',
    STATIC_PRICES: 'staticprices',
    LIKES: 'Likes',
    VIEWS: 'Views',
    RIDES: 'Rides',
    FRIENDS: 'Friends',
    SETTINGS: 'settings',
    ANIMATIONS: 'Animations',
    ANALYTICS: 'Analytics',
    CLOTHES_SETTINGS: 'ClothesSettings',
    AIRDROPS: 'Airdrops',
    FEED: 'Feed',
    BUNDLES: 'Bundles',
    FEED_PAGES: 'FeedPages',
  },
  PAYMENT_TYPE: {
    PROMO_CODE: 'Promo Code',
    MARKET: 'From Market',
  },
  COURSE_TYPE: {
    LEARN: 'Learn',
    RESCUE: 'Rescue',
  },
  SUBSCRIPTION_TITLE: {
    MONTH: 'Month',
    SEASON: 'Season',
    YEAR: 'Year',
  },
  SUBSCRIPTION_TYPE: {
    MONTH: 'M',
    SEASON: 'S',
    YEAR: 'Y',
  },
  SUBSCRIPTION_TYPE_LIST: ['M', 'S', 'Y'],
  SUBSCRIPTION_CONTENT_TYPE: {
    LIST: ['Subscription', 'Channel'],
    SUBSCRIPTION: 'Subscription',
    CHANNEL: 'Channel',
  },
  SUBSCRIPTION_COINS: {
    MONTH: 10,
    SEASON: 30,
    YEAR: 150,
  },
  VALIDATION_TV_PAGES: {
    HOME: 'HOME',
    LIVE: 'LIVE',
    DISCOVER: 'DISCOVER',
    CHANNELS: 'CHANNELS',
    ARTISTS: 'ARTISTS',
    MYLIST: 'MYLIST',
    PROGRAM: 'PROGRAM',
    PLAYER: 'PLAYER',
  },
  PROMOTION: {
    MAX: 20,
    MIN: 2,
  },
  REG_EXP: {
    MATCH_REQUEST_ROUTE: /^\/(\w*)/,
  },
  MODULE_ACTIONS: {
    READ: 'read',
    WRITE: 'write',
    DELETE: 'delete',
  },
  PRESET_ID: '1351620000001-000010', // 720 hd
  PRESET_ID_1080P: '1351620000001-000001',
  IMAGE_CONTENT_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  API_MOBILE_VERSION: 2,
  ALL_SPACE: '∞',
  PROMO_CODES_COINS: 10,
  DEVICES: {
    MOBILE: 'mobile',
    T: 't',
  },

  REFRESH_TOKEN_DURATION: 60 * 60 * 24 * 7, // one week
  TOKEN_DURATION: 60 * 60 * 24, // one day
  ADMIN_INVITATION_DURATION: 60 * 60, // one hour

  METHODS: {
    BODY_TYPED_ARRAY: ['POST', 'PUT', 'PATCH', 'DELETE'],
    QUERY_TYPED: 'GET',
  },
  USER_PREFERENCE_WEIGHT: {
    ARTISTS: 0.8,
    CATEGORIES: 0.4,
    GENRES: 0.2,
    TAGS: 0.1,
  },

  TYPE_OF_HELP_VIDEOS: {
    INSTRUCTIONS: 'INSTRUCTIONS',
    HELP: 'HELP',
    GEAR_INSTRUCTIONS: 'GEAR_INSTRUCTIONS',
  },

  GAME_SKU: {
    TYPES: {
      BUY_5_POINTS: 'five.ceek',
      BUY_10_POINTS: 'ten.ceek',
      BUY_30_POINTS: 'thirty.ceek',
      BUY_100_POINTS: 'hundred.ceek',
    },

    COINS: {
      'five.ceek': 5,
      'ten.ceek': 10,
      'thirty.ceek': 30,
      'hundred.ceek': 100,
    },
  },

  HTC_SKU: {
    ADD_TOKENS: 'five.ceek',
    SUBSCRIBE_1_MONTH: 'ten.ceek',
    SUBSCRIBE_3_MONTH: 'thirty.ceek',
    SUBSCRIBE_12_MONTH: 'hundred.ceek',
    LIST: ['five.ceek', 'ten.ceek', 'thirty.ceek', 'hundred.ceek'],
  },

  SITE_CONTENT_SORTED_FIELDS: ['createdAt', 'title'],

  CATEGORIES_SORTED_FIELDS: ['createdAt', 'name'],

  ALL_USERS_SORTED_FIELDS: ['userName', 'role', 'email', 'createdAt'],

  DEVICES_SOURCE: {
    LIST: ['site', 'ios', 'android', 'oculus', 'htc'],
    SITE: 'site',
    IOS: 'ios',
    ANDROID: 'android',
    OCULUS: 'oculus',
    HTC: 'htc',
    NFT: 'nft',
  },

  SOURCES: [
    'ceek',
    'voting',
    'land',
    'nftmarketplace',
    'ios',
    'android',
    'ceekio',
    'oculus',
    'htc',
    'gear',
    'vive',
  ],

  SOURCES_TYPE: {
    LIST: [
      'ceek',
      'voting',
      'land',
      'nftmarketplace',
      'ios',
      'android',
      'ceekio',
      'oculus',
      'htc',
      'gear',
      'vive',
    ],
    CEEK: 'ceek',
    VOTING: 'voting',
    LAND: 'land',
    NFT_MARKETPLACE: 'nftmarketplace',
    IOS: 'ios',
    ANDROID: 'android',
    CEEK_IO: 'ceekio',
    OCULUS: 'oculus',
    HTC: 'htc',
    GEAR: 'gear',
    VIVE: 'vive',
  },

  DEVICE_TYPES: {
    TV: 'tv',
    MOBILE: 'mobile',
    OCULUS: 'oculus',
  },

  DEVICE_ASSETS: {
    GAME: {
      IOS: 'ios',
      ANDROID: 'android',
      LIST: ['ios', 'android'],
    },
    MOBILE: {
      IOS: 'ios',
      ANDROID: 'android',
      OCULUS_GEAR_VR: 'oculusgearvr',
      OCULUS_RIFT: 'oculusrift',
      VIVE_WINDOWS: 'viveWindows',
      OCULUS_WINDOWS: 'oculusWindows',
      LIST: ['ios', 'android', 'oculusgearvr', 'oculusrift', 'viveWindows', 'oculusWindows'],
    },
  },
  PURCHASE_AMOUNT: {
    1: 9.99, // one month
    3: 24.99, // three months
    12: 69.99, // one year
  },
  STRIPE_PURCHASE: {
    499: {
      COINS: 5,
      SUBSCRIPTION: null,
    },

    999: {
      COINS: 100,
      SUBSCRIPTION: 'M',
    },

    2499: {
      COINS: 300,
      SUBSCRIPTION: 'S',
    },

    6999: {
      COINS: 1500,
      SUBSCRIPTION: 'Y',
    },

    9999: {
      COINS: 1500,
      SUBSCRIPTION: 'Y',
    },

    10000: {
      COINS: 1500,
      SUBSCRIPTION: 'Y',
    },
  },
  PAYPAL_PURCHASE: {
    499: {
      COINS: 5,
      SUBSCRIPTION: null,
    },

    999: {
      COINS: 100,
      SUBSCRIPTION: 'M',
    },

    2499: {
      COINS: 300,
      SUBSCRIPTION: 'S',
    },

    6999: {
      COINS: 1500,
      SUBSCRIPTION: 'Y',
    },

    9999: {
      COINS: 1500,
      SUBSCRIPTION: 'Y',
    },

    10000: {
      COINS: 1500,
      SUBSCRIPTION: 'Y',
    },
  },

  BILLING_INFO_VALIDATION: {
    COUNTRIES: [
      'Australia',
      'Austria',
      'Belgium',
      'Brazil',
      'Bulgaria',
      'Canada',
      'Croatia',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Estonia',
      'Finland',
      'France',
      'Germany',
      'Gibraltar',
      'Greece',
      'Hong Kong',
      'Hungary',
      'India',
      'Ireland',
      'Italy',
      'Japan',
      'Latvia',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Malaysia',
      'Malta',
      'Mexico',
      'Netherlands',
      'New Zealand',
      'Norway',
      'Poland',
      'Portugal',
      'Romania',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Spain',
      'Sweden',
      'Switzerland',
      'Thailand',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
    ],
  },
  MONTHS_IN_SUBSCRIPTIONS: {
    M: 1,
    S: 3,
    Y: 12,
  },
  SUBSCRIPTION_TYPE_BY_MONTH: {
    1: 'M',
    3: 'S',
    12: 'Y',
  },
  WEBHOOKS: {
    VIVE_PORT: 'VivePort',
  },

  AWS_TO_AZURE: {
    STATUS: {
      PROCESSING: 0,
      COMPLETED: 1,
      ERROR: 2,
    },
  },

  CONTENT_TRANSFORM: {
    STATUS: {
      PROCESSING: 0,
      COMPLETED: 1,
      ERROR: 2,
    },
  },

  TRANSFORM: {
    STATUS: {
      PROCESSING: 0,
      COMPLETED: 1,
      ERROR: 2,
    },
  },

  WEEK_IN_MS: 1000 * 60 * 60 * 24 * 7,
  DAYIN_MS: 60 * 60 * 24 * 1000,
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
  FIVE_MINUTES: 1000 * 60 * 5,
  FIFTEEN_MINUTES: 1000 * 60 * 15,
  AUTH_LIFE_TIME: 60 * 60 * 24,
  ONE_DAY: 60 * 60 * 24,

  MERCH: { WIDTH: 160, HEIGHT: 160 },
  AVATAR: { WIDTH: 854, HEIGHT: 480 },
  PREVIEW: { WIDTH: 480, HEIGHT: 270 },
  CHANNEL_ICON: { WIDTH: 300, HEIGHT: 300 },
  ARTIST_ICON: { WIDTH: 100, HEIGHT: 100 },
  HORIZONTAL_COVER: { WIDTH: 854, HEIGHT: 480 },
  VERTICAL_COVER: { WIDTH: 480, HEIGHT: 854 },
  CACHE_TIME: 3600,

  META_TAGS_TYPE: {
    IMAGE: 'Image',
  },
  CHAT_TYPES: {
    SHOWN: 'Shown',
    ALL: 'All',
    HIDDEN: 'Hidden',
  },
  SEGMENT: {
    TYPE: { GALLERY: 'Gallery', CONTENT: 'Content' },
    DEFAULT: { PREVIEW: 'img/logo.png' },
  },
  // PAYPAL
  PAYPAL: {
    PRODUCT_CATEGORY: 'ENTERTAINMENT_AND_MEDIA',
    CYCLE_TYPE: 'INFINITE',
    PRODUCT_TYPE: 'SERVICE',
    PLAN_STATUSES: {
      CREATED: 'CREATED',
      ACTIVE: 'ACTIVE',
      INACTIVE: 'INACTIVE',
      ALL: 'ALL',
    },
    TENURE_TYPES: {
      REGULAR: 'REGULAR',
      TRIAL: 'TRIAL',
    },
  },

  PLAN_TYPE: {
    LIST: ['Y', 'M', 'S'],
    Y: {
      TYPE: 'Y',
      FREQUENCY: 'YEAR',
      INTERVAL: 1,
    },
    M: {
      TYPE: 'M',
      FREQUENCY: 'MONTH',
      INTERVAL: 1,
    },
    S: {
      TYPE: 'S',
      FREQUENCY: 'MONTH',
      INTERVAL: 3,
    },
  },

  PLAN_TYPE_IN_MONTH: {
    1: 'MONTH',
    3: 'SEASON',
    12: 'YEAR',
  },

  CONTENT_BUY_TYPE: {
    CHANNEL_SUBSCRIPTION: 'ChannelSubscription',
    CHANNEL_BUY: 'ChannelBuy',
    CONTENT_BUY: 'ContentBuy',
  },

  NOTIFICATION_TYPE: {
    LIST: ['Video', 'LiveTVVideo', 'Blog', 'Reply', 'DirectMessage'],
    VIDEO: 'Video',
    LIVE_STREAM: 'LiveTVVideo',
    BLOG: 'Blog',
    REPLY: 'Reply',
    DIRECT_MESSAGE: 'DirectMessage',
  },
  ID_PATTERN: '123456789abcdefghijklmnopqrstuvwxyz',

  EXTENDABLE_WALLET_TYPES: {
    1: 'Metamask',
    3: 'OKX',
  },

  EXTERNAL_WALLETS: {
    METAMASK: 'MetaMask',
  },

  PROFILE_TYPES: {
    FRIENDS: 'friends',
    PUBLIC: 'public',
    PRIVATE: 'private',
  },

  FRIENDS_API: {
    ACTIONS: {
      CANCEL: 'cancel',
      ACCEPT: 'accept',
      BLOCK: 'block',
    },
    // getAll list options
    ALL: 'all',
    ONLY_FRIENDS: 'onlyFriends',

    // unspecified users list options
    USER_FRIENDS: {
      BLOCKED: 'blocked',
      BLOCKED_ME: 'blockedMe',
      INVITED: 'invited',
      INVITES: 'invites',
    },

    CANCEL: 'cancel',
    SEND: 'send',
  },
  DEFAULT_VIEWS_ID: 'defaultViewsId',

  MY_LIST_TYPE: {
    LIST: ['favorites', 'watched', 'recommended', 'artists', 'channels', 'posts'],
    FAVORITES: 'favorites',
    WATCHED: 'watched',
    RECOMMENDED: 'recommended',
    ARTISTS: 'artists',
    CHANNELS: 'channels',
    POSTS: 'posts',
    EVENTS: 'events',
  },
  SENSITIVE_DATA_KEYS: [
    'parentId',
    'moduleId',
    'promoCode',
    'password',
    'oldPassword',
    'newPassword',
    'token',
  ],
  TYPE_ACCESS: {
    LIST: [
      'FREE',
      'FIXED_PRICE',
      'VIP_ACCESS',
      'NFT_TICKET',
      'FIXED_PRICE_OR_NFT_TICKET',
      'PAY_PER_ACCESS',
      'INTERNAL_WALLET',
      'EXTERNAL_WALLET',
      'APE_LP',
    ],
    FREE: 'FREE',
    FIXED_PRICE: 'FIXED_PRICE',
    VIP_ACCESS: 'VIP_ACCESS',
    NFT_TICKET: 'NFT_TICKET',
    FIXED_PRICE_OR_NFT: 'FIXED_PRICE_OR_NFT_TICKET',
    PAY_PER_ACCESS: 'PAY_PER_ACCESS',
    INTERNAL_WALLET: 'INTERNAL_WALLET',
    EXTERNAL_WALLET: 'EXTERNAL_WALLET',
    APE_LP: 'APE_LP',
  },
  DIDIMO_TYPE: {
    FILE: 'file',
    FRONT_PNG: 'front_png',
    FONT_PNG: 'font_png', // deprecated
  },
  RIDES_ANIMATIONS_TYPE: {
    MAN: 'man',
    WOMAN: 'woman',
    BOY: 'boy',
    GIRL: 'girl',
  },
  CLOTHES_SETTINGS_TYPE: ['color', 'style', 'category'],
  ROOM_BANNED_TYPES: {
    ONE_HOUR: 'one_hour',
    ONE_DAY: 'one_day',
    ONE_WEEK: 'one_week',
    FOREVER: 'forever',
  },
  NFT_CONTRACT_TYPES: {
    PROPERTIES: 'PROPERTIES',
    WEARABLES: 'WEARABLES',
  },
  OWNABLE_ENTITIES: {
    LIVES: 'lives',
    CLOTHES: 'clothes',
  },
  DEFAULT_PLAYLIST_NAME: 'My playlist',
  FEED_EVENT: {
    CREATED: 'Created',
    EDITED: 'Edited',
    DELETED: 'Deleted',
  },
  RESERVED_PARAMS: ['userId', 'uAgeParam', 'userAge', 'isTV', 'isMobile', 'uId'],
  CEEK_TECHNOLOGIES: {
    PHP: 'php',
    NUXT: 'nuxt',
  },
};
