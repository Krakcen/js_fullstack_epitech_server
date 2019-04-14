const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  // const {
  //   user, pass, hostname, port, name,
  // } = app.get('db');

  // ONLY DEV & PROD FOR NOW
  let mongoUrl;
  if (process.env.NODE_ENV === 'production') {
    mongoUrl = `mongodb://${process.env.USR_MONGO}:${
      process.env.PSW_MONGO
    }@mongo:27017/storyfactory?authSource=admin`;
  } else {
    mongoUrl = 'mongodb://localhost:27017/storyfactory';
  }

  const connectWithRetry = () => {
    mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, (err) => {
      if (err) {
        logger.error(
          'Failed to connect to mongo on startup - retrying in 5 sec, '.red.bold,
          `${err}`.red.bold,
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        logger.info('Mongoose Adapter connected to the Database !'.green);
      }
    });
  };
  connectWithRetry();
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
