/* eslint-disable padding-line-between-statements */
const uuid = require('uuid');

const request = require('../../utils/request');
const { Fixture } = require('../../fixtures');

describe('TV redirect', () => {
  describe('GET -> /tv/redirect/', () => {
    it('GET -> /tv/redirect/', async () => {
      const redirectData = {
        source: `http://localhost:8000/${uuid.v4()}`,
        destination: `http://localhost:8000/${uuid.v4()}`,
      };

      await Fixture.createTestRedirect(redirectData);

      const response = await request.get({
        path: '/tv/redirect',
        params: { url: redirectData.source },
      });

      expect(response.status).toBe(200);
      expect(response.data.destination).toEqual(redirectData.destination);
    });

    it('GET -> /tv/redirect/: empty query params', async () => {
      const response = await request.get({
        path: '/tv/redirect',
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('url is required');
    });

    it('GET -> /tv/redirect/: url valid, but not exist', async () => {
      const response = await request.get({
        path: '/tv/redirect',
        params: { url: `http://localhost:8000/${uuid.v4()}` },
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('Redirect not found!');
    });
  });
});
