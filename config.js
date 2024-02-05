class Config {
  constructor() {
    // MAIN CONFIGS

    this.DB_HOST = process.env.DB_HOST || 'localhost';

    this.DB_NAME = process.env.DB_NAME || 'test-task';

    this.DB_PORT = process.env.DB_PORT || 27017;

    this.mongo_debug = process.env.mongo_debug === 'true';

    this.DB_CONNECTING_STRING =
      process.env.DB_CONNECTING_STRING ||
      `mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}`;

    this.HOST = process.env.HOST || 'localhost:3003';

    this.WEB_HOST = process.env.WEB_HOST || 'localhost:3003';

    this.PORT = process.env.PORT || 3003;

    this.NODE_TIMEOUT = process.env.NODE_TIMEOUT || 10000;

    this.JWT_SECRET =
      process.env.JWT_SECRET ||
      '5b452ed94da97e68ef705f7dc3a4ca007eeb5b791530429fd2cb50f1dad27c7605b452ed94da97e68ef705f7dc3a4ca007eeb5b791530429fd2cb50f1dad27c760';

    this.SECRET_KEY = process.env.SECRET_KEY || '_SECRET_KEY_A3SF48RT';

    this.SECRET_KEY_V2 = process.env.SECRET_KEY_V2 || 'q3sgf4sdfgs77544dfg8sfg7)xVIv9+zDiv}J>=Z>l';
  }
}

module.exports = { config: new Config() };
