/* eslint-disable no-unreachable */

const { HttpException } = require('../helpers/errors');

const { contentProvider } = require('../providers/content.provider');

const { userProvider } = require('../providers/user.provider');
const { viewsProvider } = require('../providers/views.provider');

class ContentService {
  async createContent({ title, description, userId }) {
    const user = await userProvider.getSingleById(userId, {
      userName: 1,
      email: 1,
    });

    const creator = {
      id: userId,
      userName: user.userName,
      email: user.email,
    };

    const contentData = {
      title,
      description,
      editor: creator,
      creator,
    };

    const content = await contentProvider.createSingle(contentData);

    return content;
  }

  async updateContent({ id, title, description, userId }) {
    const user = await userProvider.getSingleById(userId, {
      userName: 1,
      email: 1,
    });

    const editor = {
      id: userId,
      userName: user.userName,
      email: user.email,
    };

    const updateObj = {
      editor,
    };

    if (title) {
      updateObj.title = title;
    }

    if (description) {
      updateObj.description = description;
    }

    const content = await contentProvider.updateSingleById(id, updateObj);

    return content;
  }

  async deleteContent({ id, userId }) {
    const user = await userProvider.getSingleById(userId, { role: 1 });

    if (user.role === 1) {
      throw HttpException.BAD_REQUEST(`You don't have enough permission `);
    }

    await contentProvider.deleteSingleById(id);

    return 'successful';
  }

  async getContentById({ id }) {
    const test = await contentProvider.getSingleById(id, {
      title: 1,
      description: 1,
    });

    if (!test) {
      throw HttpException.NOT_FOUND(`Event not found.`);
    }

    return test;
  }

  async passContent({ userId, score = 0, contentId }) {
    Promise.all([
      await viewsProvider.createSingle({
        userId,
        entityId: contentId,
        score,
      }),

      await contentProvider.setPassTest({ contentId, userId }),

      await userProvider.setPassUser({ userId, contentId }),
    ]);

    return 'successful';
  }

  async getContentList({ limit, skip, userId, sort }) {
    const content = await contentProvider.getAllContent({
      limit,
      skip,
      userId,
      sort,
    });

    return content;
  }

  async getAllPassedTestOfUser({ idUser, skip, limit }) {
    const user = await userProvider.getSingleById(idUser, { completed: 1 });

    const { total, data } = await contentProvider.getAllPassedTestOfUser({
      completed: user.completed,
      skip,
      limit,
    });

    if (!data || !data.length) {
      throw HttpException.NOT_FOUND(`No test found!`);
    }

    return { total, data };
  }

  async assignContentToUser({ idUser, contentId }) {
    const status = await userProvider.assignTest({ idUser, contentId });

    return status;
  }
}

module.exports = { contentService: new ContentService() };
