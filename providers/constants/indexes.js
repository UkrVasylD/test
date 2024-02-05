const { MODELS } = require('../../constants');

module.exports = {
  indexes: Object.freeze({
    [MODELS.ARTISTS]: [
      {
        fields: {
          urlId: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        // Artists Page: Featured
        fields: {
          online: -1,
          test: 1,
          featuredActive: -1,
          featuredPosition: 1,
          'videos18.tv.count': 1,
        },
        opts: {
          background: true,
          name: 'featured',
        },
      },
      {
        // Artists Page: Popular
        fields: {
          online: -1,
          test: 1,
          netTotal: -1,
          name: -1,
          'videos18.tv.count': 1,
        },
        opts: {
          background: true,
          name: 'popular',
        },
      },
      {
        // Artists Page: Recently Added
        fields: { online: -1, test: 1, createdAt: -1, 'videos18.tv.count': 1 },
        opts: { background: true, name: 'recentlyAdded' },
      },
      {
        // Artists Page: Trending
        fields: {
          online: -1,
          test: 1,
          'videos18.tv.popularity': -1,
          'videos18.tv.count': 1,
        },
        opts: {
          background: true,
          name: 'trending',
        },
      },
    ],
    [MODELS.BANNERS]: [
      {
        fields: {
          page: -1,
          status: -1,
          position: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.BLOGS]: [
      {
        // Get blogs
        fields: {
          status: -1,
          createdAt: -1,
        },
        opts: {
          name: 'blogs',
          background: true,
        },
      },
      {
        // Get blog
        fields: {
          urlId: -1,
          status: -1,
        },
        opts: {
          name: 'blog',
          background: true,
        },
      },
      {
        // featured Blogs
        fields: {
          featured: -1,
          status: -1,
          createdAt: -1,
        },
        opts: {
          name: 'featuredBlogs',
          background: true,
        },
      },
    ],
    [MODELS.CATEGORIES]: [
      {
        fields: {
          artistTV: -1.0,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          videoTV: -1.0,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          value: -1,
          videoCount: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.CHANNELS]: [
      {
        fields: {
          online: -1,
          customUrl: -1,
        },
        opts: { background: true, name: 'detailCustomUrl' },
      },
      {
        fields: {
          online: -1,
          urlId: -1,
        },
        opts: { background: true, name: 'detailUrl' },
      },
      {
        // Home Channels Slider
        fields: {
          online: -1,
          featuredHomeActive: 1,
          featuredHomePosition: 1,
          'videos18.tv.count': -1,
        },
        opts: {
          background: true,
          name: 'homeSlider',
        },
      },
      {
        // Channels Page: CEEK Picks
        fields: {
          online: -1,
          'videos18.tv.popularity': -1,
          featured: -1,
          featuredActive: -1,
          featuredPosition: 1,
          'videos18.tv.count': -1,
        },
        opts: {
          background: true,
          name: 'ceekPicks',
        },
      },
      {
        // Channels Page: Recent Shows
        fields: {
          online: -1,
          'videos18.tv.lastAdded': -1,
          title: 1,
          'videos18.tv.count': -1,
        },
        opts: {
          background: true,
          name: 'recentShows',
        },
      },
      {
        // Channels Page: Time +/-
        fields: {
          online: -1,
          'videos18.tv.duration': -1,
          title: 1,
          'videos18.tv.count': -1,
        },
        opts: {
          background: true,
          name: 'duration',
        },
      },
    ],
    [MODELS.CHATS]: [
      {
        fields: {
          program_id: -1,
          hidden: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          program_id: -1,
          hidden: -1,
          _id: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          program_id: 1,
          pinned: 1,
        },
        opts: {
          name: 'pinnedMessage',
          background: true,
        },
      },
      {
        fields: {
          direct_message_room: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'replies.sender._id': 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'sender._id': 1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.CONTENTS]: [
      {
        fields: {
          showTVVideo: -1,
          totalPopularity: -1,
          ageRating: -1,
        },
        opts: { background: true, name: 'popularDiscover' },
      },
      {
        fields: {
          showTVVideo: -1,
          refreshDate: -1,
          ageRating: -1,
        },
        opts: { background: true, name: 'recentlyAddedDiscover' },
      },
      {
        fields: {
          showTVVideo: -1,
          weeklyPopularity: -1,
          ageRating: -1,
        },
        opts: { background: true, name: 'trendingDiscover' },
      },
      {
        fields: {
          showTVVideo: -1,
          featured: -1,
          featuredVideoPosition: -1,
          ageRating: -1,
        },
        opts: { background: true, name: 'ceekPicksDiscover' },
      },
      {
        fields: {
          showTVLive: -1,
          streamingStatus: -1,
          startAt: -1,
          ageRating: -1,
        },
        opts: { background: true, name: 'livePage' },
      },
      {
        fields: {
          showTV: -1,
          actors: -1,
          createdAt: -1,
          ageRating: -1,
        },
        opts: { background: true, name: 'artistDetail' },
      },
      {
        fields: {
          weeklyPopularity: -1,
        },
        opts: { background: true, name: 'channelDetailTrending' },
      },
      {
        fields: {
          channels: 1,
          payPerView: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          private: 1,
          showTV: 1,
          createdAt: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          status: 1,
          jobId: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          status: 1,
          trailerJobId: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          status: 1,
          azureJobs: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          status: 1,
          attachments: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          exclusiveAssignment: 1,
          createdAt: -1,
          streamingStatus: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          channels: 1,
          contentType: 1,
          createdAt: -1,
        },
        opts: { background: true },
      },
      {
        fields: {
          channels: 1,
          contentType: 1,
          status: 1,
          createdAt: -1,
        },
        opts: { background: true },
      },
      {
        fields: {
          private: 1,
          showTV: 1,
          createdAt: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          ageRating: 1,
          contentType: 1,
          onlineTV: 1,
          createdAt: -1,
          _id: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          status: 1,
          createdAt: -1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          status: 1,
          onlineMobile: 1,
          private: 1,
          ageRating: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          studio: 1,
          contentType: 1,
          createdAt: -1,
          streamingStatus: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          onlineMobile: 1,
          private: 1,
          streamingStatus: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          createdAt: -1,
          streamingStatus: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          studio: 1,
          contentType: 1,
          status: 1,
          createdAt: -1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          status: 1,
          featured: 1,
          featuredActive: 1,
          onlineMobile: 1,
          private: 1,
          ageRating: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          featured: 1,
          featuredActive: 1,
          onlineMobile: 1,
          private: 1,
          streamingStatus: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          streamingStatus: 1,
          onlineMobile: 1,
          onlineTV: 1,
          startAt: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          streamingStatus: 1,
          sourceType: 1,
          startAt: 1,
          channelName: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          askMeAnythingGlobalStatus: 1,
          streamingStatus: 1,
          sourceType: 1,
          askMeAnything: 1,
        },
        opts: { background: true },
      },
      {
        fields: {
          contentType: 1,
          status: 1,
          exclusiveAssignment: 1,
          createdAt: -1,
        },
        opts: { background: true },
      },
      {
        fields: {
          streamingStatus: 1,
          sourceType: 1,
          endAt: 1,
        },
        opts: { background: true },
      },
    ],
    [MODELS.COUNTRIES]: [
      {
        fields: {
          index: -1,
          value: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.EMAILS]: [
      {
        fields: {
          isConfirm: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          email: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          user_id: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          id: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.EMAIL_DISTRIBUTION]: [
      {
        fields: {
          dateSent: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          emailStatus: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          emailType: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          email: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.FILES]: [
      {
        fields: {
          type: -1,
          key: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.FRIENDS]: [
      {
        fields: {
          'user.id': -1,
          'friend.id': -1,
        },
        opts: { background: true, unique: true },
      },
      {
        fields: {
          'friend.id': -1,
          'user.id': -1,
        },
        opts: { background: true, unique: true },
      },
      {
        fields: {
          'user.id': -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'friend.id': -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.GENRES]: [
      {
        fields: {
          value: -1,
          videoCount: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.LIKES]: [
      {
        fields: {
          userId: -1,
          entityId: -1,
        },
        opts: {
          background: true,
          unique: true,
        },
      },
      {
        fields: {
          entityId: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          userId: -1,
          entity: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          entityId: 1,
          createdAt: 1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.MERCHS]: [
      {
        fields: {
          _id: -1,
          typeIndex: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          default: -1,
          name: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.MULTI_STREAMS]: [
      {
        fields: {
          contentId: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.USERS_NOTIFICATION]: [
      {
        fields: { 'user._id': 1, 'user.received': -1, createdAt: 1 },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.PROGRAM_REMINDS]: [
      {
        fields: { program_id: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { updatedAt: -1 },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.PROMO_CODES]: [
      {
        fields: {
          wasUsed: -1,
          createdAt: -1,
        },
        opts: {
          name: 'PromoCodesBaseIndex',
          background: true,
        },
      },
      {
        fields: {
          promoCode: -1,
          type: -1,
          createdAt: -1,
        },
        opts: {
          name: 'PromoCodesSearchIndex',
          background: true,
        },
      },
      {
        fields: {
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.PURCHASES]: [
      {
        fields: {
          contents: -1,
          createdAt: -1,
          dateEnd: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          transactionId: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          status: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          status: -1,
          store: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          status: -1,
          amount: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          status: -1,
          title: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          status: -1,
          type: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          status: -1,
          'user.userName': -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          status: -1,
          email: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'user.id': -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          channel: 1,
          dateEnd: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'receiptRaw.transactionId': 1,
          store: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          type: 1,
          dateEnd: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'subscription.id': 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          store: 1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.ROOMS]: [
      {
        fields: {
          externalId: -1,
          contentCount: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          initialRoom: -1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.ROOM_SEGMENTS]: [
      {
        fields: {
          roomId: 1,
          online: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          roomId: 1,
          index: 1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.SEARCH]: [
      {
        fields: { userId: -1, count: -1 },
        opts: { background: true },
      },
      {
        fields: { query: 1 },
        opts: { background: true },
      },
    ],
    [MODELS.SUBSCRIPTIONS]: [
      {
        fields: { user: -1, contentType: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { createdAt: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          user: -1,
          active: -1,
          contentType: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: { dateEnd: -1, contentType: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          user: -1,
          dateEnd: -1,
          contentType: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          active: 1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.USERS]: [
      {
        fields: {
          roomId: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          online: -1,
          lastActive: -1,
          _id: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: { fbId: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { vrId: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { appleId: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { email: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { userName: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { userNameSearch: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: { userName: 'text' },
        opts: {
          background: true,
        },
      },
      {
        fields: { fullName: -1 },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          hasActivePurchase: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          fake: 1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          BSCTokens: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          balanceBNB: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          BSCWalletAddress: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          _id: -1,
          isBlocked: 1,
          isDeleted: 1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          moderatorConfig: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          forgotToken: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          email: 1,
          isDeleted: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          accessToken: 1,
          isDeleted: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          securityToken: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          isBlocked: 1,
          isDeleted: 1,
          'isOwnerFor.lives.status': 1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          isBlocked: 1,
          isDeleted: 1,
          createdAt: -1,
          KYCVerification: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'linkedArtist._id': 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          isDeleted: 1,
          updatedAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          blockedUsers: 1,
          isBlocked: 1,
          isDeleted: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'airdropCollected.rooms.roomId': 1,
          collected: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          customUrl: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          'externalWalletProviders.address': 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          role: 1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.USER_BILLING_INFO]: [
      {
        fields: {
          userId: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.USER_PLAYLIST]: [
      {
        fields: { userId: 1, createdAt: -1 },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.USER_PREFERENCES]: [
      {
        fields: { userId: -1 },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.USER_SHIPPING_INFO]: [
      {
        fields: {
          userId: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.VIEWS]: [
      {
        fields: {
          userId: -1,
          entityId: -1,
        },
        opts: {
          background: true,
          unique: true,
        },
      },
      {
        fields: {
          entityId: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.SUBSCRIBERS]: [
      {
        // Get subscribers
        fields: {
          email: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          active: 1,
          createdAt: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          source: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          ip_address: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          firstName: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          lastName: 1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.NFT_HISTORY]: [
      {
        fields: {
          date: -1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.FEED]: [
      {
        fields: {
          'admin.fullName': -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          event: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          entity: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          title: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          time: -1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          entityId: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          createdAt: 1,
        },
        opts: {
          background: true,
        },
      },
      {
        fields: {
          event: 1,
          createdAt: 1,
        },
        opts: {
          background: true,
        },
      },
    ],
    [MODELS.INTERNAL_NFT]: [],
    [MODELS.NFT_HISTORY]: [],
    [MODELS.NFT_BANNERS]: [],
    [MODELS.NFT_ABILITIES]: [],
    [MODELS.NFT_COLLECTIONS]: [],
    [MODELS.ANALYTICS]: [
      {
        fields: {
          entityId: 1,
          type: 1,
        },
        opts: {
          background: true,
        },
      },
    ],
  }),
};
