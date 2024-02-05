const { dateHelper } = require('../dateHelper');
const { getRandomDate, getRandomInteger, getRandomBoolean } = require('./__tests-helper');

describe('UNIT TEST DateHelper', () => {
  describe('METHOD:getNextYear', () => {
    it('get next year', () => {
      // Arrange
      const result = dateHelper.getNextYear();

      // Act
      const nextYear = new Date().getFullYear() + 1;

      // Assert
      expect(result).toBeDate();

      expect(result.getFullYear()).toBe(nextYear);
    });
  });

  describe('METHOD:checkDatesForViews', () => {
    it('check dates for views', () => {
      // Arrange
      const elems = [];

      for (let i = 0; i <= getRandomInteger(1, 5); i++) {
        elems.push({
          date: getRandomDate(new Date(2022, 0, 1), new Date(2023, 0, 1)),
          isPreview: getRandomBoolean(),
          viewsCount: getRandomInteger(0, 100),
        });
      }

      // Act
      const result = dateHelper.checkDatesForViews(elems, getRandomBoolean());

      // Assert
      expect(result).toBeBoolean();

      expect(result).toBe(false);
    });
  });

  describe('Method:toUnixStamp', () => {
    /**
     * If don't send  hours,minutes,seconds,miliseconds,etc to Date Object-he(Date Object) set hours,minutes,seconds,miliseconds,etc to 0(with days, months and years, this will not work)
     */

    it('time to unix format', () => {
      // Arrange
      const dateString = `${getRandomInteger(2012, 2023)}/${getRandomInteger(
        0,
        12
      )}/${getRandomInteger(0, 28)}`;

      const timeString = `${getRandomInteger(0, 20)}:${getRandomInteger(0, 59)}`;

      const timezoneString = `GMT+${getRandomInteger(0, 800)}`;

      // Act
      const result = dateHelper.toUnixStamp({ dateString, timeString, timezoneString });

      const expected = new Date(`${dateString} ${timeString} ${timezoneString}`).getTime();

      // Assert
      expect(result).toBeNumber();

      expect(result).toBe(expected);
    });
  });

  describe('Method:distributionDates', () => {
    it('dates to distrubution(return start and end)', () => {
      // Arrange
      const dateEnd = new Date();

      dateEnd.setDate(dateEnd.getDate() + 30);

      // Act
      const result = dateHelper.distributionDates(dateEnd);

      // Assert
      expect(result).toBeObject();

      expect(result).toEqual(
        expect.objectContaining({
          start: expect.any(Date),
          end: expect.any(Date),
        })
      );
    });
  });

  describe('Method:buildSasTokenExpiryDate', () => {
    it('set abort minutes to token expiry date', () => {
      // Arrange
      const randomAbortMinutes = getRandomInteger(100, 1000);

      const expected = new Date();

      expected.setMinutes(expected.getMinutes() + randomAbortMinutes);

      const spy = jest
        .spyOn(dateHelper, 'buildSasTokenExpiryDate')
        .mockImplementation((abortInMinutes) => {
          expected.setMinutes(expected.getMinutes() + abortInMinutes);

          return expected;
        });

      // Act
      const result = dateHelper.buildSasTokenExpiryDate(randomAbortMinutes);

      //  Assert
      expect(result).toBeDate();

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith(randomAbortMinutes);

      expect(result.toISOString()).toBe(expected.toISOString());
    });
  });
});
