jest.mock('../../adapters/amazon/s3');

jest.mock('../../adapters/azure');

const {
  config: {
    AWS: { BUCKETS },
    CDN,
  },
} = require('../../config');

const { contentParser } = require('../contentParser');

const { amazonS3Adapter } = require('../../adapters/amazon/s3');

const { azureStorageAdapter } = require('../../adapters/azure');

describe('UNIT TEST ContentParser', () => {
  describe('METHOD: computeUrl', () => {
    afterEach(() => {
      amazonS3Adapter.getObjectUrlFromAmazon.mockReset();
    });

    it('should return an URL when fileName is provided', async () => {
      // Arrange
      const stubbedUrl = 'https://some-fake-url.com';

      amazonS3Adapter.getObjectUrlFromAmazon.mockResolvedValue(stubbedUrl);

      // Act
      const result = await contentParser.computeUrl({
        fileName: 'test-file',
        bucket: 'test-bucket',
        lifeTime: 'test-lifeTime',
      });

      // Assert
      expect(amazonS3Adapter.getObjectUrlFromAmazon).toHaveBeenCalledTimes(1);

      expect(amazonS3Adapter.getObjectUrlFromAmazon).toHaveBeenCalledWith({
        name: 'test-file',
        bucket: 'test-bucket',
        lifeTime: 'test-lifeTime',
      });

      expect(result).toBe(stubbedUrl);
    });

    it('should return an empty string when fileName is not provided', async () => {
      // Act
      const result = await contentParser.computeUrl({
        bucket: 'test-bucket',
        lifeTime: 'test-lifeTime',
      });

      // Assert
      expect(amazonS3Adapter.getObjectUrlFromAmazon).not.toHaveBeenCalled();

      expect(result).toBe('');
    });
  });

  describe('METHOD: _mapContentLocators', () => {
    afterEach(() => {
      azureStorageAdapter.getLocatorUrl.mockReset();
    });

    it('should map locators and delete original fields', () => {
      // Arrange
      const stubbedUrl = 'https://some-fake-url.com';

      azureStorageAdapter.getLocatorUrl.mockReturnValue(stubbedUrl);

      const content = {
        videoLocator: { id: '1' },
        aesLocator: { id: '2' },
        fairplayLocator: { id: '3' },
        trailerLocator: { id: '4' },
        previewLocator: { id: '5' },
        preview: 'preview',
      };

      // Act
      contentParser._mapContentLocators(content);

      // Assert
      expect(azureStorageAdapter.getLocatorUrl).toHaveBeenCalledTimes(5);

      expect(content).toEqual({
        videoLocatorUrl: stubbedUrl,
        aesLocatorUrl: stubbedUrl,
        fairplayLocatorUrl: stubbedUrl,
        trailerLocatorUrl: stubbedUrl,
        previewLocatorUrl: stubbedUrl,
      });
    });

    it('should not call getLocatorUrl when id is missing', () => {
      // Arrange
      const content = {
        videoLocator: {},
        aesLocator: {},
        fairplayLocator: {},
        trailerLocator: {},
        previewLocator: {},
        preview: 'preview',
      };

      // Act
      contentParser._mapContentLocators(content);

      // Assert
      expect(azureStorageAdapter.getLocatorUrl).not.toHaveBeenCalled();

      expect(content).toEqual({
        videoLocator: {},
        aesLocator: {},
        fairplayLocator: {},
        trailerLocator: {},
        previewLocator: {},
        preview: 'preview',
      });
    });
  });

  describe('METHOD: _getUrl', () => {
    beforeEach(() => {
      // Arrange
      jest.resetAllMocks();

      CDN.IMAGES = 'https://cdn.example.com';
    });

    it('should return cdnUrl when bucket equals BUCKETS.IMAGES', async () => {
      // Arrange
      const name = 'test-file';
      const bucket = BUCKETS.IMAGES;
      const cdnUrl = CDN.IMAGES;
      const expectedUrl = `${cdnUrl.replace(/\/$/, '')}/${name}`;

      // Act
      const result = await contentParser._getUrl(bucket, name);

      // Assert
      expect(result).toBe(expectedUrl);
    });

    it('should return S3 url when bucket equals BUCKETS.VIDEOS', async () => {
      // Arrange
      const bucket = BUCKETS.VIDEOS;
      const name = 'test-file';
      const expectedUrl = `https://${bucket}.s3.amazonaws.com/${name}`;

      // Act
      const result = await contentParser._getUrl(bucket, name);

      // Assert
      expect(result).toBe(expectedUrl);
    });

    it('should call computeUrl for other buckets', async () => {
      // Arrange
      const bucket = 'some-other-bucket';
      const name = 'test-file';
      const expectedUrl = 'https://computed-url.com';

      contentParser.computeUrl = jest.fn().mockResolvedValue(expectedUrl);

      // Act
      const result = await contentParser._getUrl(bucket, name);

      // Assert
      expect(contentParser.computeUrl).toHaveBeenCalledWith({ fileName: name, bucket });

      expect(result).toBe(expectedUrl);
    });
  });

  describe('METHOD: _programParser', () => {
    const CONSTANTS = {
      ALLOWED_PREVIEWS: [
        'verticalCover',
        'horizontalCover',
        'squareCover',
        'previewTransparent',
        'previewFirst',
        'previewSecond',
        'previewThird',
        'posterTV',
        'icon',
        'sliderTV',
      ],
    };

    let getPreviewVideoUrlSpy, setUrlsToContentFieldsSpy, getLocatorUrlSpy;

    beforeEach(() => {
      // Arrange
      jest.clearAllMocks();

      getPreviewVideoUrlSpy = jest.spyOn(contentParser, '_getPreviewVideoUrl');

      setUrlsToContentFieldsSpy = jest.spyOn(contentParser, '_setUrlsToContentFields');

      getLocatorUrlSpy = jest.spyOn(azureStorageAdapter, 'getLocatorUrl');

      getPreviewVideoUrlSpy.mockReturnValue('https://preview-video-url.com');

      getLocatorUrlSpy.mockReturnValue('https://locator-url.com');
    });

    afterEach(() => {
      getPreviewVideoUrlSpy.mockRestore();

      setUrlsToContentFieldsSpy.mockRestore();

      getLocatorUrlSpy.mockRestore();
    });

    it('should call _setUrlsToContentFields with correct arguments', async () => {
      // Arrange
      const program = {};

      const keysArray = ['preview', 'attachments', 'actor', 'banner'].concat(
        CONSTANTS.ALLOWED_PREVIEWS
      );

      contentParser._setUrlsToContentFields = jest.fn();

      // Act
      await contentParser._programParser(program);

      // Assert
      expect(contentParser._setUrlsToContentFields).toHaveBeenCalledWith(program, keysArray);
    });

    it('should set previewVideoUrl and delete previewVideo', async () => {
      // Arrange
      const program = {
        previewVideo: 'test-video',
      };

      contentParser._getPreviewVideoUrl = jest
        .fn()
        .mockReturnValue('https://preview-video-url.com');

      // Act
      await contentParser._programParser(program);

      // Assert
      expect(program.previewVideoUrl).toBe('https://preview-video-url.com');

      expect(program.previewVideo).toBeUndefined();
    });

    it('should set ceekers correctly', async () => {
      // Arrange
      const program = {
        createdByTvUser: true,
        streamingStatus: 1,
        startAt: Date.now() + 10000,
      };

      // Act
      await contentParser._programParser(program);

      // Assert
      expect(program.ceekers).toBe(true);
    });

    it('should set previewStreamingUrl from the first item of data array', async () => {
      // Arrange
      const program = {
        locators: JSON.stringify([{ preview: 'preview-locator' }]),
      };

      jest.spyOn(azureStorageAdapter, 'getLocatorUrl').mockReturnValue('https://locator-url.com');

      // Act
      await contentParser._programParser(program);

      // Assert
      expect(program.previewStreamingUrl).toBe('https://locator-url.com');
    });
  });

  describe('METHOD: _getPreviewVideoUrl', () => {
    let getLocatorUrlSpy;

    beforeEach(() => {
      // Arrange
      jest.clearAllMocks();

      getLocatorUrlSpy = jest.spyOn(azureStorageAdapter, 'getLocatorUrl');

      getLocatorUrlSpy.mockImplementation((locator) => {
        if (!locator || locator === '') {
          return '';
        }

        return 'https://preview-video-url.com';
      });
    });

    afterEach(() => {
      getLocatorUrlSpy.mockRestore();
    });

    it('should return empty string when previewVideoJsonStr is empty', () => {
      // Arrange
      const previewVideoJsonStr = '';

      // Act
      const result = contentParser._getPreviewVideoUrl(previewVideoJsonStr);

      // Assert
      expect(result).toBe('');
    });

    it('should return locator URL when previewVideoJsonStr is not empty', () => {
      // Arrange
      const previewVideoJsonStr = JSON.stringify({ locator: 'test-locator' });

      // Act
      const result = contentParser._getPreviewVideoUrl(previewVideoJsonStr);

      // Assert
      expect(result).toBe('https://preview-video-url.com');
    });
  });
});
