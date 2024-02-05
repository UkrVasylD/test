/* eslint-disable padding-line-between-statements */
const uuid = require('uuid');

const request = require('../../utils/request');
const { Fixture } = require('../../fixtures');

describe('TV subscriber', () => {
  describe('POST -> /tv/subscriber/add', () => {
    it('POST -> /tv/subscriber/add: empty email', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
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

      const body = {
        // email: `${uuid.v4()}@gmail.com`, empty email
        firstName: `John${uuid.v4()}`,
        lastName: `Doe${uuid.v4()}`,
      };

      const response = await request.post({
        path: '/tv/subscriber/add',
        data: body,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('email is required');
    });

    it('POST -> /tv/subscriber/add: empty firstName', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
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

      const body = {
        email: `${uuid.v4()}@gmail.com`,
        // firstName: `John${uuid.v4()}`, empty firstName
        lastName: `Doe${uuid.v4()}`,
      };

      const response = await request.post({
        path: '/tv/subscriber/add',
        data: body,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('firstName is required');
    });

    it('POST -> /tv/subscriber/add: empty lastName', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
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

      const body = {
        email: `${uuid.v4()}@gmail.com`,
        firstName: `John${uuid.v4()}`,
        // lastName: `Doe${uuid.v4()}`, empty lastName
      };

      const response = await request.post({
        path: '/tv/subscriber/add',
        data: body,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('lastName is required');
    });

    it('POST -> /tv/subscriber/add: valid email but no exist', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
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

      const body = {
        email: `${uuid.v4()}.@gmail.com`,
        firstName: `John${uuid.v4()}`,
        lastName: `Doe${uuid.v4()}`,
      };

      const response = await request.post({
        path: '/tv/subscriber/add',
        data: body,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('email does not match requirements');
    });
  });
});
