/* eslint-disable padding-line-between-statements */
const uuid = require('uuid');
const { customAlphabet } = require('nanoid');

const request = require('../../utils/request');
const { Fixture } = require('../../fixtures');

const CONSTANTS = require('../../../constants');

describe('TV user', () => {
  describe('POST -> /tv/user/remove-email', () => {
    it('POST -> /tv/user/remove-email: remove email by fbId', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
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

      const response = await request.post({
        path: '/tv/user/remove-email',
        data: {
          id: fbId,
        },
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);

      const checkUser = await Fixture.userProvider.getSingleById(userId, {
        accessToken: 1,
        email: 1,
      });

      expect(checkUser).toMatchObject({ accessToken: '', email: null });
    });

    it('POST -> /tv/user/remove-email: body empty', async () => {
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

      const response = await request.post({
        path: '/tv/user/remove-email',
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('id is required');
    });

    it('POST -> /tv/user/remove-email: fbId valid but no exist', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

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

      const response = await request.post({
        path: '/tv/user/remove-email',
        data: { id: fbId },
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('User not found!');
    });

    it('POST -> /tv/user/remove-email: fbId exist, bu user isDeleted=true', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        isDeleted: false,
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

      await Fixture.userProvider.updateSingleById(userId, {
        isDeleted: true,
      });

      const response = await request.post({
        path: '/tv/user/remove-email',
        data: { id: fbId },
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('User not found!');
    });
  });

  describe('POST -> /tv/user/setEmail', () => {
    it('POST -> /tv/user/setEmail: body empty', async () => {
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

      const response = await request.post({
        path: '/tv/user/setEmail',
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('email is required');
    });

    it('POST -> /tv/user/setEmail: check exist email', async () => {
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

      // create exist email
      const { email: existEmail } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
      });

      const response = await request.post({
        path: '/tv/user/setEmail',
        data: { email: existEmail },
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual(
        'The email address is already in use, please provide another email address.'
      );
    });

    it('POST -> /tv/user/setEmail: unauthorized user, check permission', async () => {
      const response = await request.post({
        path: '/tv/user/setEmail',
        disableToken: true,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });

  describe('GET -> /tv/user/isVerifyUser', () => {
    it('GET -> /tv/user/isVerifyUser: check isConfirm true', async () => {
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

      const response = await request.get({
        path: '/tv/user/isVerifyUser',
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.isConfirm).toEqual(true);
    });

    it('GET -> /tv/user/isVerifyUser: unauthorized user, check permission', async () => {
      const response = await request.get({
        path: '/tv/user/isVerifyUser',
        disableToken: true,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });

  describe('GET -> /tv/user/deactivateAccount', () => {
    it('GET -> /tv/user/deactivateAccount: check isActiveAccount = false', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
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

      const response = await request.get({
        path: '/tv/user/deactivateAccount',
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);

      const checkUser = await Fixture.userProvider.getSingleById(userId, {
        isActiveAccount: 1,
      });

      expect(checkUser.isActiveAccount).toEqual(false);
    });

    it('GET -> /tv/user/deactivateAccount: user no found', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
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

      await Fixture.userProvider.deleteSingleById(userId);

      const response = await request.get({
        path: '/tv/user/deactivateAccount',
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('User not found!');

      const checkUser = await Fixture.userProvider.getSingleById(userId, {
        isActiveAccount: 1,
      });

      expect(checkUser).toBeNull();
    });

    it('GET -> /tv/user/deactivateAccount: The user account is already deactivated. ', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
        isActiveAccount: true,
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

      await Fixture.userProvider.updateSingleById(userId, { isActiveAccount: false });

      const response = await request.get({
        path: '/tv/user/deactivateAccount',
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('The user account is already activated.');

      const checkUser = await Fixture.userProvider.getSingleById(userId, {
        isActiveAccount: 1,
      });

      expect(checkUser.isActiveAccount).toEqual(false);
    });

    it('GET -> /tv/user/deactivateAccount: unauthorized user, check permission', async () => {
      const response = await request.get({
        path: '/tv/user/deactivateAccount',
        disableToken: true,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });

  describe('GET -> /tv/user/checkSubs', () => {
    it('GET -> /tv/user/checkSubs: get last subscription user', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
      });

      // first subscription
      await Fixture.createTestSubscription({
        active: true,
        user: userId,
        contentType: CONSTANTS.SUBSCRIPTION_CONTENT_TYPE.SUBSCRIPTION,
        dateEnd: new Date().setFullYear(2020, 11, 3),
      });

      // last subscription
      const { _id: lastSubscriptionId } = await Fixture.createTestSubscription({
        active: true,
        user: userId,
        contentType: CONSTANTS.SUBSCRIPTION_CONTENT_TYPE.SUBSCRIPTION,
        dateEnd: new Date(),
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

      const response = await request.get({
        path: '/tv/user/checkSubs/',
        token: responseUser.data.token,
      });

      expect(response.data.error).toBeUndefined();
      expect(response.status).toBe(200);

      expect(response.data.data).toMatchObject({
        _id: lastSubscriptionId.toString(),
        active: 'Active',
      });
    });

    it('GET -> /tv/user/checkSubs: user have one deactivated subscription', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
      });

      // deactivated subscription
      await Fixture.createTestSubscription({
        active: false,
        user: userId,
        contentType: CONSTANTS.SUBSCRIPTION_CONTENT_TYPE.SUBSCRIPTION,
        dateEnd: new Date().setFullYear(2020, 11, 3),
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

      const response = await request.get({
        path: '/tv/user/checkSubs/',
        token: responseUser.data.token,
      });

      expect(response.data.error).toBeUndefined();
      expect(response.status).toBe(200);

      expect(response.data.data).toBeNull();
    });

    it('GET -> /tv/user/checkSubs: user have one channel subscription', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();
      const fbId = uuid.v4();

      const { _id: userId } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
      });

      // deactivated subscription
      await Fixture.createTestSubscription({
        active: true,
        user: userId,
        contentType: CONSTANTS.SUBSCRIPTION_CONTENT_TYPE.CHANNEL,
        dateEnd: new Date().setFullYear(2020, 11, 3),
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

      const response = await request.get({
        path: '/tv/user/checkSubs/',
        token: responseUser.data.token,
      });

      expect(response.data.error).toBeUndefined();
      expect(response.status).toBe(200);

      expect(response.data.data).toBeNull();
    });

    it('GET -> /tv/user/checkSubs: unauthorized user, check permission', async () => {
      const response = await request.get({
        path: '/tv/user/checkSubs',
        disableToken: true,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });

  describe('GET -> /tv/user/votingAddress', () => {
    it('GET -> /tv/user/votingAddress: get exist votingAddress in user', async () => {
      // Arrange
      const email = `${customAlphabet(CONSTANTS.ID_PATTERN, 10)()}@gmail.com`;
      const password = `testPassword${customAlphabet(CONSTANTS.ID_PATTERN, 5)()}`;
      const userName = uuid.v4();
      const fbId = uuid.v4();
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
        votingAddress: _votingAddress,
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

      // Act
      const response = await request.get({
        path: '/tv/user/votingAddress/',
        token: responseUser.data.token,
      });

      // Assert
      expect(response.data.error).toBeUndefined();
      expect(response.status).toBe(200);

      expect(response.data).toHaveProperty('votingAddress');
      expect(response.data).toMatchObject({
        votingAddress: _votingAddress,
        _id: userId.toString(),
      });
    });

    it('GET -> /tv/user/votingAddress: unauthorized user, check permission', async () => {
      // Act
      const response = await request.get({
        path: '/tv/user/votingAddress',
        disableToken: true,
      });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });

  describe('PUT -> /tv/user/votingAddress', () => {
    it('PUT -> /tv/user/votingAddress: votingAddress exist, update new address', async () => {
      // Arrange
      const email = `${customAlphabet(CONSTANTS.ID_PATTERN, 10)()}@gmail.com`;
      const password = `testPassword${customAlphabet(CONSTANTS.ID_PATTERN, 5)()}`;
      const userName = uuid.v4();
      const fbId = uuid.v4();
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';
      const newVotingAddress = '0x0000000000000000000000000000000000000000';

      const { _id: userId } = await Fixture.createTestUser({
        email,
        password,
        userName,
        accessToken: null,
        fbId,
        votingAddress: _votingAddress,
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

      // Act
      const response = await request.put({
        path: '/tv/user/votingAddress/',
        token: responseUser.data.token,
        data: {
          votingAddress: newVotingAddress,
        },
      });

      // Assert
      expect(response.data.error).toBeUndefined();
      expect(response.status).toBe(200);

      expect(response.data).toEqual(true);

      const {
        votingAddress: updateDBVotingAddress,
      } = await Fixture.userProvider.getSingleById(userId, { votingAddress: 1 });

      expect(updateDBVotingAddress).toEqual(newVotingAddress);
    });

    it('PUT -> /tv/user/votingAddress: unauthorized user, check permission', async () => {
      // Act
      const response = await request.put({
        path: '/tv/user/votingAddress',
        disableToken: true,
      });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });
});
