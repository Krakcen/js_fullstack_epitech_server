const logger = require('../src/logger');
const NAME_COLLECTION = 'users';
const NAME_INDEX = 'email';

module.exports = {
  async up (db) {
    await db.collection(NAME_COLLECTION).createIndex(NAME_INDEX, { type: String, unique: true })
      .then(() => {
        logger.info(`Index ${NAME_INDEX} created to collection ${NAME_COLLECTION}`);
      })
      .catch((err) => {
        console.log(err);
        logger.error(err);
      });
  },

  async down (db) {
    await db.collection('users').dropIndex(NAME_INDEX)
      .then(() => {
        logger.info(`Index ${NAME_INDEX} deleted to collection ${NAME_COLLECTION}`);
      })
      .catch((err) => {
        console.log(err);
        logger.error(err);
      });
  },
};