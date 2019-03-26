const logger = require('../src/logger');
const NAME_COLLECTION = 'stories';

module.exports = {
  async up (db) {
    await db.createCollection(NAME_COLLECTION)
      .then(() => {
        logger.info(`Collection ${NAME_COLLECTION} created!`);
      })
      .catch((err) => {
        console.log(err);
        logger.error(err);
      });
  },

  async down (db) {
    await db.collection(NAME_COLLECTION).drop()
      .then(() => {
        logger.info(`Collection ${NAME_COLLECTION} deleted`);
      })
      .catch((err) => {
        console.log(err);
        logger.error(err);
      });
  },
};
