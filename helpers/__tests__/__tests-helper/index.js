function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

module.exports = {
  getRandomDate,
  getRandomInteger,
  getRandomBoolean,
};
