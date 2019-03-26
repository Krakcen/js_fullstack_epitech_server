const logger = require('../src/logger');
const NAME_COLLECTION = 'stories';
const NAME_INDEX = 'synopsis';

module.exports = {
  async up (db) {
    await db.collection(NAME_COLLECTION).createIndex(NAME_INDEX, { type: String })
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