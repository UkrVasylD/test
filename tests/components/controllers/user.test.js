/* eslint-disable padding-line-between-statements */
const { customAlphabet } = require('nanoid');
const { BSCTokenAdapter } = require('../../../adapters/bsc_token');

jest.mock('socket.io', () => {
  return () => {
    return { on: () => {}, adapter: () => {} };
  };
});

jest.mock('@sendgrid/client', () => {
  return {
    setApiKey: () => {},
    request: () => {},
  };
});

const { fileService } = require('../../../services/file.service');
const userController = require('../../../controllers/user.controller');

const { Fixture } = require('../../fixtures');

const { ID_PATTERN, ROLES } = require('../../../constants');

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
};

describe('USER CONTROLLER', () => {
  describe('METHOD: updateProfile', () => {
    const mockUserImage = {
      newFileNameWithExtension: 'imageKey',
    };

    beforeEach(() => {
      jest.spyOn(fileService, 'uploadImage').mockImplementation(() => {
        return mockUserImage;
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('update profile with all valid params', async () => {
      // Arrange
      const oldPassword = 'password111Q';
      const userRole = ROLES.CART_USER;

      const { _id: userId, password: oldPasswordHash } = await Fixture.createTestUser({
        password: oldPassword,
        role: userRole,
      });

      const body = {
        country: 'Afghanistan',
        gender: 'male',
        email: `${customAlphabet(ID_PATTERN, 5)()}@fakeuser.com`,
        oldPassword,
        newPassword: 'password222Q',
        userName: `${customAlphabet(ID_PATTERN, 5)()}userName`,
        firstName: `${customAlphabet(ID_PATTERN, 5)()}firstName`,
        lastName: `${customAlphabet(ID_PATTERN, 5)()}lastName`,
        fullName: `${customAlphabet(ID_PATTERN, 5)()}fullName`,
      };

      const req = {
        body,
        uId: userId,
        isTV: true,
        isMobile: false,
        files: {
          image: 'testImage',
        },
      };

      // Act
      const response = await userController.updateProfile(req, res, next);

      // Assert
      expect(response).toMatchObject({
        changedPassword: true,
        country: body.country,
        email: body.email,
        firstName: body.firstName,
        fullName: `${body.firstName} ${body.lastName}`,
        gender: body.gender,
        lastName: body.lastName,
        role: userRole,
        userName: body.userName,
      });

      const updatedUser = await Fixture.userProvider.getSingle({ _id: userId });

      expect(updatedUser).toMatchObject({
        fullName: `${body.firstName} ${body.lastName}`,
        lastName: body.lastName,
        firstName: body.firstName,
        userName: body.userName,
        email: body.email,
        gender: body.gender,
        country: body.country,
      });

      expect(updatedUser.password).not.toEqual(oldPasswordHash);
    });

    // TODO: investigate this test (DTO problem)
    // it('update profile with empty body -> expected error', async () => {
    //   // Arrange
    //   const oldPassword = 'password111Q';
    //   const userRole = ROLES.CART_USER;

    //   const { _id: userId } = await Fixture.createTestUser({
    //     password: oldPassword,
    //     role: userRole,
    //   });

    //   const body = {};

    //   const req = {
    //     body,
    //     uId: userId,
    //     isTV: true,
    //     isMobile: false,
    //     files: {},
    //   };

    //   // Act
    //   const response = await userController.updateProfile(req, res, next);

    //   // Assert
    //   expect(response.statusCode).toEqual(400);
    //   expect(response.message).toEqual('No changes found.');
    // });

    it('update profile with invalid birthDate -> expected error', async () => {
      // Arrange
      const oldPassword = 'password111Q';
      const userRole = ROLES.CART_USER;

      const { _id: userId } = await Fixture.createTestUser({
        password: oldPassword,
        role: userRole,
      });

      const body = { birthDate: 'badDate' };

      const req = {
        body,
        uId: userId,
        isTV: true,
        isMobile: false,
        files: {},
      };

      // Act
      const response = await userController.updateProfile(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('birthDate must be a number');
    });

    it('update profile with future date -> expected error', async () => {
      // Arrange
      const oldPassword = 'password111Q';
      const userRole = ROLES.CART_USER;

      const { _id: userId } = await Fixture.createTestUser({
        password: oldPassword,
        role: userRole,
      });

      const featureDate = new Date().setFullYear(2100, 11, 3);

      const body = { birthDate: `${featureDate}` };

      const req = {
        body,
        uId: userId,
        isTV: true,
        isMobile: false,
        files: {},
      };

      // Act
      const response = await userController.updateProfile(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('A future date is not allowed for the date of birth');
    });

    it('update profile with valid userId, but no exist -> expected error', async () => {
      const birthDate = Math.floor(new Date().getTime() / 1000);
      // Arrange
      // no exist user id in db
      const userId = Fixture.userProvider.ObjectId();

      const body = { birthDate };

      const req = {
        body,
        uId: userId,
        isTV: true,
        isMobile: false,
        files: {},
      };

      // Act
      const response = await userController.updateProfile(req, res, next);

      // Assert
      expect(response.message).toEqual('User not found!');
      expect(response.statusCode).toEqual(404);
    });

    it('update profile oldPassword != userPassword -> expected error', async () => {
      // Arrange
      const oldPassword = 'password111Q';
      const userRole = ROLES.CART_USER;

      const { _id: userId } = await Fixture.createTestUser({
        password: oldPassword,
        role: userRole,
      });

      const body = {
        oldPassword: 'password222Q',
        newPassword: 'password222Q',
      };

      const req = {
        body,
        uId: userId,
        isTV: true,
        isMobile: false,
        files: {},
      };

      // Act
      const response = await userController.updateProfile(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('Incorrect password has been provided!');
    });

    it('update profile newPassword < 6 -> expected error', async () => {
      // Arrange
      const oldPassword = 'password111Q';
      const userRole = ROLES.CART_USER;

      const { _id: userId } = await Fixture.createTestUser({
        password: oldPassword,
        role: userRole,
      });

      const body = {
        oldPassword,
        newPassword: '12345',
      };

      const req = {
        body,
        uId: userId,
        isTV: true,
        isMobile: false,
        files: {},
      };

      // Act
      const response = await userController.updateProfile(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual(
        'Invalid password has been provided! Password must have at least 6 characters.'
      );
    });

    it('update profile existUserName -> expected error', async () => {
      // Arrange
      const oldPassword = 'password111Q';
      const userRole = ROLES.CART_USER;
      const userName = `${customAlphabet(ID_PATTERN, 5)()}userName`;

      const { _id: userId } = await Fixture.createTestUser({
        password: oldPassword,
        role: userRole,
        userName,
        userNameSearch: userName.toLowerCase(),
      });

      const body = {
        userName,
      };

      const req = {
        body,
        uId: userId,
        isTV: true,
        isMobile: false,
        files: {},
      };

      // Act
      const response = await userController.updateProfile(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(409);
      expect(response.message).toEqual(
        'The username is already in use, please provide another username.'
      );
    });
  });

  describe('METHOD: getVotingAddress', () => {
    it('Get valid votingAddress -> votingAddress exist', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({
        votingAddress: _votingAddress,
      });

      const req = {
        uId: userId,
      };

      // Act
      const response = await userController.getVotingAddress(req, res, next);

      // Assert
      expect(response).toHaveProperty('votingAddress');
      expect(response.votingAddress).toEqual(_votingAddress);
    });

    it('Get valid votingAddress -> votingAddress no exist', async () => {
      // Arrange

      const { _id: userId } = await Fixture.createTestUser({});

      const req = {
        uId: userId,
      };

      // Act
      const response = await userController.getVotingAddress(req, res, next);

      // Assert
      expect(response).toHaveProperty('votingAddress');
      expect(response.votingAddress).toEqual('');
    });

    it('Get user votingAddress, user = isDeleted: true -> expect error NOT_FOUND', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({
        votingAddress: _votingAddress,
        isDeleted: true,
      });

      const req = {
        uId: userId,
      };

      // Act
      const response = await userController.getVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual('User not found!');
    });

    it('Get user votingAddress, user = isBlocked: true -> expect error NOT_FOUND', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({
        votingAddress: _votingAddress,
        isBlocked: true,
      });

      const req = {
        uId: userId,
      };

      // Act
      const response = await userController.getVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual('User not found!');
    });

    it('Get user votingAddress, userId valid, but not exist -> expect error NOT_FOUND', async () => {
      // Arrange
      const req = {
        uId: '637cf442b1235857635d5483',
      };

      // Act
      const response = await userController.getVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('userId must be of type object');
    });
  });

  describe('METHOD: updateVotingAddress', () => {
    let validateBSCTokenSpy;

    beforeEach(() => {
      validateBSCTokenSpy = jest.spyOn(BSCTokenAdapter, 'checkExistWallet');
    });

    afterEach(() => {
      validateBSCTokenSpy.mockRestore();
    });

    it('Update valid votingAddress -> votingAddress exist, update new address', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';
      const newVotingAddress = '0x0000000000000000000000000000000000000000';

      const { _id: userId } = await Fixture.createTestUser({
        votingAddress: _votingAddress,
      });

      const req = {
        uId: userId,
        body: {
          votingAddress: newVotingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response).toEqual(true);

      const {
        votingAddress: updateDBVotingAddress,
      } = await Fixture.userProvider.getSingleById(userId, { votingAddress: 1 });

      expect(updateDBVotingAddress).toEqual(newVotingAddress);
    });

    it('Update valid votingAddress -> send exist address in user, Expect ERROR Conflict 409', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({
        votingAddress: _votingAddress,
      });

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };

      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(409);

      expect(response.message).toEqual('User already have the same wallet');
    });

    it('Update user votingAddress, user = isDeleted: true -> expect error NOT_FOUND', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({
        votingAddress: _votingAddress,
        isDeleted: true,
      });

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual('User not found!');
    });

    it('Update user votingAddress, user = isBlocked: true -> expect error NOT_FOUND', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({
        votingAddress: _votingAddress,
        isBlocked: true,
      });

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual('User not found!');
    });

    it('Update user votingAddress, userId valid, but not exist -> expect error NOT_FOUND', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';
      const req = {
        uId: '637cf442b1235857635d5483',
        body: {
          votingAddress: _votingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('userId must be of type object');
    });

    it('Update user votingAddress -> expect error BAD_REQUEST votingAddress !== string', async () => {
      // Arrange
      const _votingAddress = {};

      const { _id: userId } = await Fixture.createTestUser({});

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('votingAddress must be a string');
    });

    it('Update user votingAddress -> expect error BAD_REQUEST votingAddress = string, but length < 42', async () => {
      // Arrange
      // 41 symbols
      const _votingAddress = '0x000000000000000000000000000000000000000';

      const { _id: userId } = await Fixture.createTestUser({});

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('votingAddress does not match requirements');
    });

    it('Update user votingAddress -> expect error BAD_REQUEST votingAddress = string, but length > 42', async () => {
      // Arrange
      // 43 symbols
      const _votingAddress = '0x00000000000000000000000000000000000000000';

      const { _id: userId } = await Fixture.createTestUser({});

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('votingAddress does not match requirements');
    });

    it('Update user votingAddress -> expect error BAD_REQUEST votingAddress = string, but empty string', async () => {
      // Arrange
      const _votingAddress = 'someVotingAddress';

      const { _id: userId } = await Fixture.createTestUser({});

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };
      validateBSCTokenSpy.mockResolvedValue(true);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(400);
      expect(response.message).toEqual('votingAddress does not match requirements');
    });

    it('Update user votingAddress -> expect error NOT_FOUND votingAddress = string, valid BUT now exist on BSC_SCAN', async () => {
      // Arrange
      const _votingAddress = '0x183DB564C3732a0E8b0D8486C0746fcAf9054c88';

      const { _id: userId } = await Fixture.createTestUser({});

      const req = {
        uId: userId,
        body: {
          votingAddress: _votingAddress,
        },
      };
      // BSC SCAN not found wallet address. RETURN false
      validateBSCTokenSpy.mockResolvedValue(false);

      // Act
      const response = await userController.updateVotingAddress(req, res, next);

      // Assert
      expect(response.statusCode).toEqual(404);
      expect(response.message).toEqual('Your wallet was not found on BscScan.');
    });
  });
});
