/* eslint-disable padding-line-between-statements */
const uuid = require('uuid');

const CONSTANTS = require('../../../constants');

const request = require('../../utils/request');
const { Fixture } = require('../../fixtures');

describe('Banner TV', () => {
  describe('GET -> tv/banner/:page', () => {
    it('GET -> tv/banner/:page : page HOME', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.HOME, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page LIVE', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.LIVE, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page DISCOVER', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.DISCOVER, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page CHANNELS', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.CHANNELS, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page ARTISTS', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.ARTISTS, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page MYLIST', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.MYLIST, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page PROGRAM', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.PROGRAM, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page PLAYER', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.PLAYER, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(countBanner);
      expect(response.data.total).toBeGreaterThanOrEqual(countBanner);

      expect(response.data.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...bannerParams })])
      );

      const responseBannerIds = response.data.data.map((element) =>
        Fixture.bannerProvider.ObjectId(element._id)
      );

      const banner = await Fixture.bannerProvider.getMany({
        _id: { $in: responseBannerIds },
        ...bannerParams,
      });

      expect(banner).toHaveLength(countBanner);
    });

    it('GET -> tv/banner/:page : page HOME, search name', async () => {
      const bannerParams = { page: CONSTANTS.VALIDATION_TV_PAGES.HOME, status: true };

      const asyncPipe = [];
      const countBanner = CONSTANTS.PROMOTION.MAX;

      for (let i = 0; i < countBanner; i++) {
        asyncPipe.push(Fixture.createTestBanner(bannerParams));
      }

      await Promise.all(asyncPipe);

      const searchName = `name${uuid.v4()}`;

      await Fixture.createTestBanner({ name: searchName, ...bannerParams });

      const response = await request.get({
        path: `/tv/banner/${bannerParams.page}`,
        disableToken: true,
        params: { search: searchName },
      });

      expect(response.status).toBe(200);

      expect(response.data.data).toHaveLength(1);
      expect(response.data.total).toEqual(1);

      expect(response.data.data[0]).toHaveProperty('name');
      expect(response.data.data[0].name).toEqual(searchName);
    });
  });
});
