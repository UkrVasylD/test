const { MODELS } = require('../constants');

module.exports = {
  [MODELS.USERS]: require('./user.model'),
  [MODELS.LIKES]: require('./likes.model'),
  [MODELS.VIEWS]: require('./views.model'),
  [MODELS.ARTISTS]: require('./artist.model'),
  [MODELS.CONTENTS]: require('./content.model'),
};
