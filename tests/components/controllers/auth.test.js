/* eslint-disable padding-line-between-statements */

const { TWO_FA_PROVIDERS, OTP_SUBJECTS } = require('../../../constants/auth');

const { AccountController } = require('../../../controllers/auth/auth.controller');

const { TwoFAController } = require('../../../controllers/auth/2fa.controller');

const { Fixture } = require('../../fixtures');

const next = (error) => {
  return error;
};

const res = {
  status: () => {
    return {
      json: (value) => {
        return value;
      },
    };
  },
  json: (value) => {
    return value;
  },
};

describe('AUTH CONTROLLER', () => {
  describe('METHOD: signInHandler', () => {
    it('Should block user account after specified number of wrong passwords', async () => {
      // Arrange

      const userConfig = {
        password: '111111',
        email: 'someemail@email.com',
        accessToken: null,
      };

      const { _id: userId } = await Fixture.createTestUser(userConfig);

      const req = {
        body: {
          email: userConfig.email,
          password: '222222',
        },
      };

      // Act
      const firstResponse = await AccountController.signInHandler(req, res, next);

      // Assert
      expect(firstResponse).toMatchObject({
        message: 'Incorrect credentials has been provided!',
        status: 'You are not authorized',
        statusCode: 401,
      });

      for (let i = 0; i <= 2; i++) {
        const response = await AccountController.signInHandler(req, res, next);

        expect(response).toMatchObject({
          message: 'Incorrect credentials has been provided!',
          status: 'You are not authorized',
          statusCode: 401,
        });
      }

      const lastResponse = await AccountController.signInHandler(req, res, next);

      expect(lastResponse).toMatchObject({
        message:
          'Too many unsuccessful attempts. Account will be suspended due to security reasons.',
        status: 'Too Many Requests',
        statusCode: 429,
      });

      const userRecord = await Fixture.userProvider.getSingleById(userId, { isBlocked: 1 });

      expect(userRecord.isBlocked).toBeTrue();
    });

    it('Should block user with 2FA after specified number of wrong OTP', async () => {
      // Arrange

      const userConfig = {
        password: '111111',
        email: 'someemail2@email.com',
        accessToken: null,
        twoFactorAuth: {
          provider: TWO_FA_PROVIDERS.TOTP_CODE,
          enabled: true,
          totpSeed: 'GQQSUSSUPIZFSYICN44AYJSZDV3EUGDG',
          modifiedAt: Date.now(),
        },
      };

      const { _id: userId } = await Fixture.createTestUser(userConfig);

      const candidateData = await TwoFAController.createCandidateOTP(
        {
          body: {
            userId,
            subject: OTP_SUBJECTS.SIGN_IN,
          },
        },
        res,
        next
      );

      const req = {
        body: {
          email: userConfig.email,
          password: '111111',
          reqId: candidateData.reqId,
          OTP: '111111',
        },
      };

      // Act
      const firstResponse = await AccountController.signInHandler(req, res, next);

      // Assert
      expect(firstResponse).toMatchObject({
        message: 'Confirmation code is invalid. New code will be send!',
        status: 'You are not authorized',
        statusCode: 401,
      });

      req.body.reqId = firstResponse.details.newReqId;

      for (let i = 0; i <= 2; i++) {
        const response = await AccountController.signInHandler(req, res, next);

        expect(response).toMatchObject({
          message: 'Confirmation code is invalid. New code will be send!',
          status: 'You are not authorized',
          statusCode: 401,
        });

        req.body.reqId = response.details.newReqId;
      }

      const lastResponse = await AccountController.signInHandler(req, res, next);

      expect(lastResponse).toMatchObject({
        message:
          'Too many unsuccessful attempts. Account will be suspended due to security reasons.',
        status: 'Too Many Requests',
        statusCode: 429,
      });

      const userRecord = await Fixture.userProvider.getSingleById(userId, { isBlocked: 1 });

      expect(userRecord.isBlocked).toBeTrue();
    });
  });
});
