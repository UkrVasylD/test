/* eslint-disable padding-line-between-statements */
const uuid = require('uuid');

const request = require('../../utils/request');
const { Fixture } = require('../../fixtures');

const CONSTANTS = require('../../../constants');

describe('Blog TV', () => {
  describe('GET -> tv/blog/', () => {
    it('GET -> tv/blog/ unauthorized user: empty query params', async () => {
      const blogParams = { status: true };

      const asyncPipe = [];

      // max count
      const countBlog = 5;

      for (let i = 0; i < countBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog(blogParams));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({ path: `/tv/blog`, disableToken: true });

      expect(response.status).toBe(200);

      expect(response.data.blogs.data).toHaveLength(countBlog);
      expect(response.data.blogs.total).toBeGreaterThanOrEqual(countBlog);

      expect(response.data.blogs.data).toEqual(
        expect.arrayContaining([expect.objectContaining(blogParams)])
      );

      const responseBannerIds = response.data.blogs.data.map((element) => element.urlId);

      const banner = await Fixture.blogProvider.getMany({
        urlId: { $in: responseBannerIds },
        ...blogParams,
      });

      expect(banner).toHaveLength(countBlog);
    });

    it('GET -> tv/blog/ unauthorized user: query params search find name', async () => {
      const searchName = `name${uuid.v4()}`;
      const blogParams = { status: true };

      const asyncPipe = [];

      // max count
      const countBlog = 5;

      for (let i = 0; i < countBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog(blogParams));
      }

      await Promise.all(asyncPipe);

      await Fixture.createTestBlog({ title: searchName, ...blogParams });

      const response = await request.get({
        path: `/tv/blog`,
        disableToken: true,
        params: { search: searchName },
      });

      expect(response.status).toBe(200);

      expect(response.data.blogs.data).toHaveLength(1);
      expect(response.data.blogs.total).toEqual(1);

      expect(response.data.blogs.data[0]).toHaveProperty('title');
      expect(response.data.blogs.data[0].title).toEqual(searchName);
    });

    it('GET -> tv/blog/ unauthorized user:  query param - featured true', async () => {
      const blogParams = { status: true, featured: true, featuredActive: true };

      const asyncPipe = [];

      // max count
      const countBlog = 5;

      for (let i = 0; i < countBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog({ ...blogParams, featuredPosition: i + 1 }));
      }

      await Promise.all(asyncPipe);

      const response = await request.get({
        path: `/tv/blog`,
        disableToken: true,
        params: { featured: true },
      });

      expect(response.status).toBe(200);

      expect(response.data.featured.data).toHaveLength(countBlog);

      expect(response.data.featured.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ status: blogParams.status, featured: blogParams.featured }),
        ])
      );

      const responseBannerIds = response.data.featured.data.map((element) => element.urlId);

      const banner = await Fixture.blogProvider.getMany({
        urlId: { $in: responseBannerIds },
        ...blogParams,
      });

      expect(banner).toHaveLength(countBlog);
    });

    it('GET -> tv/blog/ authorized user:  likedByUser = true, search', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();

      const testUser = await Fixture.createTestUser({
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

      const searchName = `name${uuid.v4()}`;

      const blogParams = {
        status: true,
      };

      const asyncPipe = [];

      // max count
      const countBlog = 5;

      for (let i = 0; i < countBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog(blogParams));
      }

      await Promise.all(asyncPipe);

      const blogForLiked = await Fixture.createTestBlog({ title: searchName, ...blogParams });

      await Fixture.createTestLike({
        userId: testUser._id,
        entityId: blogForLiked._id,
        entity: CONSTANTS.MODELS.BLOGS,
      });

      const response = await request.get({
        path: `/tv/blog`,
        token: responseUser.data.token,
        params: { search: searchName },
      });

      expect(response.status).toBe(200);

      expect(response.data.blogs.data).toHaveLength(1);
      expect(response.data.blogs.total).toEqual(1);

      expect(response.data.blogs.data[0]).toHaveProperty('title');
      expect(response.data.blogs.data[0].title).toEqual(searchName);
      expect(response.data.blogs.data[0].likedByUser).toEqual(true);
    });
  });

  describe('GET -> tv/blog/:id', () => {
    it('GET -> tv/blog/:id unauthorized user', async () => {
      const blogParams = { status: true };

      const asyncPipe = [];

      // max count
      const countBlog = 5;

      for (let i = 0; i < countBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() }));
      }

      await Promise.all(asyncPipe);

      const { urlId } = await Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() });

      const response = await request.get({ path: `/tv/blog/${urlId}`, disableToken: true });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('blog');

      expect(response.data.blog.urlId).toEqual(urlId);

      const banner = await Fixture.blogProvider.getSingle({
        _id: response.data.blog._id,
        ...blogParams,
      });

      expect(banner.urlId).toEqual(urlId);
    });

    it('GET -> tv/blog/:id unauthorized user: urlId no exist', async () => {
      const blogParams = { status: true };

      const asyncPipe = [];

      // max count
      const countBlog = 5;

      for (let i = 0; i < countBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() }));
      }

      await Promise.all(asyncPipe);

      const urlId = uuid.v4();

      const response = await request.get({ path: `/tv/blog/${urlId}`, disableToken: true });

      expect(response.status).toBe(200);

      expect(response.data.error).toEqual('Blog is not online or does not exist.');
    });

    it('GET -> tv/blog/:id unauthorized user: similar blog -> artists', async () => {
      const { _id: artistId } = await Fixture.createTestArtist();

      const blogParams = { status: true, artists: [artistId.toString()] };

      const asyncPipe = [];

      // max count 5
      const countSimilarBlog = 5;

      for (let i = 0; i < countSimilarBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() }));
      }

      await Promise.all(asyncPipe);

      const { urlId, _id: blogId } = await Fixture.createTestBlog({
        ...blogParams,
        urlId: uuid.v4(),
      });

      const response = await request.get({ path: `/tv/blog/${urlId}`, disableToken: true });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('similarBlogs');

      expect(response.data.similarBlogs).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...blogParams })])
      );

      expect(response.data.similarBlogs).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: blogId.toString() })])
      );

      const responseBannerIds = response.data.similarBlogs.map((element) =>
        Fixture.blogProvider.ObjectId(element._id)
      );

      const blogs = await Fixture.blogProvider.getMany({
        _id: { $in: responseBannerIds, $ne: blogId },
        ...blogParams,
      });

      expect(blogs).toHaveLength(countSimilarBlog);
    });

    it('GET -> tv/blog/:id unauthorized user: similar blog -> genres', async () => {
      const { _id: genreId } = await Fixture.createTestGenre();

      const blogParams = { status: true, genres: [genreId.toString()] };

      const asyncPipe = [];

      // max count 5
      const countSimilarBlog = 5;

      for (let i = 0; i < countSimilarBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() }));
      }

      await Promise.all(asyncPipe);

      const { urlId, _id: blogId } = await Fixture.createTestBlog({
        ...blogParams,
        urlId: uuid.v4(),
      });

      const response = await request.get({ path: `/tv/blog/${urlId}`, disableToken: true });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('similarBlogs');

      expect(response.data.similarBlogs).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...blogParams })])
      );

      expect(response.data.similarBlogs).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: blogId.toString() })])
      );

      const responseBannerIds = response.data.similarBlogs.map((element) =>
        Fixture.blogProvider.ObjectId(element._id)
      );

      const blogs = await Fixture.blogProvider.getMany({
        _id: { $in: responseBannerIds, $ne: blogId },
        ...blogParams,
      });

      expect(blogs).toHaveLength(countSimilarBlog);
    });

    it('GET -> tv/blog/:id unauthorized user: similar blog -> tags', async () => {
      const blogParams = { status: true, tags: [uuid.v4()] };

      const asyncPipe = [];

      // max count 5
      const countSimilarBlog = 5;

      for (let i = 0; i < countSimilarBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() }));
      }

      await Promise.all(asyncPipe);

      const { urlId, _id: blogId } = await Fixture.createTestBlog({
        ...blogParams,
        urlId: uuid.v4(),
      });

      const response = await request.get({ path: `/tv/blog/${urlId}`, disableToken: true });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('similarBlogs');

      expect(response.data.similarBlogs).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...blogParams })])
      );

      expect(response.data.similarBlogs).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: blogId.toString() })])
      );

      const responseBannerIds = response.data.similarBlogs.map((element) =>
        Fixture.blogProvider.ObjectId(element._id)
      );

      const blogs = await Fixture.blogProvider.getMany({
        _id: { $in: responseBannerIds, $ne: blogId },
        ...blogParams,
      });

      expect(blogs).toHaveLength(countSimilarBlog);
    });

    it('GET -> tv/blog/:id unauthorized user: featured true', async () => {
      const blogParams = { status: true, featured: true };

      const asyncPipe = [];

      // max count 5
      const countSimilarBlog = 5;

      for (let i = 0; i < countSimilarBlog; i++) {
        asyncPipe.push(Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() }));
      }

      await Promise.all(asyncPipe);

      const { urlId } = await Fixture.createTestBlog({
        ...blogParams,
        urlId: uuid.v4(),
      });

      const response = await request.get({ path: `/tv/blog/${urlId}`, disableToken: true });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('featured');

      expect(response.data.featured.data).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...blogParams })])
      );

      const responseBannerIds = response.data.featured.data.map((element) =>
        Fixture.blogProvider.ObjectId(element._id)
      );

      const blogs = await Fixture.blogProvider.getMany({
        _id: { $in: responseBannerIds },
        ...blogParams,
      });

      expect(blogs).toHaveLength(countSimilarBlog);
    });
  });

  describe('GET -> tv/blog/like/:id', () => {
    it('GET -> tv/blog/like/:id authorized user, like', async () => {
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

      const countLikedUser = 5;

      const blogParams = { status: true, likesCount: countLikedUser };

      const { _id: blogId } = await Fixture.createTestBlog({ ...blogParams, urlId: uuid.v4() });

      const response = await request.get({
        path: `/tv/blog/like/${blogId}`,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      const updateBlog = await Fixture.blogProvider.getSingleById(blogId, {
        likesCount: 1,
        _id: 0,
      });

      // likesCount + 1
      expect(updateBlog).toEqual(
        expect.objectContaining({
          likesCount: countLikedUser + 1,
        })
      );
    });

    it('GET -> tv/blog/like/:id authorized user, dislike', async () => {
      const email = `test${uuid.v1()}@gmail.com`;
      const password = 'testPassword';
      const userName = uuid.v4();

      const blogId = Fixture.blogProvider.ObjectId();

      const { _id: userId } = await Fixture.createTestUser({
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

      const countLikedUser = 5;

      const blogParams = {
        status: true,
        likesCount: countLikedUser,
      };

      await Fixture.createTestBlog({ _id: blogId, ...blogParams, urlId: uuid.v4() });

      await Fixture.createTestLike({
        userId,
        entityId: blogId,
        entity: CONSTANTS.MODELS.BLOGS,
      });

      const response = await request.get({
        path: `/tv/blog/like/${blogId}`,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response?.data?.likedByUser).toEqual(false);

      // TODO bug blog.likedCount do not update

      // const updateBlog = await Fixture.blogProvider.getSingleById(blogId, {
      //   likesCount: 1,
      //   _id: 0,
      // });

      // check liked, likesCount - 1
      // expect(updateBlog).toEqual(
      //   expect.objectContaining({
      //     likesCount: countLikedUser - 1,
      //   })
      // );

      const updateDislikeBlog = await Fixture.likesProvider.getSingle({
        userId,
        entityId: blogId,
        entity: CONSTANTS.MODELS.BLOGS,
      });

      expect(updateDislikeBlog).toBeNull();
    });

    it('GET -> tv/blog/like/:id authorized user, bad blogID', async () => {
      const blogId = 'badId';

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

      const response = await request.get({
        path: `/tv/blog/like/${blogId}`,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('id does not match requirements');
    });

    it('GET -> tv/blog/like/:id authorized user, valid blogId but no exist', async () => {
      const blogId = Fixture.blogProvider.ObjectId();

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

      const response = await request.get({
        path: `/tv/blog/like/${blogId}`,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('Blog is not online or does not exist.');
    });

    it('GET -> tv/blog/like/:id authorized user, offline blog', async () => {
      const blogParams = { status: false }; // offline blog

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

      const { _id: blogId } = await Fixture.createTestBlog({
        ...blogParams,
        urlId: uuid.v4(),
      });

      const response = await request.get({
        path: `/tv/blog/like/${blogId}`,
        token: responseUser.data.token,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('Blog is not online or does not exist.');
    });

    it('GET -> tv/blog/like/:id unauthorized user, check permission', async () => {
      const blogParams = { status: true };

      const { _id: blogId } = await Fixture.createTestBlog({
        ...blogParams,
        urlId: uuid.v4(),
      });

      const response = await request.get({
        path: `/tv/blog/like/${blogId}`,
        disableToken: true,
      });

      expect(response.status).toBe(200);
      expect(response.data.error).toEqual('You are not authorized');
    });
  });
});
