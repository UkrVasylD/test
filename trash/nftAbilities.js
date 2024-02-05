/* eslint-disable no-shadow */
/* eslint-disable no-unreachable */
// @ts-nocheck
/*
  STORY

  Because Blockchain team asks for 1-2 weeks and even months to develop some small API endpoint
  I have been forced to write this piece of shit to unblock Social Mode (Airdrop, Super Powers) for Mobile Apps
  I am not proud of what I did.

  So this method logins on NFT API (which uses this current CEEK API for login but then creates their own JWT!!!!!!!) using security token then get the list of abilities using their JWT and
  transforms it into normal response data
*/

const { MongoClient } = require('../providers/mongo.native');

const { SimpleAdapter } = require('../adapters/simple');

const { MODELS } = require('../constants');

const {
  config: { BLOCKCHAIN_API },
} = require('../config');

module.exports = {
  async nftAbilities(req, res, next) {
    const { uId } = req;

    const allAbilities = {
      speed: false,
      run: false,
      teleport: false,
      flight: false,
      ultraVision: false,
      jump: false,
      push: false,
      guardians: false,
      gravity: false,
      swim: false,
      strength: false,
      VIPAccess: false,
      slide: false,
      victoryStance: false,
      harvest: false,
    };

    try {
      const ceekUser = await MongoClient.collection(MODELS.USERS).findOne(
        { _id: uId },
        { projection: { email: 1, securityToken: 1, superPowers: 1 } }
      );

      const localAbilities = {
        Speed: { speed: false },
        Run: { run: false },
        Teleport: { teleport: false },
        Flight: { flight: false },
        UltraVision: { ultraVision: false },
        Jump: { jump: false },
        Push: { push: false },
        Guardians: { guardians: false },
        Gravity: { gravity: false },
        Swim: { swim: false },
        Strength: { strength: false },
        VIPAccess: { VIPAccess: false },
        Slide: { slide: false },
        VictoryStance: { victoryStance: false },
        Harvest: { harvest: false },
      };

      for (const ability of ceekUser.superPowers) {
        if (localAbilities[ability.name]) {
          const [key] = Object.keys(localAbilities[ability.name]);

          allAbilities[key] = true;
        }
      }

      return res.status(200).json({
        abilities: allAbilities,
        message: 'nft data is temporarily unavailable',
        nft: {
          total: 0,
          data: [],
        },
      });

      const nftUser = await SimpleAdapter.post({
        path: `${BLOCKCHAIN_API.NFT_MARKETPLACE_API_URL}/api/v1/user/login`,
        body: {
          email: ceekUser.email,
          password: ceekUser.securityToken,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (nftUser.data.error) {
        return res.status(200).json({
          abilities: allAbilities,
          nft: {
            total: 0,
            data: [],
          },
        });
      }

      const abilities = await SimpleAdapter.post({
        path: `${BLOCKCHAIN_API.NFT_MARKETPLACE_API_URL}/api/v1/nft/user/get/all`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${nftUser.data.data.token}`,
        },
        body: {
          walletAddress: nftUser.data.data.user.walletAddress,
        },
      });

      const nfts = abilities.data.data.items.map((nft) => {
        const localAbilities = {
          Speed: { speed: false },
          Run: { run: false },
          Teleport: { teleport: false },
          Flight: { flight: false },
          UltraVision: { ultraVision: false },
          Jump: { jump: false },
          Push: { push: false },
          Guardians: { guardians: false },
          Gravity: { gravity: false },
          Swim: { swim: false },
          Strength: { strength: false },
          VIPAccess: { VIPAccess: false },
          Slide: { slide: false },
          VictoryStance: { victoryStance: false },
          Harvest: { harvest: false },
        };

        for (const attribute of nft.attributes) {
          if (localAbilities[attribute.name]) {
            const [key] = Object.keys(localAbilities[attribute.name]);

            allAbilities[key] = true;

            localAbilities[attribute.name][key] = true;
          }
        }

        return {
          title: nft.name,
          url: nft.imageUrl,
          abilities: Object.assign(...Object.values(localAbilities)),
        };
      });

      return res.status(200).json({
        abilities: allAbilities,
        nft: {
          total: nfts.length,
          data: nfts,
        },
      });
    } catch (e) {
      return next(e);
    }
  },
};
