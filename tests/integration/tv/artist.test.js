/* eslint-disable padding-line-between-statements */
const uuid = require('uuid');

const CONSTANTS = require('../../../constants');

const request = require('../../utils/request');
const { Fixture } = require('../../fixtures');

describe('All Tests Artists TV', () => {
  describe('GET -> tv/artist/view/:uId ( update view, why GET? this is how it happened historically)', () => {
    it('GET -> tv/artist/view/:uId : unauthorized user, update views, totalPopularity', async () => {
      const { _id: contentId } = await Fixture.createTestContent({
        onlineVideoTV: true,
        status: CONSTANTS.VIDEO_STATUSES.COMPLETED,
      });

      const urlId = uuid.v4();

      const views = 10;
      const totalPopularity = 10;

      await Fixture.createTestArtist({
        online: true,
        video: [contentId],
        urlId,
        views,
        totalPopularity,
      });

      const response = await request.get({
        path: `/tv/artist/view/${urlId}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      const updateArtist = await Fixture.artistProvider.getSingle({ urlId });

      expect(updateArtist.views).toEqual(views + 1);

      expect(updateArtist.totalPopularity).toEqual(totalPopularity + 1);
    });

    it('GET -> tv/artist/view/:uId : authorized user, update view unique watched', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();

      await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
      });

      const responseUser = await request.post({
        path: '/tv/signIn',
        data: {
          email,
          password,
          userName,
        },
      });

      expect(responseUser.data.error).toBeUndefined();

      const { _id: contentId } = await Fixture.createTestContent({
        onlineVideoTV: true,
        status: CONSTANTS.VIDEO_STATUSES.COMPLETED,
      });

      const urlId = uuid.v4();

      const views = 10;
      const totalPopularity = 10;
      const watchedCount = 10;
      const popularity = 10;

      await Fixture.createTestArtist({
        online: true,
        video: [contentId],
        urlId,
        views,
        totalPopularity,
        popularity,
        watchedCount,
      });

      const response = await request.get({
        path: `/tv/artist/view/${urlId}`,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);

      const updateArtist = await Fixture.artistProvider.getSingle({ urlId });

      expect(updateArtist).toMatchObject({
        views: views + 1,
        totalPopularity: totalPopularity + 1,
        watchedCount: watchedCount + 1,
        popularity: popularity + 1,
      });
    });

    // it('GET -> tv/artist/view/:uId : authorized user, user watched - check ignore the unique view', async () => {
    //   const email = `test${uuid.v1()}@gmail.com`;
    //   const password = 'testPassword';
    //   const userName = uuid.v4();

    //   const { _id: userId } = await Fixture.createTestUser({
    //     email,
    //     password,
    //     userName,
    //     accessToken: null,
    //   });

    //   const responseUser = await request.post({
    //     path: '/tv/signIn',
    //     data: {
    //       email,
    //       password,
    //       userName,
    //     },
    //   });

    //   expect(responseUser.data.error).toBeUndefined();

    //   const { _id: contentId } = await Fixture.createTestContent({
    //     onlineVideoTV: true,
    //     status: CONSTANTS.VIDEO_STATUSES.COMPLETED,
    //   });

    //   const urlId = uuid.v4();

    //   const views = 10;
    //   const totalPopularity = 10;

    //   const watchedCount = 10;
    //   const popularity = 10;

    //   const artist = await Fixture.createTestArtist({
    //     online: true,
    //     video: [contentId],
    //     urlId,
    //     views,
    //     totalPopularity,
    //     popularity,
    //     watchedCount,
    //   });

    //   await Fixture.createTestView({
    //     userId,
    //     entityId: artist._id,
    //     entity: CONSTANTS.MODELS.ARTISTS,
    //     totalViews: 1,
    //     videoViews: 1,
    //     datesViewed: [{ viewsCount: 1, date: new Date(), isPreview: false }],
    //   });

    //   const response = await request.get({
    //     path: `/tv/artist/view/${urlId}`,
    //     token: responseUser.data.token,
    //   });

    //   expect(response.status).toBe(200);

    //   const test = await Fixture.viewsProvider.getSingle({
    //     userId,
    //     entityId: artist._id,
    //     entity: CONSTANTS.MODELS.ARTISTS,
    //   });

    //   console.log(test);

    //   const updateArtist = await Fixture.artistProvider.getSingle({ urlId });

    //   expect(updateArtist.views).toEqual(views + 2);
    //   expect(updateArtist.totalPopularity).toEqual(totalPopularity + 1);

    //   // if user watched, unchanged watchedCount, popularity, watched
    //   expect(updateArtist.watchedCount).toEqual(watchedCount);
    //   expect(updateArtist.popularity).toEqual(popularity);
    // });

    it('GET -> tv/artist/view/:uId : bad urlId', async () => {
      const urlId = 'badUid';

      const response = await request.get({
        path: `/tv/artist/view/${urlId}`,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('Artist not found!');
    });
  });

  describe('GET -> tv/artist/like-artist/:urlId', () => {
    it('GET -> tv/artist/like-artist/:urlId : authorized user, add like', async () => {
      // Arrange
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();

      await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
      });

      const responseUser = await request.post({
        path: '/tv/signIn',
        data: {
          email,
          password,
          userName,
        },
      });

      expect(responseUser.data.error).toBeUndefined();

      const { _id: contentId } = await Fixture.createTestContent({
        onlineVideoTV: true,
        status: CONSTANTS.VIDEO_STATUSES.COMPLETED,
      });

      const urlId = uuid.v4();

      const views = 10;
      const likesCount = 10;
      const watchedCount = 10;
      const popularity = watchedCount + likesCount;
      const totalPopularity = views + likesCount;

      await Fixture.createTestArtist({
        online: true,
        video: [contentId],
        urlId,
        totalPopularity,
        likesCount,
        watchedCount,
        popularity,
        views,
      });

      // Act
      const response = await request.get({
        path: `/tv/artist/like-artist/${urlId}`,
        token: responseUser.data.token,
      });

      // Assert
      expect(response.status).toBe(200);

      const updateArtist = await Fixture.artistProvider.getSingle({ urlId });

      expect(updateArtist).toMatchObject({
        likesCount: likesCount + 1,
        popularity: popularity + 1,
        totalPopularity: totalPopularity + 1,
      });

      // check favoriteArtist
      // const updateUser = await Fixture.userProvider.getSingleById(responseUser.data._id);

      // expect(updateUser.favoriteArtists).toEqual([updateArtist._id]);
    });

    // it('GET -> tv/artist/like-artist/:urlId : authorized user, dislike', async () => {
    //   // Arrange
    //   const email = `test${uuid.v1()}@gmail.com`;
    //   const password = 'testPassword';
    //   const userName = uuid.v4();

    //   const { _id: userId } = await Fixture.createTestUser({
    //     email,
    //     password,
    //     userName,
    //     accessToken: null,
    //   });

    //   const responseUser = await request.post({
    //     path: '/tv/signIn',
    //     data: {
    //       email,
    //       password,
    //       userName,
    //     },
    //   });

    //   expect(responseUser.data.error).toBeUndefined();

    //   const { _id: contentId } = await Fixture.createTestContent({
    //     onlineVideoTV: true,
    //     status: CONSTANTS.VIDEO_STATUSES.COMPLETED,
    //   });

    //   const urlId = uuid.v4();

    //   const views = 10;
    //   const likesCount = 10;
    //   const watchedCount = 10;
    //   const popularity = watchedCount + likesCount;
    //   const totalPopularity = views + likesCount;

    //   const { _id: artistId } = await Fixture.createTestArtist({
    //     online: true,
    //     video: [contentId],
    //     urlId,
    //     totalPopularity,
    //     likesCount,
    //     watchedCount,
    //     popularity,
    //     views,
    //   });

    //   await Fixture.createTestLike({
    //     userId,
    //     entityId: artistId,
    //     entity: CONSTANTS.MODELS.ARTISTS,
    //   });

    //   // Act
    //   const response = await request.get({
    //     path: `/tv/artist/like-artist/${urlId}`,
    //     token: responseUser.data.token,
    //   });

    //   // Assert
    //   expect(response.status).toBe(200);

    //   const updateArtist = await Fixture.artistProvider.getSingle({ urlId });

    //   expect(updateArtist).toMatchObject({
    //     likesCount: likesCount - 1,
    //     popularity: popularity - 1,
    //     totalPopularity: totalPopularity - 1,
    //   });

    //   // check favoriteArtist
    //   // const updateUser = await Fixture.userProvider.getSingleById(responseUser.data._id);

    //   // expect(updateUser.favoriteArtists).toEqual([]);
    // });

    it('GET -> tv/artist/like-artist/:urlId : bad urlId', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();

      await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
      });

      const responseUser = await request.post({
        path: '/tv/signIn',
        data: {
          email,
          password,
          userName,
        },
      });

      expect(responseUser.data.error).toBeUndefined();
      // Arrange
      const urlId = 'badId';

      // Act
      const response = await request.get({
        path: `/tv/artist/like-artist/${urlId}`,
        token: responseUser.data.token,
      });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('Artist not found!');
    });

    it('GET -> tv/artist/like-artist/:urlId : unauthorized user, check permission', async () => {
      // Arrange
      const urlId = 'badId';

      // Act
      const response = await request.get({
        path: `/tv/artist/like-artist/${urlId}`,
        disableToken: false,
      });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });
});
