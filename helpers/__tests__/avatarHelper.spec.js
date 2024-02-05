const { avatarHelper } = require('../avatarHelper');

describe('UNIT TEST AvatarHelper', () => {
  describe('METHOD: getHashOfString', () => {
    it('should generate a hash of a given string', () => {
      const str = 'test';
      const hash = avatarHelper.getHashOfString(str);

      expect(typeof hash).toBe('number');

      expect(hash).toBeGreaterThan(0);
    });
  });

  describe('METHOD: normalizeHash', () => {
    it('should normalize a hash to a range between min and max', () => {
      const hash = 1000;
      const normalizedValue = avatarHelper.normalizeHash(hash, 10, 50);

      expect(normalizedValue).toBeGreaterThanOrEqual(10);

      expect(normalizedValue).toBeLessThan(50);
    });
  });

  describe('METHOD: generateHSL', () => {
    it('should generate an HSL array based on a given name', () => {
      const name = 'testName';
      const hsl = avatarHelper.generateHSL(name);

      expect(Array.isArray(hsl)).toBe(true);

      expect(hsl).toHaveLength(3);

      expect(hsl[0]).toBeGreaterThanOrEqual(0);

      expect(hsl[0]).toBeLessThanOrEqual(360);
    });
  });

  describe('METHOD: HSLtoString', () => {
    it('should convert HSL array to its string representation', () => {
      const hslArray = [120, 50, 50];
      const hslString = avatarHelper.HSLtoString(hslArray);

      expect(hslString).toBe('hsl(120,50%,50%)');
    });
  });

  describe('METHOD: getHSL', () => {
    it('should generate and retrieve the HSL color string for a new UUID', () => {
      const hsl = avatarHelper.getHSL();

      expect(typeof hsl).toBe('string');

      expect(hsl.startsWith('hsl(')).toBe(true);
    });
  });
});
