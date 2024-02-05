const uuid = require('uuid');
const crypto = require('crypto');

const CONSTANTS = require('../constants');
const { REGULAR_EXPRESSIONS } = require('../constants/regularExpressions');
const RESPONSES = require('../constants/responses');

const { HttpException } = require('../helpers/errors');
const utility = require('../helpers/utility');

const { userProvider } = require('../providers/user.provider');

const { contentProvider } = require('../providers/content.provider');

const { viewsProvider } = require('../providers/views.provider');

class UserService {
  /**
   * Get users with at least one purchase
   * @param {DTO.Request.getAllUsersDTO} DTO
   * @returns {Promise<userProvider.getUsersWithPurhchase>} Return object of data and total
   */
  async getUsers({ skip, limit }) {
    const users = await userProvider.getUsers({ skip, limit });

    return users;
  }

  /**
   * @param {DTO.Request.getUsersBySourceForLandDTO} DTO
   * @returns {Promise<userProvider.GetUsersBySourceForLandResult>}
   */
  async getUsersBySourceForLand({ ids, source }) {
    const result = await userProvider.getUsersBySourceForLand({
      ids,
      source,
    });

    return result;
  }

  /**
   * Get available subscription types aun currency value of user country
   * @param {DTO.Request.getSubTypesDTO} DTO
   * @returns {Promise<{
   *  data: Object[],
   *  currency: {
   *    value: Number,
   *    id: String,
   *    name: String,
   *    symbol: String,
   *    coinsGHS: String
   *    coinsKES: String
   * }
   * }>}
   */
  async getSubTypes({ userId }) {
    const result = await userProvider.aggregationCached({
      userId,
      name: buildAPICacheKey({
        scope: CACHE_SCOPES.User,
        entity: CACHE_ENTITIES.USER.Subs,
        identifiers: [userId],
      }),
      async data() {
        const [
          { value: coinsGHS } = {},
          { value: coinsKES } = {},
          [user],
          data,
        ] = await Promise.all([
          countryProvider.getCurrencyValue('Ghana'),
          countryProvider.getCurrencyValue('KES'),
          userId ? userProvider.getUsersCountry(userId) : [],
          subscriptionTypeProvider.getMany({}, {}, { sort: { coins: 1 } }),
        ]);

        if (user && user.country && user.country.currencyValue) {
          return {
            data,
            currency: {
              value: user.country.currencyValue,
              id: user.country.currencyId,
              name: user.country.currency,
              symbol: user.country.currencySymbol,
              coinsGHS,
              coinsKES,
            },
          };
        }

        return {
          data,
          currency: {
            value: 1,
            id: 'USD',
            name: 'United States Dollar',
            symbol: '$',
            coinsGHS,
            coinsKES,
          },
        };
      },
    });

    return result;
  }

  /**
   * @param {DTO.Request.tokenDTO} DTO
   * @returns {Promise<Object>} Uses data and wallet if token provided and is not TV
   */
  async getUser({ userId, token, isTV }) {
    const result = await userProvider.aggregationCached({
      userId,
      name: buildAPICacheKey({
        scope: CACHE_SCOPES.Model,
        entity: CACHE_ENTITIES.MODELS.User,
        identifiers: [userId, 'userWithWalletInfo', isTV],
      }),
      async data() {
        const user = await userProvider.getUser(userId);

        if (!user) {
          throw HttpException.NOT_FOUND(`User not found!`);
        }

        user.avatar = user.avatar
          ? await contentParser.computeUrl({
              fileName: user.avatar,
              bucket: BUCKETS.AVATARS,
              lifeTime: CONSTANTS.AWS_URL_LIFE_TIME.FOR_AVATAR,
            })
          : '';

        user.dateOfBirth = dateHelper.formatBirthDate(user.dateOfBirth);

        if (!isTV) {
          const [CEEKPrice, BNBPrice] = await Promise.all([
            BSCTokenAdapter.getTokenPrice(),
            BSCTokenAdapter.getBNBPrice(),
          ]);

          user.USDValueOfCEEK = Number((CEEKPrice * user.BSCTokens).toFixed(2));

          user.USDValueOfBNB = Number((BNBPrice * user.balanceBNB).toFixed(2));

          user.BSCTokens = Number(user.BSCTokens.toFixed(2));

          user.balanceBNB = Number(user.balanceBNB.toFixed(9));
        }

        if (!token || isTV) {
          return user;
        }

        const wallet = {
          ETH_balance: '0',
          ETH_balance_indecimals: 0,
          token_balance: '0',
          token_balance_indecimals: 0,
          crytoaddress: '',
        };

        return { ...user, ...wallet };
      },
    });

    return result;
  }

  /**
   * Create user playlist
   * @param {DTO.Request.createPlaylistDTO} DTO
   * @returns {Promise<Object>} playlist model
   */
  async createPlaylist({ videoIds, playlistName, userId }) {
    let contentIds = [];

    if (videoIds && videoIds.length) {
      const content = await contentProvider.filterContentByType(videoIds);

      if (!content.length) {
        throw HttpException.NOT_FOUND('Video not found!');
      }

      contentIds = content.map((video) => video._id);
    }

    const playList = userPlaylistProvider.createSingle({
      name: playlistName,
      userId,
      videos: contentIds,
    });

    return playList;
  }

  /**
   * Update name of user playlist
   * @param {DTO.Request.updateNameOfPlaylistDTO} DTO
   * @returns {Promise<Object>} updated playlist model
   */
  async updateNameOfPlaylist({ playlistId, playlistName, userId }) {
    /** @type {Pick<DTO.Entity.PlayListDTO, 'userId'|'name'>} */
    const playList = await userPlaylistProvider.getSingleById(playlistId);

    if (!playList) {
      throw HttpException.NOT_FOUND('Playlist not found!');
    }

    if (playList.userId.toString() !== userId.toString()) {
      throw HttpException.FORBIDDEN('You do not have sufficient rights');
    }

    if (playlistName === playList.name) {
      return playList;
    }

    const updatedPlaylist = await userPlaylistProvider.getSingleAndUpdate(
      { _id: playlistId },
      { name: playlistName },
      { new: true }
    );

    return updatedPlaylist;
  }

  /**
   * remove user playlist
   * @param {DTO.Request.removePersonalPlaylistDTO} DTO
   * @returns {Promise<{ message: String }>}  message about successfull removing
   */
  async removePersonalPlaylist({ playlistId, userId }) {
    await userPlaylistProvider.deleteSingle({ _id: playlistId, userId });

    return { message: RESPONSES.SUCCESS('remove playlist') };
  }

  /**
   * Get user playlist
   * @param {DTO.Request.Pagination} DTO
   * @returns {Promise<{ data: object, total: number }>}  parsed playlist model and total count of playlists
   */
  async getUserPlaylist({ skip, limit, userId, userAge, searchRegExp }) {
    const result = await userProvider.aggregationCached({
      userId,
      name: buildAPICacheKey({
        scope: CACHE_SCOPES.Model,
        entity: CACHE_ENTITIES.MODELS.User,
        identifiers: [userId, 'playList', hashIdentifiers({ searchRegExp, limit, skip })],
      }),
      async data() {
        const { data, total } = await userPlaylistProvider.getUserPlayList({
          skip,
          limit,
          userId,
          userAge,
          searchRegExp,
        });

        const parsedData = await contentParser.playListParser(data);

        return { data: parsedData, total };
      },
    });

    return result;
  }

  // ================ TV Services ================
  /**
   * Sign in user by email or userName for TV
   * @param {DTO.Request.signInDTO & {originalUrl:string}} DTO
   * @returns {Promise<object>} user login data and date of last login
   */
  async signInViaEmailTV({ email, userName, password, originalUrl }) {
    const user = await userProvider.getUserForLogin({
      email,
      userName,
      securityToken: true,
    });

    if (!user) {
      throw HttpException.UNAUTHORIZED(`No account found with the specified credentials.`);
    }

    if (!user.isConfirm) {
      throw HttpException.UNAUTHORIZED(
        `Please check your email to confirm your account before you can login.`
      );
    }

    if (!user.isActiveAccount) {
      throw HttpException.UNAUTHORIZED(`Your account was deactivated!`);
    }

    if (user.isBlocked) {
      throw HttpException.FORBIDDEN(`Your account was blocked!`);
    }

    // Security Token is used for the api /mobile/user/abilities
    if (user.password !== this._generateHash(password) && user.securityToken !== password) {
      const data = await redisAdapter.getValue(
        buildAPICacheKey({
          scope: CACHE_SCOPES.Utils,
          entity: CACHE_ENTITIES.UTILS.Bruteforce,
          identifiers: [originalUrl, user._id],
        })
      );

      if (data) {
        const countAttempts = +data;

        if (countAttempts >= 9) {
          const newToken = uuid.v4();

          await userProvider.updateSingleById(user._id, {
            isBlocked: true,
            securityToken: newToken,
          });

          await redisAdapter.delByPattern(
            buildAPICacheKey({
              scope: CACHE_SCOPES.Utils,
              entity: CACHE_ENTITIES.UTILS.Bruteforce,
              identifiers: [originalUrl, user._id],
            }),
            { immediate: true }
          );

          throw HttpException.UNAUTHORIZED(`Your account was blocked!`);
        }

        await redisAdapter.setKey(
          buildAPICacheKey({
            scope: CACHE_SCOPES.Utils,
            entity: CACHE_ENTITIES.UTILS.Bruteforce,
            identifiers: [originalUrl, user._id],
          }),
          countAttempts + 1
        );
      } else {
        await redisAdapter.setKey(
          buildAPICacheKey({
            scope: CACHE_SCOPES.Utils,
            entity: CACHE_ENTITIES.UTILS.Bruteforce,
            identifiers: [originalUrl, user._id],
          }),
          1
        );
      }

      throw HttpException.UNAUTHORIZED(`Incorrect credentials has been provided!`);
    }

    await redisAdapter.delByPattern(
      buildAPICacheKey({
        scope: CACHE_SCOPES.Utils,
        entity: CACHE_ENTITIES.UTILS.Bruteforce,
        identifiers: [originalUrl, user._id],
      }),
      { immediate: true }
    );

    delete user.password;

    delete user.ip_address;

    delete user.accessToken;

    delete user.securityToken;

    userProvider.updateSingle({ _id: user._id }, { lastLogin: new Date() });

    return {
      ...user,
      lastLogin: new Date(),
    };
  }

  /**
   * Sign in user by facebook for TV
   * @param {DTO.Request.signInDTO & DTO.Request.signUpDTO | DTO.Request.signUpDTO} DTO
   * @returns {Promise<object>} user login data
   */
  async signInSignUpFbUserTV({ fbId, token, isVotingApp, ipAddress, source }) {
    let user = await userProvider.getUserForLogin({ fbId });

    if (!user) {
      const fbUser = await this._getUserFromFB(token, fbId, false);

      // @ts-ignore
      fbUser.fbId = fbId;

      if (source) {
        fbUser.source = source;
      }

      // @ts-ignore
      fbUser.role = CONSTANTS.ROLES.CART_USER;

      if (isVotingApp) {
        // @ts-ignore
        fbUser.isVotingApp = isVotingApp;
      } else {
        // @ts-ignore
        fbUser.device = CONSTANTS.DEVICES_SOURCE.SITE;
      }

      if (ipAddress) {
        fbUser.ip_address = ipAddress;

        const [info] = await geoIpAdapter.fetchIpInfo([ipAddress]);

        fbUser.ip_country = info.country_name;

        fbUser.ip_region = info.state_prov || info.district;

        fbUser.ip_city = info.city;
      }

      if (fbUser.timeAvatar) {
        const fileData = await fileService.uploadImageFromFacebook(
          fbUser.timeAvatar,
          BUCKETS.AVATARS
        );

        // @ts-ignore
        fbUser.originalAvatar = fileData.newFileNameWithExtension;

        fbUser.avatar = fileData.newFileNameWithExtension;

        const accessProfileModel = await accessProvider.getSingle(
          { name: ACCESS_ROLES.USER.name },
          { _id: 1 }
        );

        fbUser.accessProfileId = accessProfileModel._id;
      }

      await userProvider.createSingle(fbUser);

      user = await userProvider.getUserForLogin({ fbId });

      if (user.email) {
        events.Email.signUp({
          email: user.email,
          fullName: user.fullName || user.userName,
          token: user.accessToken,
          userName: user.userName,
        });
      }
    } else if (!user.email) {
      return user;
    } else if (!user.isConfirm) {
      throw HttpException.UNAUTHORIZED(
        `Please check your email to confirm your account before you can login.`
      );
    }

    if (!user.isActiveAccount) {
      throw HttpException.FORBIDDEN(`Your account was deactivated!`);
    }

    if (user.isBlocked) {
      throw HttpException.FORBIDDEN(`Your account was blocked!`);
    }

    user.fbLogin = true;

    delete user.password;

    delete user.ip_address;

    delete user.accessToken;

    userProvider.updateSingle({ _id: user._id }, { lastLogin: new Date() });

    return user;
  }

  /**
   * Sign up TV user by email
   * @param {DTO.Request.signUpDTO} DTO
   * @returns {Promise<object>} user model
   */
  async signUpTVUserViaEmail({
    country,
    ipAddress,
    source,
    birthDate,
    email,
    password,
    gender,
    userName,
  }) {
    const existingUser = await userProvider.getUserByEmailUserName(email, userName);

    if (existingUser) {
      if (existingUser.accessToken) {
        const accessToken = uuid.v1();

        await userProvider.updateSingle({ _id: existingUser._id }, { accessToken });

        return {
          ...existingUser,
          accessToken,
        };
      }

      if (existingUser.email === email.toLowerCase()) {
        throw HttpException.CONFLICT(
          `The email address is already in use, please provide another email address.`
        );
      }

      if (userName && existingUser.userName.toLowerCase() === userName.toLowerCase()) {
        throw HttpException.CONFLICT(
          `The username is already in use, please provide another username.`
        );
      }
    }

    const createParams = {
      device: CONSTANTS.DEVICES_SOURCE.SITE,
      email: email.toLowerCase(),
      password: this._generateHash(password),
      ip_address: ipAddress,
      role: CONSTANTS.ROLES.CART_USER,
      source,
      userName,
      userNameSearch: userName.toLowerCase(),
    };

    if (ipAddress) {
      const [info] = await geoIpAdapter.fetchIpInfo([ipAddress]);

      if (!info?.error) {
        createParams.ip_country = info.country_name;

        createParams.ip_region = info.state_prov || info.district;

        createParams.ip_city = info.city;
      }
    }

    if (country) {
      const existCountry = await countryProvider.getSingle({ value: country }, { _id: 1 });

      if (existCountry) {
        createParams.country = country;

        createParams.countryId = existCountry._id;
      }
    }

    if (birthDate) {
      const validate = dateHelper.checkDateOfBirth(birthDate);

      if (!validate.parsed) {
        throw HttpException.BAD_REQUEST(`Invalid birth date has been provided.`);
      }

      if (!validate.valid) {
        throw HttpException.BAD_REQUEST(`A future date is not allowed for the date of birth`);
      }

      createParams.birthDate = birthDate;
    }

    if (gender) {
      createParams.gender = gender.toLowerCase();
    }

    const accessToken = uuid.v1();

    createParams.accessToken = accessToken;

    const accessProfileModel = await accessProvider.getSingle(
      { name: ACCESS_ROLES.USER.name },
      { _id: 1 }
    );

    createParams.accessProfileId = accessProfileModel._id;

    const newUser = await userProvider.createSingle(createParams);

    return newUser;
  }

  /**
   * Generate and send forgot token to user email for restore password
   * @param {DTO.Request.checkEmailDTO} email
   * @returns {Promise<{ error: Boolean, success: String }>}
   */
  async forgotPassTVMobile({ email }) {
    const token = utility.generateForgotPassToken(50);

    /** @type {Pick<DTO.Entity.UserDTO, 'isBlocked'|'accessToken'|'email'|'fullName'|'userName'|'securityToken'|'forgotToken'>} */
    const userData = await userProvider.getSingleAndUpdate(
      { email: email.toLowerCase(), isDeleted: false },
      { forgotToken: token }
    );

    if (!userData) {
      throw HttpException.UNAUTHORIZED(`No account found with this email.`);
    }

    if (userData.isBlocked) {
      throw HttpException.FORBIDDEN(`Your account was blocked!`);
    }

    if (userData.accessToken) {
      throw HttpException.BAD_REQUEST(`Confirm your email first!`);
    }

    await Promise.all([
      redisAdapter.delKeys(
        await redisAdapter.remapRelation(CACHE_RELATIONS[CACHE_ENTITIES.MODELS.User], {
          userId: userData._id.toString(),
        })
      ),
      redisAdapter.delKeys(
        await redisAdapter.remapRelation(CACHE_RELATIONS.AUTH, {
          userId: userData._id.toString(),
        })
      ),
    ]);

    events.Email.forgotPassword({
      email: userData.email,
      fullName: userData.fullName || userData.userName,
      token,
      securityToken: userData.securityToken,
      isMobile: false,
    });

    return { error: false, success: 'Message sent' };
  }

  /**
   * Restore user password action
   * @param {DTO.Request.resetPassDTO} params
   * @returns {Promise<{ status: Boolean }>}
   */
  async resetPassTV({ token, password }) {
    const user = await userProvider.getSingle({ forgotToken: token, isDeleted: false }, { _id: 1 });

    if (!user) {
      throw HttpException.BAD_REQUEST(`The token is invalid or has expired!`);
    }

    const updateObj = {
      accessToken: null,
      forgotToken: uuid.v4(),
      password: this._generateHash(password),
    };

    await userProvider.updateSingle({ forgotToken: token }, updateObj);

    return { status: true };
  }

  /**
   * Get all users purchases
   * @param {DTO.Request.getUserPurchasesDTO} params
   * @returns {Promise<[Object[], Number]>} List of purchases and total count
   */
  async getUserPurchases({
    skip,
    limit,
    userId,
    search,
    searchRegExp,
    filter,
    sortType,
    sortValue,
  }) {
    const result = await purchaseProvider.aggregationCached({
      userId,
      name: buildAPICacheKey({
        scope: CACHE_SCOPES.Model,
        entity: CACHE_ENTITIES.MODELS.Purchase,
        identifiers: [
          userId,
          hashIdentifiers({
            search,
            filter,
            sortType,
            sortValue,
            skip,
          }),
        ],
      }),
      async data() {
        const options = { limit, skip, searchRegExp, userId, filter, sortType, sortValue };

        if (!filter && !searchRegExp) {
          /** @type {Pick<DTO.Entity.UserDTO, 'purchasesCount'>} */
          const { purchasesCount } = await userProvider.getSingleById(userId, {
            purchasesCount: 1,
          });

          const [data] = await purchaseProvider.getUserPurchases({
            ...options,
            needTotal: false,
          });

          return [data, purchasesCount.total];
        }

        const data = await purchaseProvider.getUserPurchases(options);

        return data;
      },
    });

    return result;
  }

  /**
   * Get all users transactions
   * @param {DTO.Request.getUserPurchasesDTO} params
   * @returns {Promise<[Object[], Number]>} List of purchases and total count
   */
  async getUserTransactions({
    skip,
    limit,
    userId,
    search,
    searchRegExp,
    filter,
    sortType,
    sortValue,
  }) {
    const result = await purchaseProvider.aggregationCached({
      userId,
      name: buildAPICacheKey({
        scope: CACHE_SCOPES.Model,
        entity: CACHE_ENTITIES.MODELS.Purchase,
        identifiers: [
          userId,
          hashIdentifiers({
            ceekTechnology: CONSTANTS.CEEK_TECHNOLOGIES.NUXT,
            search,
            filter,
            sortType,
            sortValue,
            skip,
          }),
        ],
      }),
      async data() {
        const options = { limit, skip, searchRegExp, userId, filter, sortType, sortValue };

        if (!filter && !searchRegExp) {
          /** @type {Pick<DTO.Entity.UserDTO, 'purchasesCount'>} */
          const { purchasesCount } = await userProvider.getSingleById(userId, {
            purchasesCount: 1,
          });

          const [data] = await purchaseProvider.getUserTransactions({
            ...options,
            needTotal: false,
          });

          return [data, purchasesCount.total];
        }

        const data = await purchaseProvider.getUserTransactions(options);

        return data;
      },
    });

    return result;
  }

  /**
   * Confirm password change
   * @param {DTO.Request.tokenDTO} DTO
   * @returns {Promise<boolean>}
   */
  async confirmChangePassword({ token }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'passwordConfirm'|'fullName'|'email'|'userName'>} */
    const user = await userProvider.getSingle(
      { 'passwordConfirm.token': token, isDeleted: false },
      { passwordConfirm: 1, fullName: 1, email: 1, userName: 1 }
    );

    if (!user || user.passwordConfirm.date.getTime() < new Date().getTime()) {
      if (user) {
        await userProvider.setUpdateSingleById(user._id, { passwordConfirm: {} });
      }

      throw HttpException.BAD_REQUEST(`The token has expired.`);
    }

    const date = new Date();

    await userProvider.updateSingleById(user._id, {
      passwordConfirm: {},
      password: user.passwordConfirm.password,
    });

    events.Email.successChangePassword({
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      date,
    });

    await Promise.all([
      redisAdapter.delKeys(
        await redisAdapter.remapRelation(CACHE_RELATIONS[CACHE_ENTITIES.MODELS.User], {
          userId: user._id.toString(),
        })
      ),
      redisAdapter.delKeys(
        await redisAdapter.remapRelation(CACHE_RELATIONS.AUTH, {
          userId: user._id.toString(),
        })
      ),
    ]);

    return true;
  }

  /**
   * Unset email.
   * User should have facebook id for this action
   * @param {DTO.Request.removeEmailDTO} fbId
   * @returns {Promise<{ status: boolean, user: object }>} oepration status and user model
   */
  async removeEmail({ fbId }) {
    const user = await userProvider.getSingle({ fbId, isDeleted: false }, { _id: 1 });

    if (!user) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    const userId = user._id;

    const updatedUser = await userProvider.updateProfile({
      userId,
      update: { email: null, accessToken: '' },
    });

    updatedUser.avatar = updatedUser.avatar
      ? await contentParser.computeUrl({
          fileName: updatedUser.avatar,
          bucket: BUCKETS.AVATARS,
          lifeTime: CONSTANTS.AWS_URL_LIFE_TIME.FOR_AVATAR,
        })
      : '';

    const result = { ...updatedUser, fbLogin: true };

    return { status: true, user: result };
  }

  /**
   * Generate confrimation mail options
   * @param {DTO.Request.User} DTO
   * @returns {Promise<{
   *  fullName: String,
   *  email: String,
   *  token: String
   * }>}
   */
  async confirmEmail({ userId }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'email'|'accessToken'|'fullName'|'userName'>} */
    const user = await userProvider.getSingle(
      { _id: userId, isDeleted: false },
      {
        email: 1,
        accessToken: 1,
        fullName: 1,
        userName: 1,
      }
    );

    if (!user) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    const { email, accessToken: token, fullName, userName } = user;

    if (!token) {
      throw HttpException.BAD_REQUEST(`Email is already confirmed!`);
    }

    const name = fullName || userName || 'User';

    const sendEmailParams = {
      fullName: name,
      email,
      token,
    };

    return sendEmailParams;
  }

  /**
   * Get user favorite content
   * @param {DTO.Request.getAllUserFavoritesDTO} DTO
   * @returns {Promise<{ data: Object[], total: Number }>}
   */
  async getAllUserFavorites({
    userId,
    userAge,
    uAgeParam,
    value,
    field,
    skip,
    limit,
    type,
    searchRegExp,
    isMobile,
  }) {
    switch (type) {
      case CONSTANTS.MY_LIST_TYPE.FAVORITES: {
        const contentsId = await likesProvider.getEntityIdsForUser({ userId });

        const result = await contentProvider.getUserFavoriteContent({
          userId,
          userAge,
          skip,
          limit,
          value,
          field,
          searchRegExp,
          contentsId,
          isMobile,
        });

        if (isMobile) {
          const { data, total } = result;
          const mobileData = await contentParser.mobileParser(data);

          return { data: mobileData, total };
        }

        return result;
      }

      case CONSTANTS.MY_LIST_TYPE.WATCHED: {
        const contentsId = await viewsProvider.getEntityIdsForUser({ userId });

        const result = await contentProvider.getUserFavoriteContent({
          userId,
          userAge,
          skip,
          limit,
          value,
          field,
          searchRegExp,
          type,
          isMobile,
          contentsId,
        });

        if (isMobile) {
          const { data, total } = result;
          const mobileData = await contentParser.mobileParser(data);

          return { data: mobileData, total };
        }

        return result;
      }

      case CONSTANTS.MY_LIST_TYPE.RECOMMENDED: {
        const userPreferences = await userPreferencesProvider.getSingle({ userId });

        return contentProvider.getUserFavoriteContent({
          userId,
          userAge,
          skip,
          limit,
          value,
          field,
          searchRegExp,
          type,
          userPreferences,
        });
      }

      case CONSTANTS.MY_LIST_TYPE.ARTISTS: {
        const favoriteArtists = await likesProvider.getEntityIdsForUser({
          userId,
          entity: CONSTANTS.MODELS.ARTISTS,
        });

        return artistProvider.getUserFavoriteArtists({
          userId,
          searchRegExp,
          favoriteArtists,
          field,
          value,
          skip,
          limit,
          uAgeParam,
          isMobile,
        });
      }

      case CONSTANTS.MY_LIST_TYPE.CHANNELS: {
        const favoriteChannels = await likesProvider.getEntityIdsForUser({
          userId,
          entity: CONSTANTS.MODELS.CHANNELS,
        });

        return channelProvider.getUserFavoriteChannels({
          userId,
          searchRegExp,
          favoriteChannels,
          field,
          value,
          skip,
          limit,
          userAge,
          uAgeParam,
          isMobile,
        });
      }

      case CONSTANTS.MY_LIST_TYPE.POSTS: {
        const favoriteBlogs = await likesProvider.getEntityIdsForUser({
          userId,
          entity: CONSTANTS.MODELS.BLOGS,
        });

        return blogProvider.getUserFavoriteBlogs({
          userId,
          searchRegExp,
          favoriteBlogs,
          field,
          value,
          skip,
          limit,
        });
      }

      case CONSTANTS.MY_LIST_TYPE.EVENTS: {
        const [data, total] = await contentProvider.getMyEventsForPage({
          uAgeParam,
          userId,
          searchRegExp,
          skip,
          limit,
          field,
          value,
        });

        return { data, total };
      }

      default:
        return {};
    }
  }

  /**
   * Set user watcheing video position to redis
   * @param {DTO.Request.playVideoPositionDTO} DTO
   * @returns {Promise<void>}
   */
  async playVideoPosition({ contentId, userId, position }) {
    let newPosition = position;
    const userIdString = userId.toString();

    const [content, contentPosition] = await Promise.all([
      contentProvider.getSingleById(contentId, { showTV: 1, duration: 1, private: 1 }),
      redisAdapter.getValue(
        buildAPICacheKey({
          scope: CACHE_SCOPES.Model,
          entity: CACHE_ENTITIES.MODELS.ContentPosition,
          identifiers: [contentId, userIdString],
        })
      ),
    ]);

    if (!content || (!content.showTV && !content.private)) {
      throw HttpException.BAD_REQUEST(`This video is not exist or is not online.`);
    }

    // @ts-ignore
    if (position > parseInt(content.duration / 1000, 10)) {
      throw HttpException.UNAUTHORIZED(`Incorrect position value has been provided!`);
    }

    // @ts-ignore
    if (position === parseInt(content.duration / 1000, 10)) {
      newPosition = 0;
    }

    if (contentPosition) {
      await redisAdapter.delKeys(
        await redisAdapter.remapRelation(CACHE_RELATIONS[CACHE_ENTITIES.MODELS.ContentPosition], {
          contentId,
          userId: userIdString,
        })
      );
    }

    await redisAdapter.setKey(
      buildAPICacheKey({
        scope: CACHE_SCOPES.Model,
        entity: CACHE_ENTITIES.MODELS.ContentPosition,
        identifiers: [contentId, userIdString],
      }),
      newPosition
    );
  }

  // ================ Mobile Services ================

  /**
   * Sign in user by email for mobile
   * @param {DTO.Request.signInMobileDTO} params
   * @returns {Promise<object>}
   */
  async signInViaEmailMobile({ email, userName, password, ipAddress }) {
    const user = await userProvider.getUserForLogin({ email, userName, isTV: false });

    if (!user) {
      throw HttpException.UNAUTHORIZED(`No account found with the specified credentials.`);
    }

    const oldPass = user.password;
    const userId = user._id;
    const encryptedPass = this._generateHash(password);

    if (oldPass !== encryptedPass) {
      throw HttpException.UNAUTHORIZED(`Incorrect credentials has been provided!`);
    }

    if (!user.isActiveAccount) {
      throw HttpException.UNAUTHORIZED(`Your account was deactivated!`);
    }

    if (user.isBlocked) {
      throw HttpException.FORBIDDEN(`Your account was blocked!`);
    }

    if (!user.isConfirm) {
      throw HttpException.UNAUTHORIZED(
        `Please check your email to confirm your account before you can login.`
      );
    }

    if (ipAddress && !user.ip_address && userId) {
      await userProvider.setUpdateSingleById(userId, { ip_address: ipAddress });
    }

    delete user.password;

    delete user.ip_address;

    delete user.accessToken;

    userProvider.updateSingle({ _id: user._id }, { lastLogin: new Date() });

    return user;
  }

  /**
   * Sign up mobile user by facebook
   * @param {DTO.Request.signInMobileDTO | DTO.Request.signUpMobileDTO} DTO
   * @returns {Promise<object>} user model
   */
  async signInSignUpFbUserMobile({ token, fbId, ipAddress, source }) {
    let isNew = false;

    const createParams = {
      ip_address: ipAddress,
      fbId,
      role: CONSTANTS.ROLES.CART_USER,
    };

    let user = await userProvider.getUserForLogin({ fbId, isTV: false });

    if (!user) {
      if (!token) {
        throw HttpException.BAD_REQUEST('Facebook token is required');
      }

      const fbUser = await this._getUserFromFB(token, fbId);

      if (fbUser.fullName) {
        createParams.fullName = fbUser.fullName;
      }

      if (fbUser.gender) {
        createParams.gender = fbUser.gender;
      }

      if (fbUser.avatar) {
        createParams.avatar = fbUser.avatar;
      }

      if (!createParams.email) {
        createParams.accessToken = '';
      }

      const accessProfileModel = await accessProvider.getSingle(
        { name: ACCESS_ROLES.USER.name },
        { _id: 1 }
      );

      createParams.accessProfileId = accessProfileModel._id;

      isNew = true;

      await userProvider.createSingle(createParams);

      user = await userProvider.getUserForLogin({ fbId, isTV: false });
    } else if (user.accessToken) {
      throw HttpException.UNAUTHORIZED(
        `Please check your email to confirm your account before you can login.`
      );
    }

    if (!user.isActiveAccount) {
      throw HttpException.UNAUTHORIZED(`Your account was deactivated!`);
    }

    if (user.isBlocked) {
      throw HttpException.FORBIDDEN(`Your account was blocked!`);
    }

    if (!user.isConfirm) {
      throw HttpException.UNAUTHORIZED(
        `Please check your email to confirm your account before you can login.`
      );
    }

    if (ipAddress && !user.ip_address && user._id) {
      await userProvider.setUpdateSingleById(user._id, { ip_address: ipAddress, source });
    }

    delete user.password;

    delete user.ip_address;

    delete user.accessToken;

    if (isNew && user.email) {
      events.Email.signUp({
        email: user.email,
        token: user.accessToken,
        fullName: user.fullName || '',
        userName: user.userName,
      });
    }

    userProvider.updateSingle({ _id: user._id }, { lastLogin: new Date() });

    return user;
  }

  /**
   * Sign up mobile user by email
   * @param {DTO.Request.signUpMobileDTO} DTO
   * @returns {Promise<{ userResult: object, accessToken: string }>} user model and access token
   */
  async signUpCartUserViaEmailMobile({
    email,
    password,
    ipAddress,
    source,
    birthDate,
    userName,
    gender,
  }) {
    const existingUser = await userProvider.getUserByEmailUserName(email, userName);

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        throw HttpException.CONFLICT(
          `The email address is already in use, please provide another email address.`
        );
      }

      if (userName && existingUser.userName.toLowerCase() === userName.toLowerCase()) {
        throw HttpException.CONFLICT(
          `The username is already in use, please provide another username.`
        );
      }
    }

    const encryptedPass = this._generateHash(password);

    const createParams = {
      email: email.toLowerCase(),
      password: encryptedPass,
      role: CONSTANTS.ROLES.CART_USER,
      ip_address: ipAddress,
      source,
    };

    if (ipAddress) {
      const [info] = await geoIpAdapter.fetchIpInfo([ipAddress]);

      createParams.ip_country = info.country_name;

      createParams.ip_region = info.state_prov || info.district;

      createParams.ip_city = info.city;
    }

    if (birthDate) {
      const validate = dateHelper.checkDateOfBirth(birthDate);

      if (!validate.parsed) {
        throw HttpException.BAD_REQUEST(`Invalid birth date has been provided.`);
      }

      if (!validate.valid) {
        throw HttpException.BAD_REQUEST(`A future date is not allowed for the date of birth`);
      }

      createParams.birthDate = birthDate;
    }

    if (userName) {
      createParams.userName = userName;

      createParams.userNameSearch = userName.toLowerCase();
    }

    if (gender) {
      if (![CONSTANTS.GENDER.MALE, CONSTANTS.GENDER.FEMALE].includes(gender.toLowerCase())) {
        throw HttpException.BAD_REQUEST(`Invalid gender has been provided.`);
      }

      createParams.gender = gender.toLowerCase();
    }

    const accessProfileModel = await accessProvider.getSingle(
      { name: ACCESS_ROLES.USER.name },
      { _id: 1 }
    );

    createParams.accessProfileId = accessProfileModel._id;

    const user = await userProvider.createSingle(createParams);

    user.avatar = user.avatar
      ? await contentParser.computeUrl({
          fileName: user.avatar,
          bucket: BUCKETS.AVATARS,
        })
      : '';

    const { _id, role, fullName, avatar, coins, accessProfileId, isActiveAccount } = user;

    const userResult = {
      _id,
      email: user.email,
      role,
      userName: user.userName,
      fullName,
      gender: user.gender,
      avatar,
      coins,
      accessProfileId,
      isActiveAccount,
      isConfirm: [null, ''].includes(user.accessToken),
      birthDate: user.birthDate ? user.birthDate : 'Unspecified',
    };

    return { userResult, accessToken: user.accessToken };
  }

  /**
   * Sign up/in  user by Apple
   * @param {DTO.Request.authAppleUserDTO} DTO
   * @returns {Promise<object>} user model
   */
  async authAppleUser({ token, ipAddress }) {
    const { email, exp } = await appleAuthAdapter.verify(token);

    if (!email) {
      throw HttpException.BAD_REQUEST('Invalid identity token has been provided.');
    }

    let user = await userProvider.getUserForLogin({ appleId: email, isTV: false });

    if (!user) {
      await userProvider.createSingle({
        identityToken: token,
        appleId: email,
        isActiveAccount: true,
        twoFactorAuthorize: false,
        ip_address: ipAddress,
        role: CONSTANTS.ROLES.CART_USER,
      });

      user = await userProvider.getUserForLogin({ appleId: email, isTV: false });
    }

    if (user.isBlocked) {
      throw HttpException.FORBIDDEN(`Your account was blocked!`);
    }

    if (ipAddress && !user.ip_address && user._id) {
      await userProvider.setUpdateSingleById(user._id, { ip_address: ipAddress });
    }

    delete user.password;

    delete user.ip_address;

    delete user.accessToken;

    user.identifyToken = {
      token,
      exp: exp ? new Date(exp) : new Date(),
    };

    userProvider.updateSingle({ _id: user._id }, { lastLogin: new Date() });

    return user;
  }

  /**
   * Reset password action mobile
   * @param {DTO.Request.resetPassDTO} params
   * @returns {Promise<object>}
   */
  async resetPassMobile({ token, password }) {
    const user = await userProvider.getSingle({ forgotToken: token, isDeleted: false });

    if (!user) {
      throw HttpException.BAD_REQUEST(`The token is invalid or has expired!`);
    }

    const updateObj = {
      accessToken: null,
      forgotToken: uuid.v4(),
      password: this._generateHash(password),
    };

    await Promise.all([
      redisAdapter.delKeys(
        await redisAdapter.remapRelation(CACHE_RELATIONS[CACHE_ENTITIES.MODELS.User], {
          userId: user._id.toString(),
        })
      ),
      redisAdapter.delKeys(
        await redisAdapter.remapRelation(CACHE_RELATIONS.AUTH, {
          userId: user._id.toString(),
        })
      ),
    ]);

    return userProvider.updateSingle({ forgotToken: token }, updateObj);
  }

  /**
   * @param {string} token
   */
  async forgotPassByTokenMobile(token) {
    const result = await userProvider.getSingle(
      { forgotToken: token, isDeleted: false },
      { _id: 1 }
    );

    return result;
  }

  /**
   * @param {DTO.Request.getUserByIdDTO} DTO
   * @returns {Promise<object>}  user model without sensitive data
   */
  async getUserById({ targetId }) {
    const user = await userProvider.getUserById(targetId);

    if (!user) {
      throw HttpException.NOT_FOUND(`User not found!`);
    }

    return user;
  }

  /**
   * Update user online status in room
   * @param {DTO.Request.updateOnlineStatusDTO & {sid:string}} params
   * @returns {Promise<void>}
   */
  async updateOnlineStatus({ roomId, userId, sid }) {
    const [roomRD, roomMDB, [userMDB], userRD] = await Promise.all([
      redisAdapter
        .getHashValuesByKeys(
          buildAPICacheKey({
            scope: CACHE_SCOPES.OnlineRooms,
            entity: CACHE_ENTITIES.ONLINE_ROOMS.Rooms,
          }),
          [roomId]
        )
        .then((items) => (items.length && JSON.parse(items)) || null),
      roomProvider.getSingleById(roomId, { capacity: 1, isMultiplayer: 1, bannedUsers: 1 }),
      userProvider.multiplayerUser(userId),
      redisAdapter
        .getSortedSetMembersValues(
          buildAPICacheKey({
            scope: CACHE_SCOPES.OnlineRooms,
            entity: CACHE_ENTITIES.ONLINE_ROOMS.Users,
          }),
          `*${userId.toString()}*`
        )
        .then(([item]) => item && JSON.parse(item)),
    ]);

    if (!roomRD || !roomMDB) {
      throw HttpException.BAD_REQUEST('This room is not online');
    }

    if (!roomMDB.isMultiplayer) {
      throw HttpException.FORBIDDEN('This venue is not multiplayer ready');
    }

    if (roomMDB.bannedUsers.find((user) => user._id.toString() === userId.toString())) {
      throw HttpException.FORBIDDEN('Current user is banned');
    }

    const didimoAvatarDB = userMDB?.didimoAvatar || null;

    delete userMDB.didimoAvatar;

    const didimoFields = {
      didimoFile: userRD?.didimoFile || '',
      didimoFrontImage: userRD?.didimoFrontImage || '',
    };

    // generated Didimo url for file and frontImage
    if (!userRD && didimoAvatarDB) {
      const fileKey = didimoAvatarDB?.file || '';

      const frontImageKey = didimoAvatarDB?.frontImage || '';

      // private zip file
      if (fileKey) {
        const awsLinkFile = await amazonS3Adapter.getObjectUrlFromAmazon({
          name: fileKey,
          bucket: BUCKETS.FILES,
          lifeTime: CONSTANTS.AWS_URL_LIFE_TIME.FILE_DIDIMO,
        });

        didimoFields.didimoFile = awsLinkFile || '';
      }

      // public avatar
      if (frontImageKey) {
        const awsLinkFrontImage = `https://${BUCKETS.AVATARS}.s3.amazonaws.com/${frontImageKey}`;

        didimoFields.didimoFrontImage = awsLinkFrontImage || '';
      }
    }

    if (userRD) {
      if (userRD.sid !== sid) {
        throw HttpException.FORBIDDEN(
          'Only one "multiplayer" session allowed for user at the time. Please leave the previous venue and try again'
        );
      }

      // remove old Users and UsersPagination sets members
      await Promise.all([
        redisAdapter.delSortedSetMembers(
          buildAPICacheKey({
            scope: CACHE_SCOPES.OnlineRooms,
            entity: CACHE_ENTITIES.ONLINE_ROOMS.UsersPagination,
          }),
          [userId.toString()]
        ),
        redisAdapter.delSortedSetMembers(
          buildAPICacheKey({
            scope: CACHE_SCOPES.OnlineRooms,
            entity: CACHE_ENTITIES.ONLINE_ROOMS.Users,
          }),
          [JSON.stringify(userRD)]
        ),
      ]);
    }

    await Promise.all([
      redisAdapter.setSortSetKeyToEnd(
        buildAPICacheKey({
          scope: CACHE_SCOPES.OnlineRooms,
          entity: CACHE_ENTITIES.ONLINE_ROOMS.Users,
        }),
        new Date().getTime() + 60000,
        JSON.stringify({
          ...userMDB,
          ...didimoFields,
          room: roomRD.externalID,
          roomId,
          sid,
        })
      ),
      redisAdapter.setSortSetKeyToEnd(
        buildAPICacheKey({
          scope: CACHE_SCOPES.OnlineRooms,
          entity: CACHE_ENTITIES.ONLINE_ROOMS.UsersPagination,
        }),
        null,
        [userId.toString()]
      ),
    ]);

    const roomUsers = await redisAdapter.getSortedSetMembersValues(
      buildAPICacheKey({
        scope: CACHE_SCOPES.OnlineRooms,
        entity: CACHE_ENTITIES.ONLINE_ROOMS.Users,
      }),
      `*${roomId}*`
    );

    await redisAdapter.setHashKey(
      buildAPICacheKey({
        scope: CACHE_SCOPES.OnlineRooms,
        entity: CACHE_ENTITIES.ONLINE_ROOMS.Rooms,
      }),
      roomId,
      JSON.stringify({
        internalID: roomRD.internalID,
        externalID: roomRD.externalID,
        countUser: roomUsers.length,
      })
    );

    return true;
  }

  /**
   * Update mobile user avatar
   * @param {DTO.Request.updateMobileAvatarDTO & {token?:string}} params
   * @returns {Promise<void>}
   */
  async updateMobileAvatar({
    userId,
    avatar,
    skinnedMeshRender,
    hair,
    eyes,
    color,
    name,
    didimoId,
    token,
    typeFace,
  }) {
    const updateObj = {};

    /* 
      copy didimo file with Didimo to AWS.
      we don't wait for full copying, we just start the event.
    */
    if (didimoId) {
      const userDidimo = await userProvider.getSingle(
        { 'didimoAvatar.id': didimoId, _id: userId },
        { _id: 1 }
      );

      const dataFile = await redisAdapter
        .getValue(
          buildAPICacheKey({
            scope: CACHE_SCOPES.Processing,
            entity: CACHE_ENTITIES.PROCESSING.Didimo,
            identifiers: [userId],
          })
        )
        .then((data) => JSON.parse(data));

      if (dataFile && dataFile?.status === FILES.STATUS.PROCESSING) {
        throw HttpException.CONFLICT('This didimoId is processing');
      }

      if (userDidimo) {
        throw HttpException.CONFLICT('This didimoId is loaded');
      }

      const existDidimo = await didimoApiAdapter.existDidimo({ didimoId });

      if (!existDidimo) {
        throw HttpException.NOT_FOUND('didimoId NOT FOUND ');
      }

      const response = await SimpleAdapter.post({
        path: `${CMS_HOST}/cms/user/saveDidimoAvatar?authorization=${token}`,
        body: { didimoId },
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data?.error) {
        throw HttpException.BAD_REQUEST(response.data.error);
      }
    }

    if (avatar && Array.isArray(avatar)) {
      updateObj.mobileAvatar = avatar;
    }

    if (skinnedMeshRender) {
      updateObj.skinnedMeshRender = skinnedMeshRender;
    }

    if (hair) {
      updateObj.hair = hair;
    }

    if (eyes) {
      updateObj.eyes = eyes;
    }

    if (color) {
      updateObj.color = color;
    }

    if (name) {
      updateObj.userName = name;
    }

    if (typeFace) {
      updateObj.typeFace = typeFace;
    }

    await userProvider.setUpdateSingleById(userId, updateObj);

    await redisAdapter.delKeys(
      await redisAdapter.remapRelation(CACHE_RELATIONS[CACHE_ENTITIES.MODELS.User], {
        userId,
      })
    );

    return { success: true, ...(didimoId ? { statusDidimo: FILES.STATUS.PROCESSING } : {}) };
  }

  /**
   * Email confirmation action
   * @param {DTO.Request.verifyUserEmailDTO} DTO
   * @returns {Promise<{ result: string }>}
   */
  async verifyUserEmail({ token, email }) {
    if (email) {
      /** @type {Pick<DTO.Entity.UserDTO, 'accessToken'>} */
      const user = await userProvider.getSingle(
        { email: email.toLowerCase(), isDeleted: false },
        { _id: 1, accessToken: 1 }
      );

      if (user && !user.accessToken) {
        return { result: 'The registration is already confirmed' };
      }
    }

    /** @type {Pick<DTO.Entity.UserDTO, 'BSCWalletAddress'>} */
    const user = await userProvider.getSingle(
      { accessToken: token },
      { _id: 1, BSCWalletAddress: 1 }
    );

    if (!user) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    await Promise.all([
      userProvider.setUpdateSingleById(user._id, { accessToken: null }),
      emailProvider.setUpdateSingle({ email: email.toLowerCase() }, { isConfirm: true }),
    ]);

    if (!user.BSCWalletAddress) {
      events.Purchase.createWallet(user._id);
    }

    return { result: 'Your Registration is confirmed. Please login' };
  }

  /**
   * Get user market address
   * @param {DTO.Request.User} DTO
   * @returns {Promise<String>}
   */
  async getMarketAddress({ userId }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'marketAddress'|'isBlocked'>} */
    const user = await userProvider.getSingleById(userId, { marketAddress: 1, isBlocked: 1 });

    if (!user) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    if (user.isBlocked) {
      throw HttpException.NOT_FOUND('User blocked!');
    }

    return user.marketAddress || '';
  }

  /**
   * Set user market address
   * @param {DTO.Request.setMarketAddressDTO} DTO
   * @returns {Promise<boolean>}
   */
  async setMarketAddress({ userId, marketAddress }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'isBlocked'>} */
    const user = await userProvider.getSingleById(userId, { _id: 1, isBlocked: 1 });

    if (!user) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    if (user.isBlocked) {
      throw HttpException.NOT_FOUND('User blocked!');
    }

    if (marketAddress) {
      await userProvider.setUpdateSingleById(userId, { marketAddress });
    }

    return true;
  }

  /**
   * Mark user account as deleted
   * @param {DTO.Request.User} DTO
   * @returns {Promise<boolean>}
   */
  async deleteAccount({ userId }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'email'|'fullName'> & {_id: ObjectId}} */
    const user = await userProvider.getSingleById(userId, {
      _id: 1,
      email: 1,
      fullName: 1,
    });

    if (!user) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    await Promise.all([
      purchaseProvider.setUpdateMany({ 'user.id': user._id }, { dateEnd: new Date() }),
      userProvider.setUpdateSingleById(userId, {
        isDeleted: true,
        updatedAt: new Date(),
        deletedBy: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          deletedAt: new Date(),
        },
      }),
    ]);

    return true;
  }

  /**
   * @description get user superPowers
   * @param {DTO.Request.User} DTO
   * @returns {Promise<Object>}
   */
  async getSuperPowers({ userId }) {
    const result = await userProvider.aggregationCached({
      userId,
      name: buildAPICacheKey({
        scope: CACHE_SCOPES.Model,
        entity: CACHE_ENTITIES.MODELS.User,
        identifiers: [userId, 'superPowers'],
      }),
      async data() {
        /** @type {Pick<DTO.Entity.UserDTO, 'userName'|'email'|'superPowers'>} */
        const userData = await userProvider.getSingleById(userId, {
          _id: 1,
          userName: 1,
          email: 1,
          superPowers: 1,
        });

        if (!userData) {
          throw HttpException.NOT_FOUND(`User not found!`);
        }

        const superPowers = {};

        if (userData) {
          // convert numbers to booleans
          // superPowers: { jump: 3, run: 0 } ===> { jump: true, run: false }
          for (const superPower of userData.superPowers) {
            superPowers[superPower.name] = superPower.score > 0;
          }
        }

        userData.superPowers = superPowers;

        return userData;
      },
    });

    return result;
  }

  /**
   * Update user profile
   * @param {DTO.Request.updateNFTProfileDTO} DTO
   * @returns {Promise<Object>}
   */
  async updateNFTProfile({
    userEmail,
    userName,
    userBio,
    nameInTwitter,
    gender,
    birthDate,
    portfolioUrl,
    customUrl,
    userId,
    source,
  }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'email'|'fbId'|'fullName'|'userName'> & {_id: ObjectId}} */
    const user = await userProvider.getSingleById(userId, {
      _id: 1,
      email: 1,
      fbId: 1,
      fullName: 1,
      userName: 1,
    });

    if (!user) {
      throw HttpException.NOT_FOUND(`User not found!`);
    }

    const newEmail = userEmail && user.email !== userEmail.toLowerCase();

    const updateObj = {};

    if (newEmail) {
      const existEmail = await userProvider.getSingle(
        { email: userEmail.toLowerCase() },
        { _id: 1 }
      );

      if (existEmail) {
        throw HttpException.CONFLICT(
          `The email address is already in use, please provide another email address.`
        );
      }
    }

    if (userName) {
      const userNameValid = userName
        .replace(REGULAR_EXPRESSIONS.SPEC_SYMBOLS, '')
        .replace(/ +$/, '');

      const existUserName = await userProvider.getSingle({
        userNameSearch: userNameValid.toLowerCase(),
      });

      if (existUserName) {
        throw HttpException.CONFLICT(
          `The username is already in use, please provide another username.`
        );
      }

      updateObj.userName = userName;

      updateObj.userNameSearch = userName.toLowerCase();
    }

    if (userBio) {
      updateObj.userBio = userBio;
    } else if (userBio === '') {
      updateObj.userBio = '';
    }

    if (gender) {
      updateObj.gender = gender;
    }

    if (birthDate) {
      const validate = dateHelper.checkDateOfBirth(birthDate);

      if (!validate.parsed) {
        throw HttpException.BAD_REQUEST(`Invalid birth date has been provided.`);
      }

      if (!validate.valid) {
        throw HttpException.BAD_REQUEST(`A future date is not allowed for the date of birth`);
      }

      updateObj.birthDate = birthDate;
    }

    if (nameInTwitter) {
      updateObj.nameInTwitter = nameInTwitter;
    } else if (nameInTwitter === '') {
      updateObj.nameInTwitter = '';
    }

    if (portfolioUrl) {
      updateObj.portfolioUrl = portfolioUrl;
    } else if (portfolioUrl === '') {
      updateObj.portfolioUrl = '';
    }

    if (customUrl) {
      const userWithUrl = await userProvider.getSingle(
        { customUrl: customUrl.toLocaleLowerCase() },
        {
          _id: 1,
        }
      );

      if (userWithUrl && userWithUrl._id.toString() !== user._id.toString()) {
        throw HttpException.CONFLICT('Already taken');
      }

      updateObj.customUrl = customUrl.toLowerCase();
    } else if (customUrl === '') {
      updateObj.customUrl = '';
    }

    if (userEmail) {
      updateObj.email = userEmail.toLowerCase();

      if (user.fbId) {
        const newAccessToken = uuid.v1();

        updateObj.accessToken = newAccessToken;

        events.Email.signUp({
          email: userEmail,
          token: newAccessToken,
          fullName: user.fullName,
          userName: updateObj.userName || user.userName,
          source,
        });
      }
    }

    const updatedUser = await userProvider.updateNFTProfile({
      userId: user._id,
      update: updateObj,
    });

    if (user.email !== updatedUser.email || user.userName !== updatedUser.userName) {
      await purchaseProvider.setUpdateMany(
        { 'user.id': updatedUser._id },
        {
          'user.email': updatedUser.email,
          'user.userName': updatedUser.userName,
          userName: updatedUser.userName,
        }
      );

      await emailProvider.setUpdateMany(
        { user_id: updatedUser._id },
        {
          email: updatedUser.email,
          userName: updatedUser.userName,
        }
      );
    }

    await redisAdapter.delKeys(
      await redisAdapter.remapRelation(CACHE_RELATIONS[CACHE_ENTITIES.MODELS.User], { userId })
    );

    if (newEmail) {
      await Promise.all([
        redisAdapter.delKeys(
          await redisAdapter.remapRelation(CACHE_RELATIONS[CACHE_ENTITIES.MODELS.User], {
            userId: updatedUser._id.toString(),
          })
        ),
        redisAdapter.delKeys(
          await redisAdapter.remapRelation(CACHE_RELATIONS.AUTH, {
            userId: updatedUser._id.toString(),
          })
        ),
      ]);
    }

    return updatedUser;
  }

  /**
   * @param { DTO.Request.getCryptoWalletsDTO} DTO
   * @returns {Promise<Object>}
   */
  async getCryptoWallets({ userId, token, forceUpdate = false }) {
    const curBalances = await redisAdapter
      .getValue(
        buildAPICacheKey({
          scope: CACHE_SCOPES.Utils,
          entity: CACHE_ENTITIES.UTILS.CryptoWalletBalances,
          identifiers: [userId],
        })
      )
      .then((data) => JSON.parse(data));

    if (!forceUpdate || curBalances.status === 'Updating') {
      return curBalances;
    }

    const balances = await UserService.updateCryptoBalances({ userId, token });

    // clear user's cache
    await redisAdapter.delKeys(await redisAdapter.remapRelation(CACHE_RELATIONS.ALL, { userId }));

    return balances;
  }

  // ================= External wallets =================

  /**
   * @description Get user's external wallets
   * @param {DTO.Request.Pagination} DTO - Object with method parameters
   * @returns {Promise<userProvider.GetExternalWalletsResult>}
   */
  async getExternalWallets({ userId, skip, limit }) {
    return userProvider.getExternalWallets({ userId, skip, limit });
  }

  /**
   * @description Add external wallet for user
   * @param {DTO.Request.addExternalWalletDTO} DTO - Object with method parameters
   * @returns {Promise<boolean>} - true if success, else throws error
   */
  async addExternalWallet({ userId, wallet, type }) {
    const isUserHaveThisWallet = await userProvider.checkExternalWallet({ userId, wallet });

    if (isUserHaveThisWallet) {
      throw HttpException.CONFLICT('User already have the same wallet');
    }

    await userProvider.addExternalWallet({ userId, wallet, type });

    return true;
  }

  /**
   * @description Update type of user's external wallet
   * @param {DTO.Request.updateExternalWalletDTO} options - Object with method parameters
   * @returns {Promise<Boolean>}
   */
  async updateExternalWallet({ walletAddress, walletType, userId }) {
    const walletData = await userProvider.getExternalWallet({ walletAddress, userId });

    if (!walletData) {
      throw HttpException.BAD_REQUEST(`User doesn't have wallet with this address`);
    }

    const { wallet, walletId } = walletData;

    if (walletData.type === walletType) {
      throw HttpException.BAD_REQUEST('Nothing to update');
    }

    await userProvider.updateExternalWallet({
      walletId,
      userId,
      walletType,
      walletAddress: wallet,
    });

    return true;
  }

  /**
   * @description Remove user's external wallet
   * @param {DTO.Request.removeExternalWalletDTO} DTO
   * @returns {Promise<Boolean>}
   */
  async removeExternalWallet({ userId, walletId }) {
    await userProvider.removeExternalWallet({ userId, walletId });

    return true;
  }

  /**
   * @description return link for download with AWS
   * @param {DTO.Request.getDidimoResultDTO} DTO
   * @returns {Promise<String>}
   */
  async getDidimoResult({ userId, type }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'didimoAvatar'>} */
    const user = await userProvider.getSingleById(userId, { didimoAvatar: 1 });

    if (!user) {
      throw HttpException.NOT_FOUND('user not found');
    }

    const dataFile = await redisAdapter
      .getValue(
        buildAPICacheKey({
          scope: CACHE_SCOPES.Processing,
          entity: CACHE_ENTITIES.PROCESSING.Didimo,
          identifiers: [userId],
        })
      )
      .then((data) => JSON.parse(data));

    if (dataFile && dataFile?.status === FILES.STATUS.PROCESSING) {
      throw HttpException.CONFLICT('This didimoId is processing');
    }

    if (type === CONSTANTS.DIDIMO_TYPE.FILE) {
      const fileKey = user?.didimoAvatar?.file || '';

      if (!fileKey) {
        throw HttpException.NOT_FOUND(`Not found ${CONSTANTS.DIDIMO_TYPE.FILE} url`);
      }

      const awsLinkFile = amazonS3Adapter.getObjectUrlFromAmazon({
        name: fileKey,
        bucket: BUCKETS.FILES,
      });

      if (!awsLinkFile) {
        throw HttpException.NOT_FOUND(`Not found ${CONSTANTS.DIDIMO_TYPE.FILE} url aws`);
      }

      return awsLinkFile;
    }

    if (type === CONSTANTS.DIDIMO_TYPE.FRONT_PNG || type === CONSTANTS.DIDIMO_TYPE.FONT_PNG) {
      const fontImageKey = user?.didimoAvatar?.frontImage || '';

      if (!fontImageKey) {
        throw HttpException.NOT_FOUND(`Not found ${CONSTANTS.DIDIMO_TYPE.FRONT_PNG} url`);
      }

      const awsLinkFontImage = await amazonS3Adapter.getObjectUrlFromAmazon({
        name: fontImageKey,
        bucket: BUCKETS.AVATARS,
      });

      if (!awsLinkFontImage) {
        throw HttpException.NOT_FOUND(`Not found ${CONSTANTS.DIDIMO_TYPE.FRONT_PNG} aws url`);
      }

      return awsLinkFontImage;
    }
  }

  /**
   * Get user market address
   * @param {DTO.Request.User} DTO
   * @returns {Promise<String>}
   */
  async getVotingAddress({ userId }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'isBlocked'|'isDeleted'> & {_id: ObjectId}} */
    const user = await userProvider.getSingleById(userId, {
      votingAddress: 1,
      isBlocked: 1,
      isDeleted: 1,
    });

    if (!user || user?.isDeleted || user?.isBlocked) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    return { votingAddress: user?.votingAddress || '', _id: user._id };
  }

  /**
   * Update user voting address
   * @param {DTO.Request.updateVotingAddressDTO} DTO
   * @returns {Promise<boolean>}
   */
  async updateVotingAddress({ userId, votingAddress }) {
    /** @type {Pick<DTO.Entity.UserDTO, 'isBlocked'|'isDeleted'> & {_id: ObjectId}} */
    const user = await userProvider.getSingleById(userId, {
      _id: 1,
      isBlocked: 1,
      isDeleted: 1,
      votingAddress: 1,
    });

    if (!user || user?.isDeleted || user?.isBlocked) {
      throw HttpException.NOT_FOUND('User not found!');
    }

    if (user?.votingAddress === votingAddress) {
      throw HttpException.CONFLICT('User already have the same wallet');
    }

    const existVotingAddress = await BSCTokenAdapter.checkExistWallet({
      BSCWalletAddress: votingAddress,
    });

    if (!existVotingAddress) {
      throw HttpException.NOT_FOUND('Your wallet was not found on BscScan.');
    }

    await userProvider.setUpdateSingleById(userId, { votingAddress });

    return true;
  }

  // ================ Helpers ================

  static async addNewCryptoWallet({ userId, provider, token, walletAddress, cacheOpts }) {
    // check if connection is already in progress
    const pendingConnection = await redisAdapter.getValue(buildAPICacheKey(cacheOpts));

    if (pendingConnection) {
      throw HttpException.FORBIDDEN('Wallet connection is curently in progress for this user');
    }

    // create pending record to block duplicate connections
    await redisAdapter.setKey(buildAPICacheKey(cacheOpts), JSON.stringify({ status: 'Pending' }));

    const curBalances = await redisAdapter
      .getValue(
        buildAPICacheKey({
          scope: CACHE_SCOPES.Utils,
          entity: CACHE_ENTITIES.UTILS.CryptoWalletBalances,
          identifiers: [userId],
        })
      )
      .then((data) => JSON.parse(data));

    // check if wallet already exists. if not add it to providers array
    const cud = curBalances.providers.find(
      (item) => item.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );

    if (!cud) {
      curBalances.providers.push({
        name: provider,
        walletAddress,
        chain: 'BNB',
      });
    }

    curBalances.status = 'Updating';

    await redisAdapter.setKey(
      buildAPICacheKey({
        scope: CACHE_SCOPES.Utils,
        entity: CACHE_ENTITIES.UTILS.CryptoWalletBalances,
        identifiers: [userId],
      }),
      JSON.stringify(curBalances)
    );

    const balances = await UserService.updateCryptoBalances({ userId, token });

    await redisAdapter.setKey(
      buildAPICacheKey({
        scope: CACHE_SCOPES.Utils,
        entity: CACHE_ENTITIES.UTILS.CryptoWalletBalances,
        identifiers: [userId],
      }),
      JSON.stringify(balances)
    );

    await Promise.all([
      redisAdapter.setKey(
        buildAPICacheKey({
          scope: CACHE_SCOPES.Utils,
          entity: CACHE_ENTITIES.UTILS.CryptoWalletBalances,
          identifiers: [userId],
        }),
        JSON.stringify(balances)
      ),
      !cud
        ? userProvider.addCryptoWallet({
            userId,
            wallet: {
              provider,
              address: walletAddress,
              chain: 'BNB',
            },
          })
        : '',
    ]);

    await redisAdapter.delByPattern(buildAPICacheKey(cacheOpts));

    // clear user's cache
    await redisAdapter.delKeys(await redisAdapter.remapRelation(CACHE_RELATIONS.ALL, { userId }));
  }

  static async updateCryptoBalances({ userId, token }) {
    const result = await SimpleAdapter.post({
      path: `${CMS_HOST}/cms/user/update-crypto-balances?authorization=${token}`,
      body: { id: userId },
      headers: { 'Content-Type': 'application/json' },
    });

    if (result.data?.error) {
      throw HttpException.BAD_REQUEST(result.data.error);
    }

    return result.data;
  }

  /**
   * Fetch user data from facebook
   * @private
   * @param {String} token facebook access token
   * @param {String} fbId user facebook id
   * @param {Boolean} [loadAvatar] Do need load user avatar from facebook?
   * @returns {Promise<{
   * fullName?: String
   * firstName?: String
   * lastName?: String
   * gender?: String
   * avatar?: String
   * timeAvatar?: String
   * email?: String
   * }>}
   */
  async _getUserFromFB(token, fbId, loadAvatar = true) {
    if (!token) {
      throw HttpException.BAD_REQUEST(`Not enough params has been provided: "token" is required!`);
    }

    const fbResponse = await facebookAdapter.getUserFromFb(token);

    if (!fbResponse || !fbResponse.id || fbResponse.id !== fbId) {
      throw HttpException.BAD_REQUEST(`Invalid Facebook access token has been provided!`);
    }

    const fbUser = {};

    if (fbResponse.name) {
      fbUser.fullName = fbResponse.name;

      const [firstName, lastName = null] = fbResponse.name.split(' ');

      if (firstName && lastName) {
        fbUser.firstName = firstName;

        fbUser.lastName = lastName;
      }
    }

    if (fbResponse.gender) {
      fbUser.gender = fbResponse.gender;
    }

    if (
      !fbResponse.picture ||
      !fbResponse.picture.data ||
      !fbResponse.picture.data.url ||
      fbResponse.picture.data.is_silhouette
    ) {
      return fbUser;
    }

    if (loadAvatar) {
      const fileData = await fileService.uploadImageFromFacebook(
        fbResponse.picture.data.url,
        BUCKETS.AVATARS
      );

      fbUser.avatar = fileData.newFileNameWithExtension;
    } else {
      fbUser.timeAvatar = fbResponse.picture.data.url;
    }

    return fbUser;
  }

  /**
   * Generate hash for password
   * @private
   * @param {String} password
   * @returns {string} hashed password
   */
  _generateHash(password) {
    const shaSum = crypto.createHash('sha256');

    shaSum.update(`${password}`);

    return shaSum.digest('hex');
  }
}

module.exports = { userService: new UserService() };
