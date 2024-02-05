jest.mock('../../adapters/redis', () => {
  return {
    redisAdapter: {
      getSortedSetMember: jest.fn(),
      getHashValuesByKeys: jest.fn(),
      redis: { zrangebyscore: jest.fn(), zcount: jest.fn() },
    },
  };
});

const { redisAdapter } = require('../../adapters/redis');
const { chatProvider } = require('../../providers/chat.provider');
const { chatBulk } = require('../bulk');

describe('METHOD: fetchMessages', () => {
  describe('score less than 1 -> expect empty array', () => {
    beforeEach(() => {
      jest.spyOn(redisAdapter, 'getSortedSetMember').mockImplementation(() => {
        return { score: 0 };
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('', async () => {
      // act
      const act = await chatBulk.fetchMessages();

      // assert
      expect(act).toBeArrayOfSize(0);
    });
  });

  describe('no messages -> expect empty array', () => {
    beforeEach(() => {
      jest.spyOn(redisAdapter, 'getSortedSetMember').mockImplementation(() => {
        return { score: 2 };
      });

      jest.spyOn(redisAdapter.redis, 'zrangebyscore').mockImplementation(() => {
        return [];
      });

      jest.spyOn(redisAdapter.redis, 'zcount').mockImplementation(() => {
        return 1;
      });

      jest.spyOn(chatProvider, 'getAll').mockImplementation(() => {
        return { data: [], total: 0 };
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('', async () => {
      // act
      const act = await chatBulk.fetchMessages();

      // assert
      expect(act).toBeArrayOfSize(0);
    });
  });
});

describe('METHOD: updateReply', () => {
  describe('empty params - expect undefined', () => {
    beforeEach(() => {
      jest.spyOn(redisAdapter, 'getHashValuesByKeys').mockImplementation(() => {
        return [];
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('', async () => {
      // arrange
      const args = {};

      // act
      const act = await chatBulk.updateReply(args);

      // assert
      expect(act).toBe(undefined);
    });
  });
});

describe('METHOD: addReply', () => {
  describe('empty params - expect undefined', () => {
    beforeEach(() => {
      jest.spyOn(redisAdapter, 'getHashValuesByKeys').mockImplementation(() => {
        return [];
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('', async () => {
      // arrange
      const args = {};
      // act
      const act = await chatBulk.addReply(args);

      // assert
      expect(act).toBe(undefined);
    });
  });
});
