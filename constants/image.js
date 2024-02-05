/* DESCRIPTION
      NESTED_FIELDS: ARRAY, OBJECT.STRING
      FIELDS: STRING
*/

const {
  config: {
    AWS: { BUCKETS },
  },
} = require('../config');

module.exports = {
  POSTER: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['name'],
  },
  BLOG: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['headerImage', 'topPageImage', 'originalHeaderImage', 'originalTopPageImage'],
  },
  CHANNEL: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: [
      'horizontalCover',
      'originalPreview',
      'preview',
      'previewDetailed',
      'icon',
      'verticalCover',
      'sliderTV',
      'originalSliderTV',
    ],
  },
  ARTIST: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: [
      'horizontalCover',
      'originalAvatar',
      'avatar',
      'icon',
      'originImage',
      'image',
      'facebookImage',
      'twitterImage',
      'originalSliderTV',
      'sliderTV',
      'verticalCover',
    ],
    NESTED_FIELDS: ['gallery'], // array
  },
  VIDEO: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: [
      'horizontalCover',
      'previewFirst',
      'previewSecond',
      'previewThird',
      'previewTransparent',
      'verticalCover',
      'squareCover',
      'originalDetailImage',
      'detailImage',
      'sliderTV',
      'originalPosterTV',
      'posterTV',
    ],
    NESTED_FIELDS: ['actor.icon', 'actor.avatar'],
  },
  LIVE: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: [
      'preview',
      'horizontalCover',
      'originalDetailImage',
      'detailImage',
      'sliderTV',
      'banner',
      'verticalCover',
    ],
    NESTED_FIELDS: ['actor.icon', 'actor.avatar'],
  },
  NEWS_LETTERS: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['headerImage', 'headerImageMobile', 'vrHeadsetImage1', 'vrHeadsetImage2'],
    NESTED_FIELDS: ['customBlog.image'],
  },
  USER: {
    BUCKET: BUCKETS.AVATARS,
    FIELDS: ['avatar', 'originalAvatar'],
  },
  BATCH: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['previewFirst', 'previewSecond', 'previewThird'],
  },
  STUDIO: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['icon', 'data.icon'],
  },
  META_TAG: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['image'],
  },
  MERCH: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['image', 'originalImage'],
  },
  BANNER: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['image', 'originalImage'],
  },
  CLOTHES: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['horizontalCover'],
  },
  BSC_PACKAGE: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['image', 'originalImage'],
  },
  PURCHASE_PACKAGE: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['image', 'originalImage'],
  },
  ROOM_SEGMENT: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['preview'],
    // NESTED_FIELDS: ['content.gallery[{image}]'],
  },
  PURCHASE: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['image'],
  },
  ROOM: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['horizontalCover', 'verticalCover', 'squareCover', 'segment.preview'],
  },
  ANIMATIONS: {
    BUCKET: BUCKETS.IMAGES,
    FIELDS: ['horizontalCover'],
  },
};
