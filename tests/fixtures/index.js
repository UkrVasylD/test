/* eslint-disable padding-line-between-statements */
const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid');

const { redisAdapter } = require('../../adapters/redis');
const { mongoAdapter } = require('../../adapters/mongo');
const { MongoClient } = require('../../providers/mongo.native');
const request = require('../utils/request');
const CONSTANTS = require('../../constants');
const MODULES = require('../../constants/modules');

const { userProvider } = require('../../providers/user.provider');
const { contentProvider } = require('../../providers/content.provider');
const { categoryProvider } = require('../../providers/category.provider');
const { subscriptionProvider } = require('../../providers/subscription.provider');
const { studioProvider } = require('../../providers/studio.provider');
const { purchaseProvider } = require('../../providers/purchase.provider');
const { channelProvider } = require('../../providers/channel.provider');
const { promoCodeProvider } = require('../../providers/promoCode.provider');
const { blogProvider } = require('../../providers/blog.provider');
const { settingsProvider } = require('../../providers/settings.provider');
const { artistProvider } = require('../../providers/artist.provider');
const { subscriberProvider } = require('../../providers/subscriber.provider');
const { bannerProvider } = require('../../providers/banner.provider');
const { purchasePackageProvider } = require('../../providers/purchasePackage.provider');
const { emailProvider } = require('../../providers/email.provider');
const { genreProvider } = require('../../providers/genre.provider');
const { redirectProvider } = require('../../providers/redirect.provider');
const { likesProvider } = require('../../providers/likes.provider');
const accessProfile = require('../../models/accessProfile.model');
const { viewsProvider } = require('../../providers/views.provider');

class Fixture {
  constructor() {
    // eslint-disable-next-line no-undef
    jest.setTimeout(1000 * 60 * 5);

    // eslint-disable-next-line no-undef
    beforeAll(async () => {
      await mongoAdapter.connect();

      // TODO check this approach may need to change
      if (typeof global?.SUPER_ADMIN === 'object' && !global?.SUPER_ADMIN?.TOKEN) {
        const { EMAIL: email, PASSWORD: password, USER_NAME: userName } = global.SUPER_ADMIN;

        await this.createTestUser({ email, password, userName });

        const response = await request.post({
          path: '/cms/signIn',
          data: {
            email,
            password,
          },
        });

        global.SUPER_ADMIN.TOKEN = response.data?.accessToken;
      }
    });

    // eslint-disable-next-line no-undef
    afterAll(async () => {
      await redisAdapter.redis.disconnect();

      await mongoose.connection.close();
      await MongoClient.close();
    });

    this.categoryProvider = categoryProvider;
    this.blogProvider = blogProvider;
    this.settingsProvider = settingsProvider;
    this.channelProvider = channelProvider;
    this.userProvider = userProvider;
    this.artistProvider = artistProvider;
    this.subscriberProvider = subscriberProvider;
    this.bannerProvider = bannerProvider;
    this.purchasePackageProvider = purchasePackageProvider;
    this.emailProvider = emailProvider;
    this.genreProvider = genreProvider;
    this.redirectProvider = redirectProvider;
    this.likesProvider = likesProvider;
    this.viewsProvider = viewsProvider;
  }

  /**
   * Create user for test and after test it will be deleted
   * @param {Object} options Parameter which will be added to user
   */
  async createTestUser(options = {}) {
    const passwordHash = Fixture._generateHash(options.password || 'password');

    const acProfile = await accessProfile.create({
      name: 'User',
      description: 'Without rights',
      editable: false,
      permissions: '0'.repeat(MODULES.length),
    });

    const user = await userProvider.createSingle({
      email: 'user@user.com',
      userName: 'SimpleUser',
      role: CONSTANTS.ROLES.CART_USER,
      ...options,
      password: passwordHash,
      accessProfileId: acProfile._id,
    });

    return user;
  }

  async createAccessProfile(options = {}) {
    const acProfile = await accessProfile.create({
      name: 'Super Admin',
      description: 'All access permissions',
      editable: false,
      ...options,
    });

    return acProfile;
  }

  async createTestContent(options = {}) {
    const document = {
      title: `Just-a-Content${uuid.v4()}`,
      status: CONSTANTS.VIDEO_STATUSES.COMPLETED,
      watchedDate: { date: new Date() },
      watchedCount: 100,
      popularity: 100,
      isMobile: false,
      contentType: CONSTANTS.CONTENT_TYPES.VIDEO,
      ...options,
    };

    if (options.isMobile) {
      document.onlineVideo = true;
    } else {
      document.onlineVideoTV = true;

      document.showTV = true;
    }

    const content = await contentProvider.createSingle(document);

    return content;
  }

  async createTestCategory(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const category = await categoryProvider.createSingle({
      value: uuid.v4(),
      creator: userCreatorEditor,
      editor: userCreatorEditor,
      ...options,
    });

    return category;
  }

  async createTestSubscription(options = {}) {
    const { _id: userId } = await this.createTestUser();

    const data = {
      user: userId,
      transactionId: '',
      active: true,
      store: CONSTANTS.PAYMENT_SYSTEMS.AIRTEL,
      ...options,
    };

    const subscriber = await subscriptionProvider.createSingle(data);

    return subscriber;
  }

  async createTestStudio(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const createObj = {
      name: uuid.v4(),
      price: 20,
      icon: 'asdasd',
      creator: userCreatorEditor,
      editor: userCreatorEditor,
      ...options,
    };

    return studioProvider.createSingle(createObj);
  }

  async createTestPurchase(options = {}) {
    return purchaseProvider.createSingle(options);
  }

  async createTestChannel(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const objCreate = {
      title: `Just-a-Channel${uuid.v4()}`,
      creator: userCreatorEditor,
      editor: userCreatorEditor,
      preview: `testImage${uuid.v4()}`,
      previewDetailed: `testImage${uuid.v4()}`,
      allVideos: [],
      ...options,
    };

    return channelProvider.createSingle(objCreate);
  }

  async createTestPromoCode() {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    return promoCodeProvider.createSingle({
      promoCode: uuid.v4(),
      coins: 300,
      subscription: '5ed951da9f5e30635fead885',
      type: 'One Time',
      creator: userCreatorEditor,
      editor: userCreatorEditor,
      wasUsed: true,
    });
  }

  async createTestBlog(options = {}) {
    const params = {
      title: uuid.v4(),
      urlId: uuid.v4(),
      content: uuid.v4(),
      status: false,
      featured: false,
      // artists: '',
      showHeaderImage: false,
      ...options,
    };

    return blogProvider.createSingle(params);
  }

  async createTestGenre(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const genre = await genreProvider.createSingle({
      value: uuid.v4(),
      creator: userCreatorEditor,
      editor: userCreatorEditor,
      ...options,
    });

    return genre;
  }

  async createTestSameOrder(nameSameOrder) {
    const options = {
      key: `sameOrder${nameSameOrder}`,
      value: true,
    };

    return settingsProvider.createSingle(options);
  }

  async createTestArtist(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const artist = await artistProvider.createSingle({
      name: uuid.v4(),
      editor: userCreatorEditor,
      creator: userCreatorEditor,
      ...options,
    });

    return artist;
  }

  async createTestSubscriber(options = {}) {
    const createObj = {
      email: `${uuid.v4()}@gmail.com`,
      firstName: `John${uuid.v4()}`,
      lastName: `Doe${uuid.v4()}`,
      ip_address: '',
      source: '',
      active: true,
      ...options,
    };

    const subscriber = await subscriberProvider.createSingle(createObj);

    return subscriber;
  }

  async createTestBanner(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const banner = await bannerProvider.createSingle({
      mainId: bannerProvider.ObjectId(),
      page: CONSTANTS.VALIDATION_TV_PAGES.HOME,
      name: `name${uuid.v4()}`,
      link: 'http://localhost',
      editor: userCreatorEditor,
      creator: userCreatorEditor,
      ...options,
    });

    return banner;
  }

  async createTestPurchasePackage(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const data = {
      name: `name${uuid.v4()}`,
      description: `description test test${uuid.v4()}`,
      price: 20,
      image: `testImage${uuid.v4()}`,
      creator: userCreatorEditor,
      editor: userCreatorEditor,
      ...options,
    };

    const content = await purchasePackageProvider.createSingle(data);

    return content;
  }

  async createTestEmail(options = {}) {
    const user = await this.createTestUser({});

    const email = await emailProvider.createSingle({
      email: `email${uuid.v4()}`,
      userName: `userName${uuid.v4()}`,
      user_id: user._id,
      ...options,
    });

    return email;
  }

  async createTestRedirect(options = {}) {
    const user = await this.createTestUser({});

    const userCreatorEditor = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const email = await redirectProvider.createSingle({
      source: `http://localhost:8000/${uuid.v4()}`,
      destination: `http://localhost:8000/${uuid.v4()}`,
      creator: userCreatorEditor,
      editor: userCreatorEditor,
      ...options,
    });

    return email;
  }

  async createTestLike(options = {}) {
    const user = await this.createTestUser({});
    const content = await this.createTestContent({});

    const likes = await likesProvider.createSingle({
      userId: user._id,
      entityId: content._id,
      entity: CONSTANTS.MODELS.CONTENTS,
      ...options,
    });

    return likes;
  }

  async createTestView(options = {}) {
    const user = await this.createTestUser({});
    const content = await this.createTestContent({});

    const views = await viewsProvider.createSingle({
      userId: user._id,
      entityId: content._id,
      entity: CONSTANTS.MODELS.CONTENTS,
      ...options,
    });

    return views;
  }

  async signInUser() {
    const email = `test${uuid.v1()}@gmail.com`;
    const password = 'testPassword';
    const userName = uuid.v4();

    await this.createTestUser({
      email,
      password,
      userName,
      accessToken: null,
    });

    const responseUser = await request.post({
      path: '/mobile/signIn',
      data: {
        email,
        password,
        userName,
      },
    });

    return { token: responseUser?.data?.token, email, password, userName };
  }

  static _generateHash(password) {
    const shaSum = crypto.createHash('sha256');

    shaSum.update(password);

    return shaSum.digest('hex');
  }
}

module.exports = { Fixture: new Fixture() };
