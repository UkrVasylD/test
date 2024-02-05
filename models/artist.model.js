const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const CONSTANTS = require('../constants');

const schema = new Schema(
  {
    name: { type: String, default: '' },
    image: {
      type: String,
    },
    originImage: {
      type: String,
    },
    facebookImage: {
      type: String,
    },
    twitterImage: {
      type: String,
    },
    horizontalCover: {
      type: String,
    },
    verticalCover: {
      type: String,
    },
    sliderTV: {
      type: String,
    },
    originalSliderTV: {
      type: String,
    },
    originalAvatar: {
      type: String,
    },
    avatar: {
      type: String,
    },
    icon: {
      type: String,
    },
    genres: {
      type: [
        {
          type: ObjectId,
          ref: CONSTANTS.MODELS.GENRES,
        },
      ],
      default: [],
    },
    categories: {
      type: [
        {
          type: ObjectId,
          ref: CONSTANTS.MODELS.CATEGORIES,
        },
      ],
      default: [],
    },
    studios: {
      type: [
        {
          type: ObjectId,
          ref: CONSTANTS.MODELS.STUDIOS,
        },
      ],
      default: [],
    },
    allVideos: [
      {
        type: ObjectId,
        ref: CONSTANTS.MODELS.CONTENTS,
      },
    ],

    allVideosCount: {
      type: Number,
      default: 0,
    },

    allVideosOnlineCount: {
      type: Number,
      default: 0,
    },

    videos0: {
      mobile: {
        videos: [
          {
            type: ObjectId,
            ref: CONSTANTS.MODELS.CONTENTS,
          },
        ],
        likes: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        popularity: {
          type: Number,
          default: 0,
        },
        lastAdded: {
          type: Date,
          default: '',
        },
        duration: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
      tv: {
        videos: [
          {
            type: ObjectId,
            ref: CONSTANTS.MODELS.CONTENTS,
          },
        ],
        likes: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        popularity: {
          type: Number,
          default: 0,
        },
        lastAdded: {
          type: Date,
          default: '',
        },
        duration: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    },

    videos13: {
      mobile: {
        videos: [
          {
            type: ObjectId,
            ref: CONSTANTS.MODELS.CONTENTS,
          },
        ],
        likes: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        popularity: {
          type: Number,
          default: 0,
        },
        lastAdded: {
          type: Date,
          default: '',
        },
        duration: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
      tv: {
        videos: [
          {
            type: ObjectId,
            ref: CONSTANTS.MODELS.CONTENTS,
          },
        ],
        likes: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        popularity: {
          type: Number,
          default: 0,
        },
        lastAdded: {
          type: Date,
          default: '',
        },
        duration: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    },

    videos18: {
      mobile: {
        videos: [
          {
            type: ObjectId,
            ref: CONSTANTS.MODELS.CONTENTS,
          },
        ],
        likes: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        popularity: {
          type: Number,
          default: 0,
        },
        lastAdded: {
          type: Date,
          default: '',
        },
        duration: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
      tv: {
        videos: [
          {
            type: ObjectId,
            ref: CONSTANTS.MODELS.CONTENTS,
          },
        ],
        likes: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        popularity: {
          type: Number,
          default: 0,
        },
        lastAdded: {
          type: Date,
          default: '',
        },
        duration: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    },

    showDetailImage: {
      type: Boolean,
      default: true,
    },

    fbId: {
      type: String,
    },
    twitterId: {
      type: String,
    },

    instId: {
      type: String,
    },

    fbTotal: {
      type: Number,
    },

    insTotal: {
      type: Number,
    },

    twiTotal: {
      type: Number,
    },

    netTotal: {
      type: Number,
    },
    urlId: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    watchedCount: {
      type: Number,
      default: 0,
    },

    // watchedCount + non unique views
    views: {
      type: Number,
      default: 0,
    },

    // likesCount + watchedCount
    popularity: {
      type: Number,
      default: 0,
    },

    // likesCount + views
    totalPopularity: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    test: {
      type: Boolean,
      default: false,
    },

    featuredActive: {
      type: Boolean,
      default: false,
    },

    featuredPosition: {
      type: Number,
    },

    featuredHomeActive: {
      type: Boolean,
      default: false,
    },

    featuredHomePosition: {
      type: Number,
    },

    featuredTimeActive: {
      type: Boolean,
      default: false,
    },

    featuredTimePosition: {
      type: Number,
    },

    videoContentType: {
      shows: {
        type: Boolean,
        default: false,
      },
      video: {
        type: Boolean,
        default: false,
      },
    },

    displayImageFirst: {
      type: Boolean,
      default: true,
    },

    newLayout: {
      type: Boolean,
      default: false,
    },

    preview: {
      type: ObjectId,
      ref: CONSTANTS.MODELS.CONTENTS,
    },

    online: {
      type: Boolean,
      default: true,
    },

    fake: {
      type: Boolean,
      default: false,
    },

    creator: {
      id: {
        type: ObjectId,
        ref: CONSTANTS.MODELS.USERS,
        required: true,
      },
      fullName: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        required: true,
      },
    },

    editor: {
      id: {
        type: ObjectId,
        ref: CONSTANTS.MODELS.USERS,
        required: true,
      },
      fullName: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        required: true,
      },
    },

    linkedUser: {
      type: Object,
      default: null,
    },
    gallery: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    isTagsPublished: {
      type: Boolean,
      default: false,
    },
    biography: {
      value: {
        type: String,
        default: '',
      },
      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    discography: {
      value: {
        type: String,
        default: '',
      },
      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    facts: {
      value: {
        type: String,
        default: '',
      },
      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    country: {
      value: {
        type: String,
        default: '',
      },
      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    socialNetworks: {
      websiteURL: {
        type: String,
      },
      spotifyURL: {
        type: String,
        default: '',
      },
      appleMusicURL: {
        type: String,
        default: '',
      },
      fbURL: {
        type: String,
        default: '',
      },
      twitterURL: {
        type: String,
        default: '',
      },
      instURL: {
        type: String,
        default: '',
      },

      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    BSCWalletAddress: {
      type: String,
      default: '',
    },
    CEEKTokens: {
      type: Number,
      default: 0,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: CONSTANTS.MODELS.ARTISTS,
  }
);

module.exports = model(CONSTANTS.MODELS.ARTISTS, schema);
