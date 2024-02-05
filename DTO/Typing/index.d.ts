declare namespace DTO {
  namespace Request {
    export type getAllMobileAnimationsDTO = {
      access?: 'Free' | 'Paid' | '';
      buy?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      type?: 'man' | 'woman' | 'boy' | 'girl' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getAllTVAnimationsDTO = {
      access?: 'Free' | 'Paid' | '';
      buy?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      type?: 'man' | 'woman' | 'boy' | 'girl' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getAnimationsByIdDTO = {
      animationId: object | string;
      access?: 'Free' | 'Paid' | '';
      buy?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      type?: 'man' | 'woman' | 'boy' | 'girl' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getOnlineAnimationsForNFTDTO = {} & Pagination;
    export type artistBaseListDTO = {
      category?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type artistCategoriesFeaturedDTO = {} & User;
    export type artistDetailsByIdDTO = {
      artistUrlId: string;
    } & User;
    export type artistContentDTO = {
      artistUrlId: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type homeArtistsDTO = {} & User;
    export type getAllArtistsMobileDTO = {
      artistId?: string | '' | null;
      categoryId?: string | '' | null;
      filter?: string | null | '';
    } & Pagination;
    export type likeArtistDTO = {
      artistUrlId?: string;
      id?: string;
    } & User;
    export type getArtistContentMobileDTO = {
      artistId: string;
    } & Pagination;
    export type getArtistForTVSiteMapDTO = {} & Pagination;
    export type dislikeArtistDTO = {
      artistId: string;
    } & User;
    export type addViewsDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      uAgeParam?: number;
      urlId: string;
      userAge?: number;
      userId?: object;
    };
    export type getArtistsForLandlot = {
      artistIds: string[];
    } & User;
    export type signUpHandlerDTO = {
      userName: string;
      birthDate: number;
      country: string;
      email: string;
      gender?: 'male' | 'female';
      ipAddress?: string | '' | null;
      isMobile?: boolean;
      isTV?: boolean;
      password: string;
      promoCode?: string;
      source?:
        | 'ceek'
        | 'voting'
        | 'land'
        | 'nftmarketplace'
        | 'ios'
        | 'android'
        | 'ceekio'
        | 'oculus'
        | 'htc'
        | 'gear'
        | 'vive';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName: string;
    };
    export type signInHandlerDTO = {
      OTP?: string | null | '';
      email?: string;
      emailUserName?: string;
      isMobile?: boolean;
      isTV?: boolean;
      password: string;
      remember?: boolean;
      reqId?: string | null | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName?: string;
    };
    export type facebookAuthHandlerDTO = {
      OTP?: string | null | '';
      fbId?: string;
      ipAddress?: string | '' | null;
      isMobile?: boolean;
      isTV?: boolean;
      isVotingApp?: boolean;
      remember?: boolean;
      reqId?: string | null | '';
      secret: 'Thinkmobiles_CEEK_VR_SECRET_KEY_A3D45fd';
      source?:
        | 'ceek'
        | 'voting'
        | 'land'
        | 'nftmarketplace'
        | 'ios'
        | 'android'
        | 'ceekio'
        | 'oculus'
        | 'htc'
        | 'gear'
        | 'vive';
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type resetPasswordDTO = {
      OTP?: string | null | '';
      isMobile?: boolean;
      isTV?: boolean;
      password: string;
      reqId?: string | null | '';
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type forgotPasswordDTO = {
      email: string;
    } & User;
    export type confirmChangePasswordDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmEmailDTO = {
      email?: string;
      isMobile?: boolean;
      isTV?: boolean;
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type signUpHandlerDTO = {
      birthDate?: number;
      email: string;
      gender?: string;
      ipAddress?: string;
      isMobile?: boolean;
      isTV?: boolean;
      password: string;
      source?:
        | 'ceek'
        | 'voting'
        | 'land'
        | 'nftmarketplace'
        | 'ios'
        | 'android'
        | 'ceekio'
        | 'oculus'
        | 'htc'
        | 'gear'
        | 'vive';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName?: string;
    };
    export type signInHandlerDTO = {
      OTP?: string;
      email?: string;
      ipAddress?: string;
      isMobile?: boolean;
      isTV?: boolean;
      password: string;
      remember?: boolean;
      reqId?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName?: string;
    };
    export type appleAuthHandlerDTO = {
      ipAddress?: string;
      isMobile?: boolean;
      isTV?: boolean;
      remember?: boolean;
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type resetPasswordDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      password: string;
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getBannerByPageDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      pageName: string;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type blogDetailsDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      uAgeParam?: number;
      urlId: string;
      userAge?: number;
      userId?: object;
    };
    export type likeBlogDTO = {
      blogId: string;
    } & User;
    export type blogListDTO = {
      featured?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string | null | '';
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type discoverCategoryFeaturedDTO = {} & User;
    export type getAllCategoriesForTVDTO = {
      categoryPage?: string;
    } & User;
    export type getAllCategoriesDTO = {} & Pagination;
    export type getCategoriesDetailsByIdsForLandlotDTO = {
      categoryIds: string[];
    } & User;
    export type channelByIdDTO = {
      channelId: string;
    } & User;
    export type channelContentDTO = {
      channelId: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      play?: boolean;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      type?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type channelPurchasePackageDTO = {
      channelId: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type homeChannelsDTO = {} & User;
    export type channelsDTO = {
      contentType?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sortField?: string;
      sortValue?: '1' | '-1';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getChannelByIdForMobileDTO = {
      channelId: string;
    } & User;
    export type getAllChannelsForMobileDTO = {
      filter?: string;
      isFeatured?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      typeOfContent?: 'CHANNEL' | 'SERIES' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getAllChannelsForMobileWithAdditionalParamsDTO = {
      isFeatured?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      typeOfContent?: 'CHANNEL' | 'SERIES' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getMostViewedChannelDTO = {} & Pagination;
    export type getLatestDTO = {} & Pagination;
    export type likeChannelDTO = {
      channelId: string;
    } & User;
    export type dislikeChannelDTO = {
      channelId: string;
    } & User;
    export type getChannelsForTVSiteMapDTO = {} & Pagination;
    export type getFeaturedChannelDTO = {} & Pagination;
    export type getAllClothesForMobileDTO = {
      access?: string;
      buy?: boolean;
      category?: string;
      color?: string;
      featured?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      style?: string | string[];
      type?: 'man' | 'woman' | 'boy' | 'girl';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getOnlineClothesForNFT_DTO = {} & Pagination;
    export type getOwnerClothesDTO = {} & Pagination;
    export type isClothesMintedDTO = {
      clothesId: string;
    } & User;
    export type discoverDTO = {
      category?: string;
      categoryName?: string;
      featured?: '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type discoverContentDTO = {
      category?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type discoverCategoryFeaturedDTO = {} & User;
    export type getAllClothesForTVDTO = {
      access?: string;
      buy?: boolean;
      category?: string;
      color?: string;
      featured?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      style?: string[];
      type?: 'man' | 'woman' | 'boy' | 'girl';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getClothesByIdDTO = {
      clothesId: object | string;
    } & User;
    export type discoverDTO = {
      category?: string;
      categoryName?: string;
      featured?: '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type discoverContentDTO = {
      category?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type discoverCategoryFeaturedDTO = {} & User;
    export type homeContentDTO = {} & User;
    export type getRecommendVideosDTO = {
      ids?: any[];
      isLive?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      type?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      videoId: string;
    };
    export type getAllFeaturedTVDTO = {} & User;
    export type getSearchForTVDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      searchText: string;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getSearchForOculusDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      searchText: string;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type watchContentDTO = {
      contentId: string;
      isMobile?: boolean;
      isPreview?: boolean;
      isTV?: boolean;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type watchContentIFrameDTO = {
      contentId: string;
    } & User;
    export type likeContentDTO = {
      contentId: string;
    } & User;
    export type videoContentDTO = {
      contentId: string;
    } & User;
    export type dislikeContentDTO = {
      contentId: string;
    } & User;
    export type getSuggestionContentDTO = {} & Pagination;
    export type getAllWatchedVideosOfUserDTO = {} & Pagination;
    export type getRecommendVideosMobileDTO = {
      isLive?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      type?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      videoId: string;
    };
    export type getLiveTvJWTDTO = {
      duration: number;
    } & User;
    export type watchedRateDTO = {
      contentId: string;
      isMobile?: boolean;
      isTV?: boolean;
      type: 'p25' | 'p50' | 'p75' | 'p100';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getAllVideosAndLives = {
      category?: object | string;
      contentType?: 'withLive' | 'withoutLive' | 'liveVideo' | 'suggestions';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      sort?: 'CeekPicksAll' | 'CeekPicks' | 'Popular' | 'Recently Added' | 'Trending';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getTheMostLikedContentDTO = {
      isMobile?: boolean;
      isMostWatched?: boolean;
      isTV?: boolean;
      typeOfContent:
        | 'All'
        | 'Video'
        | 'Poster'
        | 'Avatar'
        | 'Room'
        | 'Channel'
        | 'Content'
        | 'LiveTVVideo'
        | 'VideoForTV';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getTheMostWatchedContentDTO = {
      isMobile?: boolean;
      isMostWatched?: boolean;
      isTV?: boolean;
      typeOfContent:
        | 'All'
        | 'Video'
        | 'Poster'
        | 'Avatar'
        | 'Room'
        | 'Channel'
        | 'Content'
        | 'LiveTVVideo'
        | 'VideoForTV';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getTheLatestContentDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      typeOfContent:
        | 'All'
        | 'Video'
        | 'Poster'
        | 'Avatar'
        | 'Room'
        | 'Channel'
        | 'Content'
        | 'LiveTVVideo'
        | 'VideoForTV';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getAllContentDTO = {
      categories?: string | null | '';
      contentId?: string;
      filter?:
        | 'watched'
        | 'trending'
        | 'liked'
        | 'popular'
        | 'recommended'
        | 'featured'
        | 'purchased'
        | 'recent'
        | 'ceek-picks'
        | ''
        | 'recomended';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      searchText?: string;
      skip: number;
      typeOfContent:
        | 'All'
        | 'Video'
        | 'Poster'
        | 'Avatar'
        | 'Room'
        | 'Channel'
        | 'Content'
        | 'LiveTVVideo'
        | 'VideoForTV';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      videoType?: string | null | '';
    };
    export type getAllFeaturedOculusDTO = {} & User;
    export type mostWatchedVideosLastWeekDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      page?: number;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type categoryContentDTO = {
      categoryId: string;
    } & Pagination;
    export type addVideoToPlaylistDTO = {
      contentId: string;
      isMobile?: boolean;
      isTV?: boolean;
      playlistId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type removeVideoFromPlaylistDTO = {
      contentId: string;
      isMobile?: boolean;
      isTV?: boolean;
      playlistId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getAllFeaturedVideoDTO = {
      contentId?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      playlistId?: string;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type pageLiveDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      status?: 'all' | 'live' | 'past' | 'scheduled';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type pageFeaturedLiveDTO = {} & User;
    export type pageLiveByIdDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      liveId: object | string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type pageLivePreviewDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      liveId: object | string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type pageLivePlayDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      liveId: object | string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type pageVideoPlayerDTO = {
      videoId: string;
    } & User;
    export type getSupportedCountriesDTO = {
      full?: boolean;
    };
    export type getSupportedStatesByCountryNameDTO = {
      country:
        | 'Australia'
        | 'Austria'
        | 'Belgium'
        | 'Brazil'
        | 'Bulgaria'
        | 'Canada'
        | 'Croatia'
        | 'Cyprus'
        | 'Czech Republic'
        | 'Denmark'
        | 'Estonia'
        | 'Finland'
        | 'France'
        | 'Germany'
        | 'Gibraltar'
        | 'Greece'
        | 'Hong Kong'
        | 'Hungary'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Japan'
        | 'Latvia'
        | 'Liechtenstein'
        | 'Lithuania'
        | 'Luxembourg'
        | 'Malaysia'
        | 'Malta'
        | 'Mexico'
        | 'Netherlands'
        | 'New Zealand'
        | 'Norway'
        | 'Poland'
        | 'Portugal'
        | 'Romania'
        | 'Singapore'
        | 'Slovakia'
        | 'Slovenia'
        | 'Spain'
        | 'Sweden'
        | 'Switzerland'
        | 'Thailand'
        | 'United Arab Emirates'
        | 'United Kingdom'
        | 'United States';
    };
    export type getAllUsersDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      listType?: string;
      online?: boolean;
      page?: number;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getUserActivityDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      listType?: 'blocked' | 'blockedMe' | 'invited' | 'invites';
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type checkFriendshipDTO = {
      friendId: string;
    } & User;
    export type changeProfileTypeDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      profileType?: 'friends' | 'public' | 'private';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type inviteDTO = {
      friendId: string;
    } & User;
    export type confirmInviteDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      senderId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type denyInviteDTO = {
      friendId: string;
    } & User;
    export type blockDTO = {
      friendId: string;
    } & User;
    export type unblockDTO = {
      friendId: string;
    } & User;
    export type removeDTO = {
      friendId: string;
    } & User;
    export type Pagination = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type User = {
      isMobile?: boolean;
      isTV?: boolean;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getProgramsDTO = {
      featured?: '';
      filter?: 'recommended' | 'watched' | 'liked' | 'trending' | 'recent' | 'popular' | '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      sourceType?: 'live' | 'server';
      status?: 'live' | 'scheduled' | 'pending' | 'past' | 'processing' | 'error' | '';
      typeOfContent?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getProgramDetailsDTO = {
      id: string;
    } & User;
    export type fetchChatHistoryDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      programId: string;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type remindProgramDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      programId: string;
      remind: boolean;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type updateProgramDurationDTO = {
      duration?: number;
      isMobile?: boolean;
      isTV?: boolean;
      programId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getVodStreamingTokenDTO = {
      duration?: number;
      for_test?: string;
      id?: any;
      isMobile?: boolean;
      isTV?: boolean;
      type?: any;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type createProgramDTO = {
      date: string;
      description: string;
      duration: number;
      isMobile?: boolean;
      isTV?: boolean;
      private: boolean;
      time: string;
      timezone: string;
      title: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type updateProgramDTO = {
      date: string;
      description: string;
      duration: number;
      id: string;
      isMobile?: boolean;
      isTV?: boolean;
      private: boolean;
      time: string;
      timezone: string;
      title: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getEventStatusByIdDTO = {
      eventId: string;
    };
    export type getOwnerLivesDTO = {} & Pagination;
    export type isLiveMintedDTO = {
      liveId: string;
    };
    export type multiStreamDeleteEventDTO = {
      id: string;
    } & User;
    export type getListingDetailsDTO = {
      nftId: string;
      userId?: object;
    };
    export type mintInternalNFTDTO = {
      collectionId: string;
      isMobile?: boolean;
      isTV?: boolean;
      tokenData: {
        abilities?: string[];
        assetIPFSURL: string;
        assetKey: string;
        assetPreviewKey?: string;
        assetType: 'video' | 'audio' | 'image';
        attributes: ('White' | 'Green' | 'Yellow' | 'Blue' | 'Red" | "Multi')[];
        buyoutPrice?: any;
        description: string;
        endTime?: any;
        isListed?: boolean;
        listedOnBinance?: boolean;
        listingType?: any;
        mimeType:
          | 'image/png'
          | 'image/webp'
          | 'image/gif'
          | 'image/jpeg'
          | 'video/mp4'
          | 'audio/mpeg';
        minBid?: any;
        name: string;
        previewIPFSURL?: string;
        price?: number;
        startTime?: any;
        tags?: string[];
        type:
          | 'Collectables'
          | 'Wearables'
          | 'Property'
          | 'Vip Access'
          | 'Rides'
          | 'Land'
          | 'Ticket'
          | 'Event'
          | 'BNFT';
      };
      uAgeParam?: number;
      userAge?: number;
      userId: object;
    };
    export type buyInternalNftDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      nftId: string;
      uAgeParam?: number;
      userAge?: number;
      userId: object;
    };
    export type getFavoritesDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId: object;
    };
    export type globalSearchDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getListingsDTO = {
      ability?: string | '' | null;
      collection?:
        | 'Collectables'
        | 'Wearables'
        | 'Property'
        | 'Vip Access'
        | 'Rides'
        | 'Land'
        | 'Ticket'
        | 'Event'
        | 'BNFT'
        | '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      listingType?: 'direct' | 'auction' | '';
      maxPrice?: '';
      minPrice?: '';
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getListingSliderDTO = {
      excludeId?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      type: 'new' | 'trending' | 'popular' | 'featured';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getUserCollectablesDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      listingType?: 'direct' | 'auction' | '';
      searchRegExp?: any;
      skip: number;
      status?: 'notListed' | 'minted' | 'listed' | 'failed' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type makeBidNFTDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      nftId: string;
      price: number;
      uAgeParam?: number;
      userAge?: number;
      userId: object;
    };
    export type getHolderCollectablesDTO = {
      holderIdOrUrl?: string | string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      listingType?: 'direct' | 'auction' | '';
      searchRegExp?: any;
      skip: number;
      status?: 'minted' | 'listed' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getListingHistory = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      nftId?: string;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type createAuction = {
      buyoutPrice: number;
      endTime: Date;
      isMobile?: boolean;
      isTV?: boolean;
      listedOnBinance?: boolean;
      minBid: number;
      nftId: string;
      startTime: Date;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type makeBid = {
      bid: number;
      isMobile?: boolean;
      isTV?: boolean;
      nftId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type cancelDirectListingDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      nftId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getUserTransactions = {} & Pagination;
    export type closeAuction = {
      isMobile?: boolean;
      isTV?: boolean;
      nftId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type cancelAuction = {
      isMobile?: boolean;
      isTV?: boolean;
      nftId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getBannersList = {} & Pagination;
    export type sendLetterDTO = {
      comment: string;
      email: string;

      userName: string;
    } & User;
    export type remintFailedNFTDTO = {
      id: object | string;
      isMobile?: boolean;
      isTV?: boolean;
      uAgeParam?: number;
      userAge?: number;
      userId: object | string;
    };
    export type getCollectionTokensDTO = {
      collectionId?: object | string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      listingType?: 'direct' | 'auction' | '' | null;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getImagesDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      page: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getPrivacyTermsDataDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      page: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getMultiStreamByEventIdDTO = {
      eventId: string;
    } & User;
    export type getMultistreamCeekersDTO = {
      eventId: string;

      vip?: boolean;
    } & Pagination;
    export type getAllOnlineUsersIdDTO = {
      venue: string;
    } & User;
    export type getOnlineUsersInfoDTO = {
      ids?: string[];
      isMobile?: boolean;
      isTV?: boolean;
      targetUser?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      venue: string;
    };
    export type kickFromRoomDTO = {
      duration: 'one_hour' | 'one_day' | 'one_week' | 'forever';
      isMobile?: boolean;
      isTV?: boolean;
      roomId: string;
      targetUserId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type homeDTO = {} & User;
    export type discoverDTO = {
      category?: string;
      categoryName?: string;
      featured?: '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type channelDTO = {
      content?: string;
      contentType?: string;
      featured?: '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sortField?: string;
      sortValue?: '1' | '-1';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type artistDTO = {
      category?: string;
      categoryName?: string;
      featured?: '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type liveDTO = {
      isFeatured?: '';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      status?: 'all' | 'live' | 'past' | 'scheduled';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type videoDTO = {
      contentId: string;
      isMobile?: boolean;
      isRecommended?: '';
      isTV?: boolean;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type videoPlayerDTO = {
      videoId: string;
    } & User;
    export type channelDetailsDTO = {
      channelId: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sort?: string;
      type?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type channelPlayDTO = {
      channelId: string;
      isMobile?: boolean;
      isTV?: boolean;
      start?: string;
      type?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type artistByIdDTO = {
      artistUrlId: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type liveByIdDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      liveId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type livePreviewDTO = {
      isMobile?: boolean;
      isRecommended?: '';
      isTV?: boolean;
      liveId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type livePlayDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      liveId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type myEventsDTO = {
      approved?: 'pending' | 'approved';
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      status?: 'all' | 'live' | 'past' | 'scheduled';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type initPurchaseDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      phone: string;
      price?: number;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      target?: string;
      targetId?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmPurchaseDTO = {
      boughtByContentId?: string | null;
      isMobile?: boolean;
      isTV?: boolean;
      price: number;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      targetId?: string | number;
      typeBuy?:
        | 'PURCHASE_PACKAGE'
        | 'SUBSCRIPTION'
        | 'BSC_TOKEN'
        | 'CONTENT'
        | 'CHANNEL'
        | 'DONATION'
        | 'CLOTHES'
        | 'ANIMATIONS'
        | 'RIDES'
        | 'LIVE'
        | 'ROOM'
        | 'STAR_DONATION'
        | 'ASK_ME_ANYTHING'
        | 'NFT_TOKEN';
      uAgeParam?: number;
      userAge?: number;
      userId?: string;
    };
    export type confirmChannelPurchaseDTO = {
      boughtByContentId?: string | null;
      isMobile?: boolean;
      isTV?: boolean;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      targetId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmPackagePurchaseDTO = {
      boughtByContentId: string;
      isMobile?: boolean;
      isTV?: boolean;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      targetId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmDonationPurchaseDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      price: number;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      targetId?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmBSCTokensPurchaseDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      price: number;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type subscribeMobileDTO = {
      channelId?: string;
      isMobile?: boolean;
      isTV?: boolean;
      productId:
        | 'one.ceek.pts'
        | 'five.ceek.pts'
        | 'ten.ceek.pts'
        | 'thirty.ceek.pts'
        | 'hundred.ceek.pts'
        | 'monthly.ceek.subscription'
        | 'yearly.ceek.subscription';
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      target?: 'Subscription';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type subscribeTvDTO = {
      boughtByContentId?: string;
      channelId?: string | null;
      data?: any;
      isMobile?: boolean;
      isTV?: boolean;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      subscriptionType: string;
      target: 'Subscription' | 'Channel';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type unsubscribeDTO = {
      channelId?: string;
      contentType?: string;
    } & User;
    export type checkUserSubscriptionDTO = {} & User;
    export type updateUserCryptoBalanceDTO = {} & User;
    export type getSubTypesDTO = {} & User;
    export type getSubTypesMobileDTO = {} & User;
    export type activatePromoCodeDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      promoCode: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type artistDonationDTO = {
      amount: number;
      artistsIds: string[];
    } & User;
    export type userDonationDTO = {
      amount: number;

      usersIds: string[];
    } & User;
    export type buyNFT_DTO = {
      buyer: string;
      contractAddress?: string;
      isMobile?: boolean;
      isTV?: boolean;
      price: number;
      seller: string;
      tokenId: string;
      transactionHash: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type mintNFT_DTO = {
      contractAddress: string;
      ipfsUri: string;
      isMobile?: boolean;
      isTV?: boolean;
      name: string;
      subType?: string;
      targetId?: any;
      tokenId: string;
      transactionHash: string;
      type:
        | 'Collectables'
        | 'Event'
        | 'Properties'
        | 'Ticket'
        | 'Wearables'
        | 'Rides'
        | 'Land'
        | 'Speed';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmAnimationsPurchaseDTO = {
      entity?: 'animations';
      isMobile?: boolean;
      isTV?: boolean;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      targetId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmRidesPurchaseDTO = {
      entity?: 'rides';
      isMobile?: boolean;
      isTV?: boolean;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      targetId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type confirmEntityPurchaseDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      store:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      targetId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type retryAMATransactionDTO = {
      historyTransactionIndex: number;
      isMobile?: boolean;
      isTV?: boolean;
      liveId: object | string;
      moderatorId: object | string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getRedirectDTO = {
      url: string;
    };
    export type getReportsForCurrentUserDTO = {} & User;
    export type createReportDTO = {
      course: number;
      createdAt?: Date;
      data: {
        activateaed: string;
        aedactivation: string;
        codeblue: string;
        compressions: string;
        pulse: string;
        rescuebreaths: string;
        responsiveness: string;
      };
      isMobile?: boolean;
      isTV?: boolean;
      startedAt: Date;
      totalTime: number;
      type: 'Learn' | 'Rescue';
      uAgeParam?: number;
      updatedAt?: Date;
      user?: string;
      userAge?: number;
      userId?: object;
    };
    export type getAllMobileRidesDTO = {
      access?: string;
      buy?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      type?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getRoomVideoDTO = {
      videoId: string;
    } & User;
    export type getInitRoomIdDTO = {
      device: 'android' | 'ios';
    } & User;
    export type getInitRoomByExternalIdDTO = {
      externalId?: string;
    } & User;
    export type getInitRoomIdGameDTO = {
      device: 'ios' | 'android';
    } & User;
    export type getRoomAssetByIdDTO = {
      device: 'ios' | 'android' | 'oculusgearvr' | 'oculusrift' | 'viveWindows' | 'oculusWindows';
      id: string;
    } & User;
    export type getRoomSegmentsByIdDTO = {
      id: string;
    };
    export type getSegmentsDTO = {
      id: string;
    } & User;
    export type getRoomHelpVideoDTO = {
      id: string;
    } & User;
    export type getRoomInstructionsVideoDTO = {
      id: string;
    } & User;
    export type getAllOnlineRoomsDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      page?: number;
      searchRegExp?: any;
      skip: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getRoomModeratorsDTO = {
      id: string;
    } & Pagination;
    export type getOnlineRoomsForNFTDTO = {} & Pagination;
    export type getUserOwnRoomsDTO = {} & Pagination;
    export type getInitialRoomForNFTDTO = {} & User;
    export type assigningStatusDTO = {
      roomId: string;
    };
    export type hasActiveAirdropDTO = {
      id: string;
    };
    export type getCEEKcollectedDTO = {
      id?: string;
    } & User;
    export type getCEEKIndexesCollectedDTO = {
      id: string;
    };
    export type getCEEKremainedDTO = {
      id: string;
    };
    export type collectCEEKDTO = {
      id: string;
      index: 0;
    } & User;
    export type getUsersRecentSearchDTO = {
      contentType?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit?: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type deleteUserRecentSearchDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      searchId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type addNewDTO = {
      comment?: string;
      email: string;
      firstName: string;
      ip_address?: string;
      lastName: string;
      source?: string;
    };
    export type generateBSCAuthTokenDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      secret: 'qtYG(.y]A)oF[X)xVIv9+zDiv}J>=Z>l';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type playVideoPositionDTO = {
      contentId: string;
      isMobile?: boolean;
      isTV?: boolean;
      position: number;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type addExternalWalletDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      type: 1 | 3;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      wallet: string;
    };
    export type updateExternalWalletDTO = {
      walletAddress?: string;
      walletType: 1 | 3;
    } & User;
    export type removeExternalWalletDTO = {
      walletId: string;
    } & User;
    export type billingInfoDTO = {
      address: string;
      city: string;
      country:
        | 'Australia'
        | 'Austria'
        | 'Belgium'
        | 'Brazil'
        | 'Bulgaria'
        | 'Canada'
        | 'Croatia'
        | 'Cyprus'
        | 'Czech Republic'
        | 'Denmark'
        | 'Estonia'
        | 'Finland'
        | 'France'
        | 'Germany'
        | 'Gibraltar'
        | 'Greece'
        | 'Hong Kong'
        | 'Hungary'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Japan'
        | 'Latvia'
        | 'Liechtenstein'
        | 'Lithuania'
        | 'Luxembourg'
        | 'Malaysia'
        | 'Malta'
        | 'Mexico'
        | 'Netherlands'
        | 'New Zealand'
        | 'Norway'
        | 'Poland'
        | 'Portugal'
        | 'Romania'
        | 'Singapore'
        | 'Slovakia'
        | 'Slovenia'
        | 'Spain'
        | 'Sweden'
        | 'Switzerland'
        | 'Thailand'
        | 'United Arab Emirates'
        | 'United Kingdom'
        | 'United States';
      isMobile?: boolean;
      isTV?: boolean;
      state: string;
      telephone: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      zip: string;
    };
    export type setMarketAddressDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      marketAddress?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type signInDTO = {
      email?: string;
      emailUserName?: string;
      fbId?: string;
      ipAddress?: string | '' | null;
      isMobile?: boolean;
      isTV?: boolean;
      isVotingApp?: string;
      password?: string;
      remember?: string;
      secret?: string;
      token?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName?: string;
    };
    export type signInMobileDTO = {
      email?: string;
      fbId?: string;
      ipAddress?: string | '' | null;
      isMobile?: boolean;
      isTV?: boolean;
      password?: string;
      source?: string;
      token?: any;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName?: string;
    };
    export type signUpDTO = {
      birthDate?: number;
      country?: string;
      email?: string;
      fbId?: string;
      gender?: string;
      ipAddress?: string;
      isMobile?: boolean;
      isTV?: boolean;
      isVotingApp?: string;
      password?: string;
      secret?: string;
      source?:
        | 'ceek'
        | 'voting'
        | 'land'
        | 'nftmarketplace'
        | 'ios'
        | 'android'
        | 'ceekio'
        | 'oculus'
        | 'htc'
        | 'gear'
        | 'vive';
      token?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName?: string;
    };
    export type signUpMobileDTO = {
      birthDate?: number;
      country?: string;
      email?: string;
      fbId?: string;
      gender?: string;
      ipAddress?: string | '' | null;
      isMobile?: boolean;
      isTV?: boolean;
      password?: string;
      source?:
        | 'ceek'
        | 'voting'
        | 'land'
        | 'nftmarketplace'
        | 'ios'
        | 'android'
        | 'ceekio'
        | 'oculus'
        | 'htc'
        | 'gear'
        | 'vive';
      token?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      userName?: string;
    };
    export type authAppleUserDTO = {
      ipAddress?: string;
      isMobile?: boolean;
      isTV?: boolean;
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type resetPassDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      password: string;
      token: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type checkEmailDTO = {
      email: string;
    } & User;
    export type tokenDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      token?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getAllUsersDTO = {} & Pagination;
    export type getUserByIdDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      targetId?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getUserPurchasesDTO = {
      filter?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      search?: string;
      searchRegExp?: any;
      skip: number;
      sortType?: string;
      sortValue?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type removeEmailDTO = {
      fbId: string;
    } & User;
    export type getUsersBySourceForLandDTO = {
      ids: string[];
      isMobile?: boolean;
      isTV?: boolean;
      source?: 'land' | 'ceek' | 'mobile' | 'noSource';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type setNotificationTokenDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      notificationToken: string;
      typeOfDevise: 'ios' | 'android';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      version: string;
    };
    export type unsetNotificationTokenDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      typeOfDevise: 'ios' | 'android';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      version: string;
    };
    export type getAllUserFavoritesDTO = {
      field?: string;
      isMobile?: boolean;
      isTV?: boolean;
      limit: number;
      searchRegExp?: any;
      skip: number;
      type?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      value?: 1 | -1;
    };
    export type createPlaylistDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      playlistName?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      videoIds?: string[];
    };
    export type updateNameOfPlaylistDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      playlistId?: string;
      playlistName: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type removePersonalPlaylistDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      playlistId?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type updateOnlineStatusDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      roomId: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type updateMobileAvatarDTO = {
      avatar?: any[];
      color?: string;
      didimoId?: string;
      eyes?: string;
      hair?: string;
      isMobile?: boolean;
      isTV?: boolean;
      name?: string;
      skinnedMeshRender?: string;
      typeFace?: string;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type getDidimoResultDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      type?: 'file' | 'front_png' | 'font_png' | '';
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
    };
    export type connectCryptoWalletDTO = {
      isMobile?: boolean;
      isTV?: boolean;
      provider: 'MetaMask';
      signedMessage?: any;
      uAgeParam?: number;
      userAge?: number;
      userId?: object;
      walletAddress?: any;
    };
    export type getCryptoWalletsDTO = {
      forceUpdate?: boolean;
    } & User;
    export type updateNFTProfileDTO = {
      birthDate?: number;
      customUrl?: string;
      gender?: 'male' | 'female' | 'none';
      isMobile?: boolean;
      isTV?: boolean;
      nameInTwitter?: string;
      portfolioUrl?: string;
      source?:
        | 'ceek'
        | 'voting'
        | 'land'
        | 'nftmarketplace'
        | 'ios'
        | 'android'
        | 'ceekio'
        | 'oculus'
        | 'htc'
        | 'gear'
        | 'vive';
      uAgeParam?: number;
      userAge?: number;
      userBio?: string;
      userEmail?: string;
      userId?: object;
      userName?: string;
    };
    export type updateVotingAddressDTO = {
      votingAddress?: string;
    } & User;
    export type updateProfileDTO = {
      birthDate?: number;
      country?: string;
      firstName?: string;
      fullName?: string;
      gender?: string;
      hasExternal2FA?: boolean;
      isMobile?: boolean;
      isTV?: boolean;
      lastName?: string;
      marketAddress?: string;
      newPassword?: string;
      oldPassword?: string;
      uAgeParam?: number;
      userAge?: number;
      userEmail?: string;
      userId?: object;
      userName?: string;
    };
    export type verifyUserEmailDTO = {
      email?: string;
      token: string;
    };
  }
  namespace Entity {
    export type AccessProfileDTO = {
      createdAt?: Date;
      creator?: object;
      description?: string;
      editable?: boolean;
      editor?: object;
      name: string;
      updatedAt?: Date;
    };
    export type PatchAccessProfileDTO = {
      createdAt?: Date;
      creator?: object;
      description?: string;
      editable?: boolean;
      editor?: object;
      name?: string;
      updatedAt?: Date;
    };
    export type ArtistDTO = {
      BSCWalletAddress?: string;
      CEEKTokens?: number;
      allVideos?: object[];
      allVideosCount?: number;
      allVideosOnlineCount?: number;
      avatar?: string;
      bio?: string;
      biography?: {
        isPublished?: boolean;
        value?: string;
      };
      categories?: object[];
      country?: {
        isPublished?: boolean;
        value?: string;
      };
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      discography?: {
        isPublished?: boolean;
        value?: string;
      };
      displayImageFirst?: boolean;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      facebookImage?: string;
      facts?: {
        isPublished?: boolean;
        value?: string;
      };
      fake?: boolean;
      fbId?: string;
      fbTotal?: number;
      featured?: boolean;
      featuredActive?: boolean;
      featuredHomeActive?: boolean;
      featuredHomePosition?: number | null;
      featuredPosition?: number | null;
      featuredTimeActive?: boolean;
      featuredTimePosition?: number | null;
      gallery?: string[];
      genres?: object[];
      horizontalCover?: string;
      icon?: string;
      image?: string;
      insTotal?: number;
      instId?: string;
      isTagsPublished?: boolean;
      liked?: object[];
      likesCount?: number;
      linkedUser?: object | null;
      name?: string;
      netTotal?: number;
      newLayout?: boolean;
      online?: boolean;
      originImage?: string;
      originalAvatar?: string;
      originalSliderTV?: string;
      popularity?: number;
      preview?: object;
      showDetailImage?: boolean;
      sliderTV?: string;
      socialNetworks?: {
        appleMusicURL?: string;
        fbURL?: string;
        instURL?: string;
        isPublished?: boolean;
        spotifyURL?: string;
        twitterURL?: string;
        websiteURL?: string;
      };
      tags?: string[];
      test?: boolean;
      topContent?: boolean;
      totalPopularity?: number;
      twiTotal?: number;
      twitterId?: string;
      twitterImage?: string;
      updatedAt?: Date;
      urlId?: string;
      verticalCover?: string;
      videoContentType?: {
        shows?: boolean;
        video?: boolean;
      };
      videos0?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos13?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos18?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      views?: number;
      watched?: object[];
      watchedCount?: number;
    };
    export type PatchArtistDTO = {
      BSCWalletAddress?: string;
      CEEKTokens?: number;
      allVideos?: object[];
      allVideosCount?: number;
      allVideosOnlineCount?: number;
      avatar?: string;
      bio?: string;
      biography?: {
        isPublished?: boolean;
        value?: string;
      };
      categories?: object[];
      country?: {
        isPublished?: boolean;
        value?: string;
      };
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      discography?: {
        isPublished?: boolean;
        value?: string;
      };
      displayImageFirst?: boolean;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      facebookImage?: string;
      facts?: {
        isPublished?: boolean;
        value?: string;
      };
      fake?: boolean;
      fbId?: string;
      fbTotal?: number;
      featured?: boolean;
      featuredActive?: boolean;
      featuredHomeActive?: boolean;
      featuredHomePosition?: number | null;
      featuredPosition?: number | null;
      featuredTimeActive?: boolean;
      featuredTimePosition?: number | null;
      gallery?: string[];
      genres?: object[];
      horizontalCover?: string;
      icon?: string;
      image?: string;
      insTotal?: number;
      instId?: string;
      isTagsPublished?: boolean;
      liked?: object[];
      likesCount?: number;
      linkedUser?: object | null;
      name?: string;
      netTotal?: number;
      newLayout?: boolean;
      online?: boolean;
      originImage?: string;
      originalAvatar?: string;
      originalSliderTV?: string;
      popularity?: number;
      preview?: object;
      showDetailImage?: boolean;
      sliderTV?: string;
      socialNetworks?: {
        appleMusicURL?: string;
        fbURL?: string;
        instURL?: string;
        isPublished?: boolean;
        spotifyURL?: string;
        twitterURL?: string;
        websiteURL?: string;
      };
      tags?: string[];
      test?: boolean;
      topContent?: boolean;
      totalPopularity?: number;
      twiTotal?: number;
      twitterId?: string;
      twitterImage?: string;
      updatedAt?: Date;
      urlId?: string;
      verticalCover?: string;
      videoContentType?: {
        shows?: boolean;
        video?: boolean;
      };
      videos0?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos13?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos18?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      views?: number;
      watched?: object[];
      watchedCount?: number;
    };
    export type BannerDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image?: string;
      link?: string;
      mainId?: object;
      name?: string;
      originalImage?: string;
      page?:
        | 'HOME'
        | 'LIVE'
        | 'DISCOVER'
        | 'CHANNELS'
        | 'ARTISTS'
        | 'MYLIST'
        | 'PROGRAM'
        | 'PLAYER';
      position?: number | null;
      sortName?: string;
      status?: boolean;
      updatedAt?: Date;
    };
    export type PatchBannerDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image?: string;
      link?: string;
      mainId?: object;
      name?: string;
      originalImage?: string;
      page?:
        | 'HOME'
        | 'LIVE'
        | 'DISCOVER'
        | 'CHANNELS'
        | 'ARTISTS'
        | 'MYLIST'
        | 'PROGRAM'
        | 'PLAYER';
      position?: number | null;
      sortName?: string;
      status?: boolean;
      updatedAt?: Date;
    };
    export type BatchDTO = {
      contentType?: 'Video' | 'Poster' | 'Door';
      createdAt?: Date;
      duration?: number;
      key?: string;
      mimeType?: string;
      previewFirst?: string;
      previewFirstName?: string;
      previewSecond?: string;
      previewSecondName?: string;
      previewThird?: string;
      previewThirdName?: string;
      size?: number;
      status?: string;
      title?: string;
      updatedAt?: Date;
    };
    export type PatchBatchDTO = {
      contentType?: 'Video' | 'Poster' | 'Door';
      createdAt?: Date;
      duration?: number;
      key?: string;
      mimeType?: string;
      previewFirst?: string;
      previewFirstName?: string;
      previewSecond?: string;
      previewSecondName?: string;
      previewThird?: string;
      previewThirdName?: string;
      size?: number;
      status?: string;
      title?: string;
      updatedAt?: Date;
    };
    export type BillingDTO = {
      address: string;
      city: string;
      country:
        | 'Australia'
        | 'Austria'
        | 'Belgium'
        | 'Brazil'
        | 'Bulgaria'
        | 'Canada'
        | 'Croatia'
        | 'Cyprus'
        | 'Czech Republic'
        | 'Denmark'
        | 'Estonia'
        | 'Finland'
        | 'France'
        | 'Germany'
        | 'Gibraltar'
        | 'Greece'
        | 'Hong Kong'
        | 'Hungary'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Japan'
        | 'Latvia'
        | 'Liechtenstein'
        | 'Lithuania'
        | 'Luxembourg'
        | 'Malaysia'
        | 'Malta'
        | 'Mexico'
        | 'Netherlands'
        | 'New Zealand'
        | 'Norway'
        | 'Poland'
        | 'Portugal'
        | 'Romania'
        | 'Singapore'
        | 'Slovakia'
        | 'Slovenia'
        | 'Spain'
        | 'Sweden'
        | 'Switzerland'
        | 'Thailand'
        | 'United Arab Emirates'
        | 'United Kingdom'
        | 'United States';
      state: string;
      telephone: string;
      userId: object;
      zip: string;
    };
    export type PatchBillingDTO = {
      address?: string;
      city?: string;
      country?:
        | 'Australia'
        | 'Austria'
        | 'Belgium'
        | 'Brazil'
        | 'Bulgaria'
        | 'Canada'
        | 'Croatia'
        | 'Cyprus'
        | 'Czech Republic'
        | 'Denmark'
        | 'Estonia'
        | 'Finland'
        | 'France'
        | 'Germany'
        | 'Gibraltar'
        | 'Greece'
        | 'Hong Kong'
        | 'Hungary'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Japan'
        | 'Latvia'
        | 'Liechtenstein'
        | 'Lithuania'
        | 'Luxembourg'
        | 'Malaysia'
        | 'Malta'
        | 'Mexico'
        | 'Netherlands'
        | 'New Zealand'
        | 'Norway'
        | 'Poland'
        | 'Portugal'
        | 'Romania'
        | 'Singapore'
        | 'Slovakia'
        | 'Slovenia'
        | 'Spain'
        | 'Sweden'
        | 'Switzerland'
        | 'Thailand'
        | 'United Arab Emirates'
        | 'United Kingdom'
        | 'United States';
      state?: string;
      telephone?: string;
      userId?: object;
      zip?: string;
    };
    export type BlogDTO = {
      artists?: object[];
      author?: string;
      content?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      featured?: boolean;
      genres?: object[];
      genresValue?: string;
      headerImage?: string;
      image?: string;
      liked?: object[];
      likedCount?: number;
      likesCount?: number;
      originalHeaderImage?: string;
      originalTopPageImage?: string;
      popularity?: number;
      shortContent?: string;
      showHeaderImage?: boolean;
      showTopPageImage?: boolean;
      status?: boolean;
      tags?: string[];
      tagsValue?: string;
      title?: string;
      topPageImage?: string;
      totalPopularity?: number;
      updatedAt?: Date;
      url?: string;
      urlId?: string;
      views?: number;
      watchedCount?: number;
    };
    export type PatchBlogDTO = {
      artists?: object[];
      author?: string;
      content?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      featured?: boolean;
      genres?: object[];
      genresValue?: string;
      headerImage?: string;
      image?: string;
      liked?: object[];
      likedCount?: number;
      likesCount?: number;
      originalHeaderImage?: string;
      originalTopPageImage?: string;
      popularity?: number;
      shortContent?: string;
      showHeaderImage?: boolean;
      showTopPageImage?: boolean;
      status?: boolean;
      tags?: string[];
      tagsValue?: string;
      title?: string;
      topPageImage?: string;
      totalPopularity?: number;
      updatedAt?: Date;
      url?: string;
      urlId?: string;
      views?: number;
      watchedCount?: number;
    };
    export type BSCPackageDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image: string;
      position?: number;
      priceUSD: number;
      title: string;
      updatedAt?: Date;
    };
    export type PatchBSCPackageDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image?: string;
      position?: number;
      priceUSD?: number;
      title?: string;
      updatedAt?: Date;
    };
    export type CategoryDTO = {
      artist?: object[];
      artistCount?: number;
      artistTV?: object[];
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      updatedAt?: Date;
      value?: string;
      video?: object[];
      videoCount?: number;
      videoTV?: object[];
    };
    export type PatchCategoryDTO = {
      artist?: object[];
      artistCount?: number;
      artistTV?: object[];
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      updatedAt?: Date;
      value?: string;
      video?: object[];
      videoCount?: number;
      videoTV?: object[];
    };
    export type ChannelDTO = {
      activateSubscription?: boolean;
      allVideos?: object[];
      allVideosCount?: number;
      allVideosOnlineCount?: number;
      boughtByUsers?: object[];
      coins?: number;
      coinsCurrency?: 'USD' | 'GHS' | 'EUR' | 'GBP';
      coinsTV?: number;
      createdAt?: Date;
      creator: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      customUrl?: string;
      date?: string;
      description?: string;
      editor: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      fake?: boolean;
      featured?: boolean;
      featuredActive?: boolean;
      featuredHomeActive?: boolean;
      featuredHomePosition?: number | null;
      featuredPosition?: number | null;
      featuredTimeActive?: boolean;
      featuredTimePosition?: number | null;
      horizontalCover?: string;
      icon?: string;
      likesCount?: number;
      online?: boolean;
      originalPreview?: string;
      originalSliderTV?: string;
      paid?: boolean;
      payPerView?: boolean;
      paypal_product_id?: string;
      preview?: string;
      previewDetailed?: string;
      previewFirst?: string;
      product_id?: string;
      scheduled?: boolean;
      sliderTV?: string;
      startAt?: Date | null;
      stripe_product_id?: string;
      subscriptions?: {
        month?: number;
        paypal_plan?: string;
        price?: number;
        product_id?: string;
        stripe_plan?: string;
        type?: string;
      }[];
      time?: string;
      timezone?: string;
      title?: string;
      topContent?: boolean;
      type: 'CHANNEL' | 'SERIES';
      updatedAt?: Date;
      urlId?: number;
      verticalCover?: string;
      videoSortBy?: string;
      videos0?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos13?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos18?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
    };
    export type PatchChannelDTO = {
      activateSubscription?: boolean;
      allVideos?: object[];
      allVideosCount?: number;
      allVideosOnlineCount?: number;
      boughtByUsers?: object[];
      coins?: number;
      coinsCurrency?: 'USD' | 'GHS' | 'EUR' | 'GBP';
      coinsTV?: number;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      customUrl?: string;
      date?: string;
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      fake?: boolean;
      featured?: boolean;
      featuredActive?: boolean;
      featuredHomeActive?: boolean;
      featuredHomePosition?: number | null;
      featuredPosition?: number | null;
      featuredTimeActive?: boolean;
      featuredTimePosition?: number | null;
      horizontalCover?: string;
      icon?: string;
      likesCount?: number;
      online?: boolean;
      originalPreview?: string;
      originalSliderTV?: string;
      paid?: boolean;
      payPerView?: boolean;
      paypal_product_id?: string;
      preview?: string;
      previewDetailed?: string;
      previewFirst?: string;
      product_id?: string;
      scheduled?: boolean;
      sliderTV?: string;
      startAt?: Date | null;
      stripe_product_id?: string;
      subscriptions?: {
        month?: number;
        paypal_plan?: string;
        price?: number;
        product_id?: string;
        stripe_plan?: string;
        type?: string;
      }[];
      time?: string;
      timezone?: string;
      title?: string;
      topContent?: boolean;
      type?: 'CHANNEL' | 'SERIES';
      updatedAt?: Date;
      urlId?: number;
      verticalCover?: string;
      videoSortBy?: string;
      videos0?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos13?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
      videos18?: {
        mobile?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
        tv?: {
          count?: number;
          duration?: number;
          lastAdded?: '';
          likes?: number;
          popularity?: number;
          videos?: object[];
          views?: number;
        };
      };
    };
    export type ChatDTO = {
      chatTime?: string;
      createdAt?: Date;
      direct_message?: boolean;
      direct_message_room?: object;
      hidden?: boolean;
      message?: string;
      pinned?: boolean;
      program_id?: object;
      replies?: {
        chatUid?: string;
        hidden?: boolean;
        reply?: string;
        sender?: {
          _id?: object;
          avatar?: string;
          firstName?: string;
          fullName?: string;
          lastName?: string;
        };
        senderName?: string;
        uid?: string;
        userId?: object;
      }[];
      sender?: {
        _id?: object;
        avatar?: string;
        firstName?: string;
        fullName?: string;
        lastName?: string;
      };
      senderName?: string;
      time?: string;
      uid?: string;
      userId?: object;
    };
    export type PatchChatDTO = {
      chatTime?: string;
      createdAt?: Date;
      direct_message?: boolean;
      direct_message_room?: object;
      hidden?: boolean;
      message?: string;
      pinned?: boolean;
      program_id?: object;
      replies?: {
        chatUid?: string;
        hidden?: boolean;
        reply?: string;
        sender?: {
          _id?: object;
          avatar?: string;
          firstName?: string;
          fullName?: string;
          lastName?: string;
        };
        senderName?: string;
        uid?: string;
        userId?: object;
      }[];
      sender?: {
        _id?: object;
        avatar?: string;
        firstName?: string;
        fullName?: string;
        lastName?: string;
      };
      senderName?: string;
      time?: string;
      uid?: string;
      userId?: object;
    };
    export type ClothesDTO = {
      allowedAbilities?: {
        _id: object | string;
        internalName?: string;
        title?: string;
      }[];
      boughtByUsers?: any[];
      category?: string;
      coins?: number;
      coinsCurrency?: 'USD' | 'GHS' | 'EUR' | 'GBP';
      color: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      enable?: boolean;
      featured?: boolean;
      featuredActive?: boolean;
      featuredPosition?: number;
      horizontalCover?: string | null;
      mintingInfo?: {
        type?: {
          isMinted?: boolean;
          tokenId: string;
          transactionHash: string;
        };
      };
      nameBundle?: string;
      owner?: {
        type?: {
          assignedAt?: Date;
          assignedBy?: {
            email?: string;
            fullName?: string;
            id: object | string;
          };
          id: object | string;
        };
      };
      paid?: boolean;
      product_id?: string;
      style: string;
      tags?: string[];
      title: string;
      type?: 'man' | 'woman' | 'boy' | 'girl';
      typeAccess?:
        | 'FREE'
        | 'FIXED_PRICE'
        | 'VIP_ACCESS'
        | 'NFT_TICKET'
        | 'FIXED_PRICE_OR_NFT_TICKET'
        | 'PAY_PER_ACCESS'
        | 'INTERNAL_WALLET'
        | 'EXTERNAL_WALLET'
        | 'APE_LP';
      updatedAt?: Date;
    };
    export type PatchClothesDTO = {
      allowedAbilities?: {
        _id: object | string;
        internalName?: string;
        title?: string;
      }[];
      boughtByUsers?: any[];
      category?: string;
      coins?: number;
      coinsCurrency?: 'USD' | 'GHS' | 'EUR' | 'GBP';
      color?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      enable?: boolean;
      featured?: boolean;
      featuredActive?: boolean;
      featuredPosition?: number;
      horizontalCover?: string | null;
      mintingInfo?: {
        type?: {
          isMinted?: boolean;
          tokenId: string;
          transactionHash: string;
        };
      };
      nameBundle?: string;
      owner?: {
        type?: {
          assignedAt?: Date;
          assignedBy?: {
            email?: string;
            fullName?: string;
            id: object | string;
          };
          id: object | string;
        };
      };
      paid?: boolean;
      product_id?: string;
      style?: string;
      tags?: string[];
      title?: string;
      type?: 'man' | 'woman' | 'boy' | 'girl';
      typeAccess?:
        | 'FREE'
        | 'FIXED_PRICE'
        | 'VIP_ACCESS'
        | 'NFT_TICKET'
        | 'FIXED_PRICE_OR_NFT_TICKET'
        | 'PAY_PER_ACCESS'
        | 'INTERNAL_WALLET'
        | 'EXTERNAL_WALLET'
        | 'APE_LP';
      updatedAt?: Date;
    };
    export type ContentDTO = {
      actor?: object | null;
      actors?: object[];
      aesLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      ageRating?: number;
      algorithm?: string | null;
      alternative?: string;
      aspectRatio?: string;
      attachments?: {
        duration?: number;
        jobId?: string;
        name?: string;
        originalName?: string;
        size?: number;
        status?: string;
        videoType?: string;
        youtubeUrl?: string;
      }[];
      author?: string;
      azureJobs?: any[];
      banner?: string;
      bannerEnabled?: boolean;
      bannerUrl?: string;
      bitrate?: string | null;
      boughtByUsers?: object[];
      broadcasters?: object[];
      categories?: object[];
      channelName?: string;
      channels?: object[];
      coding?: string | null;
      coins?: number;
      coinsB?: number;
      coinsC?: number;
      coinsGHS?: number;
      contentKey?: string;
      contentType?: 'Video' | 'LiveTVVideo';
      copyright?: string;
      countdownInputAsset?: string;
      countdownInputContainer?: string;
      countdownLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      countdownOutputAsset?: string;
      countdownOutputContainer?: string;
      countdownVideoDuration?: number;
      countries?: object[];
      country?: string;
      createdAt?: Date;
      createdByTvUser?: boolean;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      date?: string;
      defaultVenue?: object;
      definition?: string;
      description?: string;
      detailImage?: string;
      detailImageName?: string;
      director?: string;
      donation?: boolean;
      duration?: number;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      enable?: boolean;
      endActivationDate?: Date | null;
      endAt?: number;
      episode?: string | null;
      eventName?: string;
      exclusiveAssignment?: boolean;
      extension?: string;
      fairplayLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      fake?: boolean;
      featured?: boolean;
      featuredActive?: boolean;
      featuredLiveActive?: boolean;
      featuredLivePosition?: number;
      featuredPosition?: number;
      featuredVideoActive?: boolean;
      featuredVideoPosition?: number;
      genres?: object[];
      grading?: string;
      headerTitle?: string;
      hls?: string;
      horizontalCover?: string;
      inputAsset?: string;
      inputContainer?: string;
      inputIps?: {
        ip?: string;
        name?: string;
        subnet?: string;
      }[];
      isAlternative?: boolean;
      isLiveChatEnabled?: boolean;
      isShowViewsEnabled?: boolean;
      joiId?: string;
      jwt?: string;
      language?: object;
      lastWatchedDate?: Date;
      liked?: string[];
      likedDate?: {
        date?: Date;
        id?: string;
      }[];
      likesCount?: number;
      linkVideoId?: object;
      liveOriginalId?: object;
      locators?: string;
      merch?: object[];
      merchType?: string;
      metadataChapters?: string;
      metadataContent?: string;
      metadataContribution?: string;
      mimeType?: string;
      mintingInfo?: {
        isMinted?: boolean;
        tokenId: string;
        transactionHash: string;
      } | null;
      moderators?: object[];
      name?: string;
      onlineMobile?: boolean;
      onlineTV?: string;
      onlyWithSubscription?: boolean;
      original?: object;
      originalDetailImage?: string;
      originalName?: string;
      originalSliderTV?: string;
      originalSliderTVName?: string;
      outputAsset?: string;
      outputContainer?: string;
      owner?: {
        assignedAt?: Date;
        assignedBy?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        id: object;
      } | null;
      p100?: number;
      p25?: number;
      p50?: number;
      p75?: number;
      paid?: boolean;
      payPerView?: boolean;
      payPerViewChannels?: object[];
      popularity?: number;
      posterTV?: string;
      posterTVName?: string;
      preview?: string;
      previewAsset?: string;
      previewContainer?: string;
      previewFirst?: string;
      previewFirstName?: string;
      previewLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      previewSecond?: string;
      previewStreamingUrl?: string;
      previewThird?: string;
      previewThirdName?: string;
      previewTransparent?: string;
      previewTransparentName?: string;
      previewVideo?: string;
      private?: boolean;
      product_id?: string;
      publishing?: string;
      rating?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      refreshDate?: Date;
      resolution?: string;
      restrictInputAccess?: boolean;
      reward?: string;
      roomId?: object;
      score?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      series?: string | null;
      shortDescription?: string;
      showFirstOnPreview?: boolean;
      showTV?: boolean;
      showTVLive?: boolean;
      showTVVideo?: boolean;
      size?: number;
      sliderTV?: string;
      sliderTVName?: string;
      sound?: string | null;
      sourceType?: string;
      squareCover?: string;
      squareCoverName?: string;
      startActivationDate?: Date | null;
      startAt?: number;
      status?: string;
      streamingInputAccessToken?: string;
      streamingStatus?: number;
      studio?: object | null;
      studioName?: string | null;
      subTitle?: string;
      substitute?: object;
      tags?: object[];
      thumbnailContainerName?: string;
      time?: string;
      timezone?: string;
      title?: string;
      totalPopularity?: number;
      trailerDuration?: number;
      trailerInputAsset?: string;
      trailerInputContainer?: string;
      trailerJobId?: string;
      trailerLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      trailerName?: string;
      trailerOriginalName?: string;
      trailerOutputAsset?: string;
      trailerOutputContainer?: string;
      trailerSize?: number;
      trailerType?: string;
      trailerUrl?: string;
      transformedToAWS?: boolean;
      transformedToAzure?: boolean;
      updatedAt?: Date;
      updatedBy?: string;
      urlId?: number;
      verticalCover?: string;
      video?: object[];
      videoContentType?: string;
      videoLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      videoType?: string;
      views?: number;
      watchButtonUrl?: string;
      watched?: string[];
      watchedCount?: number;
      watchedDate?: {
        date?: Date;
        device?: 'ios' | 'android' | 'htc' | 'oculus' | 'site';
        id?: string;
        preview?: number;
        views?: number;
      }[];
      weeklyLikes?: number;
      weeklyPopularity?: number;
      weeklyViews?: number;
      youtubeUrl?: string;
    };
    export type PatchContentDTO = {
      actor?: object | null;
      actors?: object[];
      aesLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      ageRating?: number;
      algorithm?: string | null;
      alternative?: string;
      aspectRatio?: string;
      attachments?: {
        duration?: number;
        jobId?: string;
        name?: string;
        originalName?: string;
        size?: number;
        status?: string;
        videoType?: string;
        youtubeUrl?: string;
      }[];
      author?: string;
      azureJobs?: any[];
      banner?: string;
      bannerEnabled?: boolean;
      bannerUrl?: string;
      bitrate?: string | null;
      boughtByUsers?: object[];
      broadcasters?: object[];
      categories?: object[];
      channelName?: string;
      channels?: object[];
      coding?: string | null;
      coins?: number;
      coinsB?: number;
      coinsC?: number;
      coinsGHS?: number;
      contentKey?: string;
      contentType?: 'Video' | 'LiveTVVideo';
      copyright?: string;
      countdownInputAsset?: string;
      countdownInputContainer?: string;
      countdownLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      countdownOutputAsset?: string;
      countdownOutputContainer?: string;
      countdownVideoDuration?: number;
      countries?: object[];
      country?: string;
      createdAt?: Date;
      createdByTvUser?: boolean;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      date?: string;
      defaultVenue?: object;
      definition?: string;
      description?: string;
      detailImage?: string;
      detailImageName?: string;
      director?: string;
      donation?: boolean;
      duration?: number;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      enable?: boolean;
      endActivationDate?: Date | null;
      endAt?: number;
      episode?: string | null;
      eventName?: string;
      exclusiveAssignment?: boolean;
      extension?: string;
      fairplayLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      fake?: boolean;
      featured?: boolean;
      featuredActive?: boolean;
      featuredLiveActive?: boolean;
      featuredLivePosition?: number;
      featuredPosition?: number;
      featuredVideoActive?: boolean;
      featuredVideoPosition?: number;
      genres?: object[];
      grading?: string;
      headerTitle?: string;
      hls?: string;
      horizontalCover?: string;
      inputAsset?: string;
      inputContainer?: string;
      inputIps?: {
        ip?: string;
        name?: string;
        subnet?: string;
      }[];
      isAlternative?: boolean;
      isLiveChatEnabled?: boolean;
      isShowViewsEnabled?: boolean;
      joiId?: string;
      jwt?: string;
      language?: object;
      lastWatchedDate?: Date;
      liked?: string[];
      likedDate?: {
        date?: Date;
        id?: string;
      }[];
      likesCount?: number;
      linkVideoId?: object;
      liveOriginalId?: object;
      locators?: string;
      merch?: object[];
      merchType?: string;
      metadataChapters?: string;
      metadataContent?: string;
      metadataContribution?: string;
      mimeType?: string;
      mintingInfo?: {
        isMinted?: boolean;
        tokenId: string;
        transactionHash: string;
      } | null;
      moderators?: object[];
      name?: string;
      onlineMobile?: boolean;
      onlineTV?: string;
      onlyWithSubscription?: boolean;
      original?: object;
      originalDetailImage?: string;
      originalName?: string;
      originalSliderTV?: string;
      originalSliderTVName?: string;
      outputAsset?: string;
      outputContainer?: string;
      owner?: {
        assignedAt?: Date;
        assignedBy?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        id: object;
      } | null;
      p100?: number;
      p25?: number;
      p50?: number;
      p75?: number;
      paid?: boolean;
      payPerView?: boolean;
      payPerViewChannels?: object[];
      popularity?: number;
      posterTV?: string;
      posterTVName?: string;
      preview?: string;
      previewAsset?: string;
      previewContainer?: string;
      previewFirst?: string;
      previewFirstName?: string;
      previewLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      previewSecond?: string;
      previewStreamingUrl?: string;
      previewThird?: string;
      previewThirdName?: string;
      previewTransparent?: string;
      previewTransparentName?: string;
      previewVideo?: string;
      private?: boolean;
      product_id?: string;
      publishing?: string;
      rating?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      refreshDate?: Date;
      resolution?: string;
      restrictInputAccess?: boolean;
      reward?: string;
      roomId?: object;
      score?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
      series?: string | null;
      shortDescription?: string;
      showFirstOnPreview?: boolean;
      showTV?: boolean;
      showTVLive?: boolean;
      showTVVideo?: boolean;
      size?: number;
      sliderTV?: string;
      sliderTVName?: string;
      sound?: string | null;
      sourceType?: string;
      squareCover?: string;
      squareCoverName?: string;
      startActivationDate?: Date | null;
      startAt?: number;
      status?: string;
      streamingInputAccessToken?: string;
      streamingStatus?: number;
      studio?: object | null;
      studioName?: string | null;
      subTitle?: string;
      substitute?: object;
      tags?: object[];
      thumbnailContainerName?: string;
      time?: string;
      timezone?: string;
      title?: string;
      totalPopularity?: number;
      trailerDuration?: number;
      trailerInputAsset?: string;
      trailerInputContainer?: string;
      trailerJobId?: string;
      trailerLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      trailerName?: string;
      trailerOriginalName?: string;
      trailerOutputAsset?: string;
      trailerOutputContainer?: string;
      trailerSize?: number;
      trailerType?: string;
      trailerUrl?: string;
      transformedToAWS?: boolean;
      transformedToAzure?: boolean;
      updatedAt?: Date;
      updatedBy?: string;
      urlId?: number;
      verticalCover?: string;
      video?: object[];
      videoContentType?: string;
      videoLocator?: {
        id?: string;
        ism?: string;
        name?: string;
      };
      videoType?: string;
      views?: number;
      watchButtonUrl?: string;
      watched?: string[];
      watchedCount?: number;
      watchedDate?: {
        date?: Date;
        device?: 'ios' | 'android' | 'htc' | 'oculus' | 'site';
        id?: string;
        preview?: number;
        views?: number;
      }[];
      weeklyLikes?: number;
      weeklyPopularity?: number;
      weeklyViews?: number;
      youtubeUrl?: string;
    };
    export type ContentPositionDTO = {
      positions?: {
        contentId?: object;
        position?: number;
      }[];
      userId?: object;
    };
    export type PatchContentPositionDTO = {
      positions?: {
        contentId?: object;
        position?: number;
      }[];
      userId?: object;
    };
    export type CountryDTO = {
      alphaCode?: string;
      createdAt?: Date;
      currency?: string;
      currencyId?: string;
      currencySymbol?: string;
      currencyValue?: number;
      index?: number;
      phoneCode?: string;
      states?: string[];
      updatedAt?: Date;
      value?: string;
    };
    export type PatchCountryDTO = {
      alphaCode?: string;
      createdAt?: Date;
      currency?: string;
      currencyId?: string;
      currencySymbol?: string;
      currencyValue?: number;
      index?: number;
      phoneCode?: string;
      states?: string[];
      updatedAt?: Date;
      value?: string;
    };
    export type EmailDTO = {
      createdAt?: Date;
      email?: string;
      id: object | string;
      ip_address?: string;
      isConfirm?: boolean;
      type?: string;
      userName?: string;
      user_id: object | string;
    };
    export type PatchEmailDTO = {
      createdAt?: Date;
      email?: string;
      id?: object | string;
      ip_address?: string;
      isConfirm?: boolean;
      type?: string;
      userName?: string;
      user_id?: object | string;
    };
    export type EmailDistributionDTO = {
      createdAt?: Date;
      dateSent?: Date;
      email?: string;
      emailStatus?: boolean;
      emailType?: number;
      subscriptionId?: object;
      updatedAt?: Date;
      userId?: object;
    };
    export type PatchEmailDistributionDTO = {
      createdAt?: Date;
      dateSent?: Date;
      email?: string;
      emailStatus?: boolean;
      emailType?: number;
      subscriptionId?: object;
      updatedAt?: Date;
      userId?: object;
    };
    export type FileDTO = {
      contentId?: object;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      filterParams?: {
        category?: object[];
        end?: Date;
        search?: string;
        start?: Date;
      };
      key?: string;
      processTime?: number;
      status?: 'error' | 'processing' | 'completed';
      type?: 'report' | 'allContent' | 'artist' | 'video';
      typeFile?: 'pdf' | 'csv';
      updatedAt?: Date;
    };
    export type PatchFileDTO = {
      contentId?: object;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      filterParams?: {
        category?: object[];
        end?: Date;
        search?: string;
        start?: Date;
      };
      key?: string;
      processTime?: number;
      status?: 'error' | 'processing' | 'completed';
      type?: 'report' | 'allContent' | 'artist' | 'video';
      typeFile?: 'pdf' | 'csv';
      updatedAt?: Date;
    };
    export type FriendsDTO = {
      createdAt?: Date;
      friend?: {
        id: object | string;
        profileType?: string;
      };
      friendshipConfirmed?: boolean;
      user?: {
        id: object | string;
        profileType?: string;
      };
    };
    export type PatchFriendsDTO = {
      createdAt?: Date;
      friend?: {
        id: object | string;
        profileType?: string;
      };
      friendshipConfirmed?: boolean;
      user?: {
        id: object | string;
        profileType?: string;
      };
    };
    export type GenreDTO = {
      artist?: object[];
      artistCount?: number;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      updatedAt?: Date;
      value?: string;
      video?: object[];
      videoCount?: number;
    };
    export type PatchGenreDTO = {
      artist?: object[];
      artistCount?: number;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      updatedAt?: Date;
      value?: string;
      video?: object[];
      videoCount?: number;
    };
    export type HelpVideoDTO = {
      contentKeyID?: string;
      createdAt?: Date;
      hls?: string;
      jobId?: string;
      name?: string;
      status?: string;
      type?: 'INSTRUCTIONS' | 'HELP' | 'GEAR_INSTRUCTIONS';
      updatedAt?: Date;
    };
    export type PatchHelpVideoDTO = {
      contentKeyID?: string;
      createdAt?: Date;
      hls?: string;
      jobId?: string;
      name?: string;
      status?: string;
      type?: 'INSTRUCTIONS' | 'HELP' | 'GEAR_INSTRUCTIONS';
      updatedAt?: Date;
    };
    export type LanguageDTO = {
      ISO_2?: string;
      createdAt?: Date;
      updatedAt?: Date;
      value?: string;
    };
    export type PatchLanguageDTO = {
      ISO_2?: string;
      createdAt?: Date;
      updatedAt?: Date;
      value?: string;
    };
    export type LikesDTO = {
      createdAt?: Date;
      entity: 'Contents' | 'Artists' | 'Channels' | 'Blogs';
      entityId: object;
      userId: object;
    };
    export type PatchLikesDTO = {
      createdAt?: Date;
      entity?: 'Contents' | 'Artists' | 'Channels' | 'Blogs';
      entityId?: object;
      userId?: object;
    };
    export type MerchDTO = {
      artists?: object[];
      artistsName?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      default?: boolean;
      description: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image: string;
      link: string;
      name: string;
      originalImage: string;
      type: string;
      typeIndex?: number;
      updatedAt?: Date;
    };
    export type PatchMerchDTO = {
      artists?: object[];
      artistsName?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      default?: boolean;
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image?: string;
      link?: string;
      name?: string;
      originalImage?: string;
      type?: string;
      typeIndex?: number;
      updatedAt?: Date;
    };
    export type MetaTagDTO = {
      content?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      defaultImage?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image?: string;
      link?: string;
      page?: string;
      type?: string;
      updatedAt?: Date;
    };
    export type PatchMetaTagDTO = {
      content?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      defaultImage?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      image?: string;
      link?: string;
      page?: string;
      type?: string;
      updatedAt?: Date;
    };
    export type ModuleDTO = {
      createdAt?: Date;
      href?: string;
      mname?: string;
      name?: string;
      position: number;
      updatedAt?: Date;
    };
    export type PatchModuleDTO = {
      createdAt?: Date;
      href?: string;
      mname?: string;
      name?: string;
      position?: number;
      updatedAt?: Date;
    };
    export type MultiStreamDTO = {
      actors?: object[];
      actorsStatus?: {
        actor: object;
        audio?: boolean;
        video?: boolean;
      }[];
      ceekers?: object[];
      contentId: object;
      createdAt?: Date;
      handRaiseAllowed?: boolean;
      handRaisers?: object[];
      host: object;
      player?: {
        action?: string;
        position?: number;
        updatedAt?: Date;
        videoId: object;
      }[];
      playerPosition?: number;
      videoStartedAt?: number;
      vips?: object[];
    };
    export type PatchMultiStreamDTO = {
      actors?: object[];
      actorsStatus?: {
        actor: object;
        audio?: boolean;
        video?: boolean;
      }[];
      ceekers?: object[];
      contentId?: object;
      createdAt?: Date;
      handRaiseAllowed?: boolean;
      handRaisers?: object[];
      host?: object;
      player?: {
        action?: string;
        position?: number;
        updatedAt?: Date;
        videoId: object;
      }[];
      playerPosition?: number;
      videoStartedAt?: number;
      vips?: object[];
    };
    export type NewsLetterDTO = {
      ageRating?: number;
      blocksEntities?: {
        active?: boolean;
        content?: {
          entity?: string;
          type?: 'description' | 'list';
        };
        image?: string;
        link?: string;
        linkTwo?: string;
        text?: string;
        textLink?: string;
        textLinkTwo?: string;
        textTwo?: string;
        title?: string;
      }[];
      blogId?: object | null;
      blog_link_text?: string;
      blog_main_title_1?: string;
      blog_main_title_2?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      customBlog?: {
        content?: string;
        image?: string;
        link?: string;
        title?: string;
      };
      discount?: string;
      discountType?: 'Always' | 'Never' | 'Only mobile' | 'Only desktop';
      door?: object;
      door_title?: string;
      download_link?: string;
      download_link_text?: string;
      download_text?: string;
      download_text_2?: string;
      download_title?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      featured?: object;
      featured_artist?: object;
      headerImage?: string;
      headerImageMobile?: string;
      link_1?: string;
      name?: string;
      subject?: string;
      text?: string;
      text_1?: string;
      text_2?: string;
      text_link_1?: string;
      trending?: object;
      trendingURL?: string;
      type?: 'default' | 'landlot';
      updatedAt?: Date;
      vrHeadsetImage1?: string;
      vrHeadsetImage2?: string;
      vr_headset_text_1?: string;
      vr_headset_text_2?: string;
      vr_headset_text_3?: string;
    };
    export type PatchNewsLetterDTO = {
      ageRating?: number;
      blocksEntities?: {
        active?: boolean;
        content?: {
          entity?: string;
          type?: 'description' | 'list';
        };
        image?: string;
        link?: string;
        linkTwo?: string;
        text?: string;
        textLink?: string;
        textLinkTwo?: string;
        textTwo?: string;
        title?: string;
      }[];
      blogId?: object | null;
      blog_link_text?: string;
      blog_main_title_1?: string;
      blog_main_title_2?: string;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      customBlog?: {
        content?: string;
        image?: string;
        link?: string;
        title?: string;
      };
      discount?: string;
      discountType?: 'Always' | 'Never' | 'Only mobile' | 'Only desktop';
      door?: object;
      door_title?: string;
      download_link?: string;
      download_link_text?: string;
      download_text?: string;
      download_text_2?: string;
      download_title?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      featured?: object;
      featured_artist?: object;
      headerImage?: string;
      headerImageMobile?: string;
      link_1?: string;
      name?: string;
      subject?: string;
      text?: string;
      text_1?: string;
      text_2?: string;
      text_link_1?: string;
      trending?: object;
      trendingURL?: string;
      type?: 'default' | 'landlot';
      updatedAt?: Date;
      vrHeadsetImage1?: string;
      vrHeadsetImage2?: string;
      vr_headset_text_1?: string;
      vr_headset_text_2?: string;
      vr_headset_text_3?: string;
    };
    export type NotificationDTO = {
      content?: {
        _id: object | string;
        artist?: {
          _id: object | string;
          avatar?: string;
          icon?: string;
          mainName?: string;
          name?: string;
          urlId?: string;
        };
        blog?: {
          _id: object | string;
          image?: string;
          title?: string;
        };
        image?: string;
        title?: string;
      };
      createdAt?: Date;
      direct_message?: {
        message?: string;
        message_id: object | string;
        sender: object | string;
        userName?: string;
      };
      reply?: {
        message?: string;
        message_id: object | string;
        reply?: string;
        sender: object | string;
        userName?: string;
      };
      type?: 'Video' | 'LiveTVVideo' | 'Blog' | 'Reply' | 'DirectMessage';
      users?: {
        _id: object | string;
        received?: boolean;
      }[];
    };
    export type PatchNotificationDTO = {
      content?: {
        _id: object | string;
        artist?: {
          _id: object | string;
          avatar?: string;
          icon?: string;
          mainName?: string;
          name?: string;
          urlId?: string;
        };
        blog?: {
          _id: object | string;
          image?: string;
          title?: string;
        };
        image?: string;
        title?: string;
      };
      createdAt?: Date;
      direct_message?: {
        message?: string;
        message_id: object | string;
        sender: object | string;
        userName?: string;
      };
      reply?: {
        message?: string;
        message_id: object | string;
        reply?: string;
        sender: object | string;
        userName?: string;
      };
      type?: 'Video' | 'LiveTVVideo' | 'Blog' | 'Reply' | 'DirectMessage';
      users?: {
        _id: object | string;
        received?: boolean;
      }[];
    };
    export type PaymentDTO = {
      amount?: string;
      ceekTokens?: number;
      coins?: number;
      createdAt?: Date;
      paymentId?: string;
      receiptId?: string;
      receiptRaw?: any;
      store?:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      transactionId?: string;
      type?: 'Promo Code' | 'From Market';
      updatedAt?: Date;
      user?: object;
    };
    export type PatchPaymentDTO = {
      amount?: string;
      ceekTokens?: number;
      coins?: number;
      createdAt?: Date;
      paymentId?: string;
      receiptId?: string;
      receiptRaw?: any;
      store?:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      transactionId?: string;
      type?: 'Promo Code' | 'From Market';
      updatedAt?: Date;
      user?: object;
    };
    export type PermissionDTO = {
      accessProfileId?: object;
      delete?: boolean;
      moduleId?: object;
      read?: boolean;
      write?: boolean;
    };
    export type PatchPermissionDTO = {
      accessProfileId?: object;
      delete?: boolean;
      moduleId?: object;
      read?: boolean;
      write?: boolean;
    };
    export type ProgramRemindDTO = {
      active?: boolean;
      program_id?: object;
      updatedAt?: Date;
      user_id?: object;
    };
    export type PatchProgramRemindDTO = {
      active?: boolean;
      program_id?: object;
      updatedAt?: Date;
      user_id?: object;
    };
    export type PromoCodeDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      months?: number;
      promoCode?: string;
      subscriptionType?: object;
      type?: string;
      updatedAt?: Date;
      usedByUser?: object;
      wasUsed?: boolean;
      wasUsedForSubscription?: boolean;
      wasUsedForSubscriptionDate?: Date;
    };
    export type PatchPromoCodeDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      months?: number;
      promoCode?: string;
      subscriptionType?: object;
      type?: string;
      updatedAt?: Date;
      usedByUser?: object;
      wasUsed?: boolean;
      wasUsedForSubscription?: boolean;
      wasUsedForSubscriptionDate?: Date;
    };
    export type PurchaseDTO = {
      amount?: number;
      artist?: object;
      boughtByContentId?: object;
      channel?: object;
      channels?: object;
      clothes?: object;
      coins?: number;
      content?: object;
      contentType?: string;
      contents?: object;
      createdAt?: Date;
      dateEnd?: Date;
      dateStart?: Date;
      device?: 'mobile' | 't';
      failedReason?: string;
      fullName?: string;
      image?: string;
      merch?: object;
      purchasePackage?: object;
      purchasePackageName?: string;
      room?: object;
      status?: 'Pending' | 'Successful' | 'Failed';
      store?:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      subscription?: {
        active?: boolean;
        contentType?: 'Subscription' | 'Channel';
        id?: object;
        manual?: boolean;
      };
      title?: string;
      transactionId?: string;
      type?:
        | 'PURCHASE_PACKAGE'
        | 'SUBSCRIPTION'
        | 'BSC_TOKEN'
        | 'CONTENT'
        | 'CHANNEL'
        | 'DONATION'
        | 'CLOTHES'
        | 'ANIMATIONS'
        | 'RIDES'
        | 'LIVE'
        | 'ROOM'
        | 'STAR_DONATION'
        | 'ASK_ME_ANYTHING'
        | 'NFT_TOKEN';
      updatedAt?: Date;
      user?: {
        email?: string;
        id?: object;
        userName?: string;
      };
      userName?: string;
    };
    export type PatchPurchaseDTO = {
      amount?: number;
      artist?: object;
      boughtByContentId?: object;
      channel?: object;
      channels?: object;
      clothes?: object;
      coins?: number;
      content?: object;
      contentType?: string;
      contents?: object;
      createdAt?: Date;
      dateEnd?: Date;
      dateStart?: Date;
      device?: 'mobile' | 't';
      failedReason?: string;
      fullName?: string;
      image?: string;
      merch?: object;
      purchasePackage?: object;
      purchasePackageName?: string;
      room?: object;
      status?: 'Pending' | 'Successful' | 'Failed';
      store?:
        | 'Airdrop'
        | 'Airtel'
        | 'Stripe'
        | 'PayPal'
        | 'MomoPay'
        | 'PlayStore'
        | 'AppleStore'
        | 'PayStack'
        | 'BSC_Token';
      subscription?: {
        active?: boolean;
        contentType?: 'Subscription' | 'Channel';
        id?: object;
        manual?: boolean;
      };
      title?: string;
      transactionId?: string;
      type?:
        | 'PURCHASE_PACKAGE'
        | 'SUBSCRIPTION'
        | 'BSC_TOKEN'
        | 'CONTENT'
        | 'CHANNEL'
        | 'DONATION'
        | 'CLOTHES'
        | 'ANIMATIONS'
        | 'RIDES'
        | 'LIVE'
        | 'ROOM'
        | 'STAR_DONATION'
        | 'ASK_ME_ANYTHING'
        | 'NFT_TOKEN';
      updatedAt?: Date;
      user?: {
        email?: string;
        id?: object;
        userName?: string;
      };
      userName?: string;
    };
    export type PurchasePackageDTO = {
      channels?: object[];
      contents?: object[];
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      generateAvatar?: boolean;
      image?: string;
      merch?: object[];
      name?: string;
      originalImage?: string;
      price?: number;
      subscription?: object;
      updatedAt?: Date;
    };
    export type PatchPurchasePackageDTO = {
      channels?: object[];
      contents?: object[];
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      generateAvatar?: boolean;
      image?: string;
      merch?: object[];
      name?: string;
      originalImage?: string;
      price?: number;
      subscription?: object;
      updatedAt?: Date;
    };
    export type RedirectDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      destination?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      source?: string;
      updatedAt?: Date;
    };
    export type PatchRedirectDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      destination?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      source?: string;
      updatedAt?: Date;
    };
    export type ReportDTO = {
      course?: number;
      createdAt?: Date;
      data?: {
        activateaed?: string;
        aedactivation?: string;
        codeblue?: string;
        compressions?: string;
        pulse?: string;
        rescuebreaths?: string;
        responsiveness?: string;
      };
      startedAt?: Date;
      totalTime?: number;
      type?: 'Learn' | 'Rescue';
      updatedAt?: Date;
      user?: object;
    };
    export type PatchReportDTO = {
      course?: number;
      createdAt?: Date;
      data?: {
        activateaed?: string;
        aedactivation?: string;
        codeblue?: string;
        compressions?: string;
        pulse?: string;
        rescuebreaths?: string;
        responsiveness?: string;
      };
      startedAt?: Date;
      totalTime?: number;
      type?: 'Learn' | 'Rescue';
      updatedAt?: Date;
      user?: object;
    };
    export type RoomDTO = {
      airdrops?: {
        type?: {
          transferred?: 0;
        };
      };
      assetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      assetIos?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      bannedUsers?: {
        _id: object | string;
        duration: string;
        end?: Date | null;
        start?: Date | null;
      }[];
      boughtByUsers?: any[];
      capacity?: number;
      channels?: (object | string)[];
      coins?: 0;
      contentCount?: 0;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      enable?: boolean;
      externalId: string;
      featured?: boolean;
      featuredActive?: boolean;
      featuredPosition?: number | null | 0;
      gameAssetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      gameAssetIOS?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      gearAssetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      helpVideo?: {
        name?: string;
        status?: string;
      };
      horizontalCover?: string;
      initialRoom?: boolean;
      instructionsVideo?: {
        name?: string;
        status?: string;
      };
      isMultiplayer?: boolean;
      isRentalAllowed?: boolean;
      mintingInfo?: {
        type?: {
          isMinted?: boolean;
          tokenId: string;
          transactionHash: string;
        };
      };
      moderators?: (object | string)[];
      oculusAssetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      oculusAssetWindows?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      owner?: {
        type?: {
          assignedAt?: Date;
          assignedBy?: {
            email?: string;
            fullName?: string;
            id: object | string;
          };
          id: object | string;
        };
      };
      paid?: boolean;
      product_id?: string;
      squareCover?: string;
      tags?: string[];
      title: string;
      type?: string;
      typeAccess?:
        | 'FREE'
        | 'FIXED_PRICE'
        | 'VIP_ACCESS'
        | 'NFT_TICKET'
        | 'FIXED_PRICE_OR_NFT_TICKET'
        | 'PAY_PER_ACCESS'
        | 'INTERNAL_WALLET'
        | 'EXTERNAL_WALLET'
        | 'APE_LP';
      updatedAt?: Date;
      verticalCover?: string;
      viveAssetWindows?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      weblinks?: {
        _id: object | string;
        createdAt?: Date;
        creator?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        editor?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        updatedAt?: Date;
        url: string;
      }[];
    };
    export type PatchRoomDTO = {
      airdrops?: {
        type?: {
          transferred?: 0;
        };
      };
      assetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      assetIos?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      bannedUsers?: {
        _id: object | string;
        duration: string;
        end?: Date | null;
        start?: Date | null;
      }[];
      boughtByUsers?: any[];
      capacity?: number;
      channels?: (object | string)[];
      coins?: 0;
      contentCount?: 0;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      description?: string;
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      enable?: boolean;
      externalId?: string;
      featured?: boolean;
      featuredActive?: boolean;
      featuredPosition?: number | null | 0;
      gameAssetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      gameAssetIOS?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      gearAssetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      helpVideo?: {
        name?: string;
        status?: string;
      };
      horizontalCover?: string;
      initialRoom?: boolean;
      instructionsVideo?: {
        name?: string;
        status?: string;
      };
      isMultiplayer?: boolean;
      isRentalAllowed?: boolean;
      mintingInfo?: {
        type?: {
          isMinted?: boolean;
          tokenId: string;
          transactionHash: string;
        };
      };
      moderators?: (object | string)[];
      oculusAssetAndroid?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      oculusAssetWindows?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      owner?: {
        type?: {
          assignedAt?: Date;
          assignedBy?: {
            email?: string;
            fullName?: string;
            id: object | string;
          };
          id: object | string;
        };
      };
      paid?: boolean;
      product_id?: string;
      squareCover?: string;
      tags?: string[];
      title?: string;
      type?: string;
      typeAccess?:
        | 'FREE'
        | 'FIXED_PRICE'
        | 'VIP_ACCESS'
        | 'NFT_TICKET'
        | 'FIXED_PRICE_OR_NFT_TICKET'
        | 'PAY_PER_ACCESS'
        | 'INTERNAL_WALLET'
        | 'EXTERNAL_WALLET'
        | 'APE_LP';
      updatedAt?: Date;
      verticalCover?: string;
      viveAssetWindows?: {
        bundle?: string;
        hash?: string;
        size?: 0;
      };
      weblinks?: {
        _id: object | string;
        createdAt?: Date;
        creator?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        editor?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        updatedAt?: Date;
        url: string;
      }[];
    };
    export type RoomSegmentDTO = {
      content?: {
        ageRating?: number;
        gallery?: {
          enabled?: boolean;
          image?: string;
        }[];
        id?: object;
        orientation?: string;
        position?: number;
        substitute?: object;
        title?: string;
        type?: string;
      }[];
      count?: number;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      index?: number;
      maxContentCount?: number;
      online?: boolean;
      preview?: string;
      program?: {
        id?: object;
        position?: number;
        title?: string;
      }[];
      roomId?: object;
      title?: string;
      updatedAt?: Date;
    };
    export type PatchRoomSegmentDTO = {
      content?: {
        ageRating?: number;
        gallery?: {
          enabled?: boolean;
          image?: string;
        }[];
        id?: object;
        orientation?: string;
        position?: number;
        substitute?: object;
        title?: string;
        type?: string;
      }[];
      count?: number;
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      index?: number;
      maxContentCount?: number;
      online?: boolean;
      preview?: string;
      program?: {
        id?: object;
        position?: number;
        title?: string;
      }[];
      roomId?: object;
      title?: string;
      updatedAt?: Date;
    };
    export type SearchDTO = {
      contentType?:
        | 'All'
        | 'Video'
        | 'Poster'
        | 'Avatar'
        | 'Room'
        | 'Channel'
        | 'Content'
        | 'VideoForTV'
        | 'Door';
      count?: number;
      createdAt?: Date;
      query: string;
      updatedAt?: Date;
      userId?: object;
    };
    export type PatchSearchDTO = {
      contentType?:
        | 'All'
        | 'Video'
        | 'Poster'
        | 'Avatar'
        | 'Room'
        | 'Channel'
        | 'Content'
        | 'VideoForTV'
        | 'Door';
      count?: number;
      createdAt?: Date;
      query?: string;
      updatedAt?: Date;
      userId?: object;
    };
    export type ShippingDTO = {
      address: string;
      city: string;
      country:
        | 'Australia'
        | 'Austria'
        | 'Belgium'
        | 'Brazil'
        | 'Bulgaria'
        | 'Canada'
        | 'Croatia'
        | 'Cyprus'
        | 'Czech Republic'
        | 'Denmark'
        | 'Estonia'
        | 'Finland'
        | 'France'
        | 'Germany'
        | 'Gibraltar'
        | 'Greece'
        | 'Hong Kong'
        | 'Hungary'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Japan'
        | 'Latvia'
        | 'Liechtenstein'
        | 'Lithuania'
        | 'Luxembourg'
        | 'Malaysia'
        | 'Malta'
        | 'Mexico'
        | 'Netherlands'
        | 'New Zealand'
        | 'Norway'
        | 'Poland'
        | 'Portugal'
        | 'Romania'
        | 'Singapore'
        | 'Slovakia'
        | 'Slovenia'
        | 'Spain'
        | 'Sweden'
        | 'Switzerland'
        | 'Thailand'
        | 'United Arab Emirates'
        | 'United Kingdom'
        | 'United States';
      isSameAsBilling?: boolean;
      state: string;
      telephone: string;
      userId: object;
      zip: string;
    };
    export type PatchShippingDTO = {
      address?: string;
      city?: string;
      country?:
        | 'Australia'
        | 'Austria'
        | 'Belgium'
        | 'Brazil'
        | 'Bulgaria'
        | 'Canada'
        | 'Croatia'
        | 'Cyprus'
        | 'Czech Republic'
        | 'Denmark'
        | 'Estonia'
        | 'Finland'
        | 'France'
        | 'Germany'
        | 'Gibraltar'
        | 'Greece'
        | 'Hong Kong'
        | 'Hungary'
        | 'India'
        | 'Ireland'
        | 'Italy'
        | 'Japan'
        | 'Latvia'
        | 'Liechtenstein'
        | 'Lithuania'
        | 'Luxembourg'
        | 'Malaysia'
        | 'Malta'
        | 'Mexico'
        | 'Netherlands'
        | 'New Zealand'
        | 'Norway'
        | 'Poland'
        | 'Portugal'
        | 'Romania'
        | 'Singapore'
        | 'Slovakia'
        | 'Slovenia'
        | 'Spain'
        | 'Sweden'
        | 'Switzerland'
        | 'Thailand'
        | 'United Arab Emirates'
        | 'United Kingdom'
        | 'United States';
      isSameAsBilling?: boolean;
      state?: string;
      telephone?: string;
      userId?: object;
      zip?: string;
    };
    export type StaticPricesDTO = {
      createdAt?: Date;
      price?: number;
      product_id?: string;
      updatedAt?: Date;
    };
    export type PatchStaticPricesDTO = {
      createdAt?: Date;
      price?: number;
      product_id?: string;
      updatedAt?: Date;
    };
    export type StudioDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      icon?: string;
      name?: string;
      price?: 0;
      totalViews?: 0;
      updatedAt?: Date;
    };
    export type PatchStudioDTO = {
      createdAt?: Date;
      creator?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      editor?: {
        email?: string;
        fullName?: string;
        id: object | string;
      };
      icon?: string;
      name?: string;
      price?: 0;
      totalViews?: 0;
      updatedAt?: Date;
    };
    export type SubscriberDTO = {
      active?: boolean;
      comment?: string;
      createdAt?: Date;
      email?: string;
      firstName?: string;
      ip_address?: string;
      lastName?: string;
      source?: string;
    };
    export type PatchSubscriberDTO = {
      active?: boolean;
      comment?: string;
      createdAt?: Date;
      email?: string;
      firstName?: string;
      ip_address?: string;
      lastName?: string;
      source?: string;
    };
    export type SubscriptionTypeDTO = {
      coins?: number;
      createdAt?: Date;
      paypal_plan?: string;
      price?: number;
      stripe_plan?: string;
      title?: 'Month' | 'Season' | 'Year';
      type?: 'M' | 'S' | 'Y';
      updatedAt?: Date;
    };
    export type PatchSubscriptionTypeDTO = {
      coins?: number;
      createdAt?: Date;
      paypal_plan?: string;
      price?: number;
      stripe_plan?: string;
      title?: 'Month' | 'Season' | 'Year';
      type?: 'M' | 'S' | 'Y';
      updatedAt?: Date;
    };
    export type UserDTO = {
      BSCTokens?: 0;
      BSCWalletAddress?: string;
      KYCVerification?: {
        verifiedAt?: Date;
        verifiedBy?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
      };
      accessProfileId?: object | string;
      accessToken?: string;
      airdropCollectedSchema?: {
        collected?: 0;
        rooms?: {
          collected?: 0;
          events?: {
            collected?: 0;
            id?: object | string;
            transferred?: 0;
          }[];
          roomId: object | string;
          transferred?: 0;
        }[];
        transferred?: 0;
      };
      androidDevice?: {
        notificationToken?: string;
        version?: string;
      };
      appleId?: string;
      avatar?: string;
      balanceBNB?: 0;
      banned?: {
        end?: Date;
        forever?: boolean;
        start?: Date;
        type?: string;
      };
      birthDate?: Date;
      blockedUsers?: (object | string)[];
      city?: string;
      color?: string;
      country?: string;
      countryId?: object;
      createdAt?: Date;
      crypto_address?: string;
      customer?: string;
      dateEnd?: Date;
      deletedBy?: {
        deletedAt?: Date;
        email?: string;
        fullName?: string;
        id: object | string;
      };
      device?: 'site' | 'ios' | 'android' | 'oculus' | 'htc';
      didimoAvatar?: {
        date?: Date;
        file?: string;
        frontImage?: string;
        id?: string;
      };
      direct_message_rooms?: any[];
      email?: string;
      externalWallets?: {
        type?: number;
        wallet?: string;
      }[];
      ey?: number;
      eyes?: string;
      fake?: boolean;
      fbId?: string;
      firstName?: string;
      forgotToken?: string;
      fullName?: string;
      gender?: 'male' | 'female' | 'none';
      hair?: string;
      hasActivePurchase?: boolean;
      hasExternal2FA?: boolean;
      htcViveUserId?: string;
      identityToken?: string;
      invitedBy?: object | string;
      iosDevice?: {
        notificationToken?: string;
        version?: string;
      };
      ip_address?: string;
      ip_city?: string;
      ip_country?: string;
      ip_region?: string;
      isActiveAccount?: boolean;
      isBlocked?: boolean;
      isContentCreator?: {
        verifiedAt?: Date;
        verifiedBy?: {
          _id: object | string;
          email?: string;
          name?: string;
        };
      };
      isDeleted?: boolean;
      isOwnerFor?: {
        clothes?: {
          status?: boolean;
          verifiedAt?: Date;
          verifiedBy: object | string;
        };
        lives?: {
          status?: boolean;
          verifiedAt?: Date;
          verifiedBy: object | string;
        };
        rooms?: {
          status?: boolean;
          verifiedAt?: Date;
          verifiedBy: object | string;
        };
      };
      isStakeholder?: {
        verifiedAt?: Date;
        verifiedBy?: {
          _id: object | string;
          email?: string;
          name?: string;
        };
      };
      isVenueBuilder?: {
        verifiedAt?: Date;
        verifiedBy?: {
          _id: object | string;
          email?: string;
          name?: string;
        };
      };
      isVotingApp?: boolean;
      lastActive?: Date;
      lastLogin?: Date;
      lastName?: string;
      linkedArtist?: object;
      marketAddress?: string;
      mobileAvatar?: any[];
      mobileNumber?: string;
      moderatorConfig?: {
        lives?: (object | string)[];
        rooms?: (object | string)[];
      };
      oculusId?: string;
      online?: boolean;
      originalAvatar?: string;
      password?: string;
      passwordConfirm?: {
        date?: Date;
        password?: string;
        token?: string;
      };
      phoneNumber?: string;
      profileType?: string;
      promoCode?: string;
      purchasesCount?: {
        successful?: 0;
        total?: 0;
      };
      px?: number;
      py?: number;
      pz?: number;
      reasonOfBlocking?: string;
      region?: string;
      role?: number;
      roomExternalId?: string;
      roomId: object | string;
      securityToken?: string;
      skinnedMeshRender?: string;
      superPowers?: {
        name?: string;
        score?: number;
      }[];
      twoFactorAuth?: {
        editor?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        enabled?: boolean;
        modifiedAt?: Date;
        provider?: 'SMS' | 'EMAIL' | 'TOTP';
        resetToken?: any[];
        totpSeed?: string;
      };
      type?: string;
      typeFace?: string;
      updatedAt?: Date;
      usedITunesGift?: boolean;
      usedPromoCodes?: {
        date?: Date;
        id?: object | string;
      }[];
      userName?: string;
      userNameSearch?: string;
      verify?: {
        verifiedAt?: Date;
        verifiedBy?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
      };
      vrId?: string;
    };
    export type PatchUserDTO = {
      BSCTokens?: 0;
      BSCWalletAddress?: string;
      KYCVerification?: {
        verifiedAt?: Date;
        verifiedBy?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
      };
      accessProfileId?: object | string;
      accessToken?: string;
      airdropCollectedSchema?: {
        collected?: 0;
        rooms?: {
          collected?: 0;
          events?: {
            collected?: 0;
            id?: object | string;
            transferred?: 0;
          }[];
          roomId: object | string;
          transferred?: 0;
        }[];
        transferred?: 0;
      };
      androidDevice?: {
        notificationToken?: string;
        version?: string;
      };
      appleId?: string;
      avatar?: string;
      balanceBNB?: 0;
      banned?: {
        end?: Date;
        forever?: boolean;
        start?: Date;
        type?: string;
      };
      birthDate?: Date;
      blockedUsers?: (object | string)[];
      city?: string;
      color?: string;
      country?: string;
      countryId?: object;
      createdAt?: Date;
      crypto_address?: string;
      customer?: string;
      dateEnd?: Date;
      deletedBy?: {
        deletedAt?: Date;
        email?: string;
        fullName?: string;
        id: object | string;
      };
      device?: 'site' | 'ios' | 'android' | 'oculus' | 'htc';
      didimoAvatar?: {
        date?: Date;
        file?: string;
        frontImage?: string;
        id?: string;
      };
      direct_message_rooms?: any[];
      email?: string;
      externalWallets?: {
        type?: number;
        wallet?: string;
      }[];
      ey?: number;
      eyes?: string;
      fake?: boolean;
      fbId?: string;
      firstName?: string;
      forgotToken?: string;
      fullName?: string;
      gender?: 'male' | 'female' | 'none';
      hair?: string;
      hasActivePurchase?: boolean;
      hasExternal2FA?: boolean;
      htcViveUserId?: string;
      identityToken?: string;
      invitedBy?: object | string;
      iosDevice?: {
        notificationToken?: string;
        version?: string;
      };
      ip_address?: string;
      ip_city?: string;
      ip_country?: string;
      ip_region?: string;
      isActiveAccount?: boolean;
      isBlocked?: boolean;
      isContentCreator?: {
        verifiedAt?: Date;
        verifiedBy?: {
          _id: object | string;
          email?: string;
          name?: string;
        };
      };
      isDeleted?: boolean;
      isOwnerFor?: {
        clothes?: {
          status?: boolean;
          verifiedAt?: Date;
          verifiedBy: object | string;
        };
        lives?: {
          status?: boolean;
          verifiedAt?: Date;
          verifiedBy: object | string;
        };
        rooms?: {
          status?: boolean;
          verifiedAt?: Date;
          verifiedBy: object | string;
        };
      };
      isStakeholder?: {
        verifiedAt?: Date;
        verifiedBy?: {
          _id: object | string;
          email?: string;
          name?: string;
        };
      };
      isVenueBuilder?: {
        verifiedAt?: Date;
        verifiedBy?: {
          _id: object | string;
          email?: string;
          name?: string;
        };
      };
      isVotingApp?: boolean;
      lastActive?: Date;
      lastLogin?: Date;
      lastName?: string;
      linkedArtist?: object;
      marketAddress?: string;
      mobileAvatar?: any[];
      mobileNumber?: string;
      moderatorConfig?: {
        lives?: (object | string)[];
        rooms?: (object | string)[];
      };
      oculusId?: string;
      online?: boolean;
      originalAvatar?: string;
      password?: string;
      passwordConfirm?: {
        date?: Date;
        password?: string;
        token?: string;
      };
      phoneNumber?: string;
      profileType?: string;
      promoCode?: string;
      purchasesCount?: {
        successful?: 0;
        total?: 0;
      };
      px?: number;
      py?: number;
      pz?: number;
      reasonOfBlocking?: string;
      region?: string;
      role?: number;
      roomExternalId?: string;
      roomId?: object | string;
      securityToken?: string;
      skinnedMeshRender?: string;
      superPowers?: {
        name?: string;
        score?: number;
      }[];
      twoFactorAuth?: {
        editor?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
        enabled?: boolean;
        modifiedAt?: Date;
        provider?: 'SMS' | 'EMAIL' | 'TOTP';
        resetToken?: any[];
        totpSeed?: string;
      };
      type?: string;
      typeFace?: string;
      updatedAt?: Date;
      usedITunesGift?: boolean;
      usedPromoCodes?: {
        date?: Date;
        id?: object | string;
      }[];
      userName?: string;
      userNameSearch?: string;
      verify?: {
        verifiedAt?: Date;
        verifiedBy?: {
          email?: string;
          fullName?: string;
          id: object | string;
        };
      };
      vrId?: string;
    };
    export type PlayListDTO = {
      createdAt?: Date;
      name?: string;
      updatedAt?: Date;
      userId: object;
      videos?: object[];
    };
    export type PatchPlayListDTO = {
      createdAt?: Date;
      name?: string;
      updatedAt?: Date;
      userId?: object;
      videos?: object[];
    };
    export type UserPreferenceDTO = {
      artists?: {
        id: object | string;
        weight?: number;
      }[];
      categories?: {
        id: object | string;
        weight?: number;
      }[];
      genres?: {
        id: object | string;
        weight?: number;
      }[];
      tags?: {
        id: object | string;
        weight?: number;
      }[];
      userId: object | string;
    };
    export type PatchUserPreferenceDTO = {
      artists?: {
        id: object | string;
        weight?: number;
      }[];
      categories?: {
        id: object | string;
        weight?: number;
      }[];
      genres?: {
        id: object | string;
        weight?: number;
      }[];
      tags?: {
        id: object | string;
        weight?: number;
      }[];
      userId?: object | string;
    };
    export type ViewsDTO = {
      datesViewed?: {
        date?: Date;
        isPreview?: boolean;
        viewsCount?: number;
      }[];
      entity?: 'Contents' | 'Artists' | 'Blogs';
      entityId: object | string;
      previewViews?: 0;
      totalViews?: 0;
      userId: object | string;
      videoViews?: 0;
    };
    export type PatchViewsDTO = {
      datesViewed?: {
        date?: Date;
        isPreview?: boolean;
        viewsCount?: number;
      }[];
      entity?: 'Contents' | 'Artists' | 'Blogs';
      entityId?: object | string;
      previewViews?: 0;
      totalViews?: 0;
      userId?: object | string;
      videoViews?: 0;
    };
  }
}
