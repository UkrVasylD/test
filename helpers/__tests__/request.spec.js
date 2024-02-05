// const { CMS_DEFAULT_ITEMS_AMOUNT, DEFAULT_PAGE } = require('../../constants');

const { requestHelper } = require('../request');

describe('UNIT TEST Request', () => {
  describe('METHOD: checkObjectId', () => {
    it('all value valid -> expect objectId', async () => {
      const result = requestHelper.checkObjectId('639d9ce70899fd0a795db2fe', 'id');

      expect(result).toHaveProperty('_id');
    });
  });

  describe('METHOD: pagination', () => {
    const defaultLimitTv = 12;
    const defaultLimitMobile = 15;

    it('empty params -> expect default params: limit, page, skip', async () => {
      const result = requestHelper.searchPagination({});

      expect(result).toMatchObject({ limit: defaultLimitMobile, skip: 0 });
    });

    it('empty params query, tv=true -> expect default params: limit, skip', async () => {
      const tv = true;

      const result = requestHelper.searchPagination({}, tv);

      expect(result).toMatchObject({ limit: defaultLimitTv, skip: 0 });
    });

    it('params string count, page, skip , tv=true -> expect number ', async () => {
      const tv = true;

      const result = requestHelper.searchPagination({ page: '2', count: '25' }, tv);

      expect(result).toMatchObject({ limit: 25, skip: 25 });
    });

    it('params count < 1, page < 1 , tv=true -> expect default params ', async () => {
      const tv = true;

      const result = requestHelper.searchPagination({ count: '-100' }, tv);

      expect(result).toMatchObject({
        limit: defaultLimitTv,
        skip: 0,
      });
    });

    it('params count, page > bad number , tv=true -> expect default params ', async () => {
      const tv = true;

      const result = requestHelper.searchPagination(
        {
          count: '0023qwe',
          page: `0023qwe`,
        },
        tv
      );

      expect(result).toMatchObject({
        limit: defaultLimitTv,
        skip: 0,
      });
    });

    it('empty params query, tv=false -> expect default params: limit, skip', async () => {
      const tv = false;

      const result = requestHelper.searchPagination({}, tv);

      expect(result).toMatchObject({ limit: defaultLimitMobile, skip: 0 });
    });

    it('params string count, page, skip , tv=false -> expect number ', async () => {
      const tv = false;

      const result = requestHelper.searchPagination({ page: '2', count: '25' }, tv);

      expect(result).toMatchObject({ limit: 25, skip: 25 });
    });

    it('params count < 1, page < 1 , tv=false -> expect default params ', async () => {
      const tv = false;

      const result = requestHelper.searchPagination({ count: '-100' }, tv);

      expect(result).toMatchObject({
        limit: defaultLimitMobile,
        skip: 0,
      });
    });

    it('params count, page > bad number , tv=false -> expect default params ', async () => {
      const tv = false;

      const result = requestHelper.searchPagination(
        {
          count: '0023qwe',
          page: `0023qwe`,
        },
        tv
      );

      expect(result).toMatchObject({
        limit: defaultLimitMobile,
        skip: 0,
      });
    });

    it('param search = testSearch -> expect regex ', async () => {
      const query = { search: 'testSearch' };

      const result = requestHelper.searchPagination(query);

      expect(result.searchRegExp).toBeInstanceOf(RegExp);
    });

    it('param search = testSearch -> expect empty string ', async () => {
      const result = requestHelper.searchPagination({});

      expect(result.searchRegExp).toEqual(null);
    });
  });

  describe('METHOD: search', () => {
    it('param testSearch -> expect regex ', async () => {
      const testSearch = 'testSearch';

      const result = requestHelper.search(testSearch);

      expect(result).toBeInstanceOf(RegExp);
    });

    it('empty param -> expect empty string ', async () => {
      const result = requestHelper.search();

      expect(result).toEqual(null);
    });
  });

  describe('METHOD: searchReplace', () => {
    it('no param -> expect null', async () => {
      // act
      const result = requestHelper.searchReplace();

      // assert
      expect(result).toEqual(null);
    });

    it('string param -> expect formatted string', async () => {
      // arrange
      const args = 'Hell[{(*+?`"<>.,/^$|#';
      // act
      const result = requestHelper.searchReplace(args);

      // assert
      expect(result).toEqual('Hell\\[\\{\\(\\*\\+\\?\\`\\"\\<\\>\\.\\,\\/\\^\\$\\|\\#');
    });
  });
});
