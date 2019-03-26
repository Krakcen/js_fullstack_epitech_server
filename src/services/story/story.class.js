const errors = require('@feathersjs/errors');
const logger = require('../../logger.js');

class Service {
  constructor(options) {
    this.options = options || {};
    this.models = options.Models || {};
  }

  async find (params) {
    try {
      logger.info('Get by params of story');
      const {
        query
      } = params;

      const storyFound = await this.models.stories.find(query);
      if (!storyFound) {
        throw errors.NotFound('story no found');
      }
      return storyFound;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async get (id) {
    try {
      logger.info(`Get by ${id} of story`);

      const storyFound = await this.models.stories.findById(id);
      if (!storyFound) {
        throw errors.NotFound('story no found');
      }
      return storyFound;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async create (data) {
    try {
      logger.info('create a new Story');

      const {
        author,
        title,
        synopsis,
        nombreOfBlockDefault
      } = data;

      const authorFound = await this.models.users.findById(author);
      if (!authorFound) {
        throw errors.NotFound('author no found');
      }

      logger.info('authorFound ' + ': '.red + authorFound.username +
        '\n -'.blue + ` id : ${authorFound._id}`);

      const newStory = new this.models.stories({
        author: authorFound._id,
        title,
        synopsis,
        nombreOfBlockDefault,
        nombreOfBlock: 0,
        blocks: []
      });

      if (!newStory) {
        throw errors.NotImplemented('the created story is failed');
      }

      const saveStory = await newStory.save()
        .then(data => data)
        .catch((err) => {
          console.log(err);
          return undefined;
        });

      if (!saveStory) {
        throw errors.NotImplemented('the created story is failed');
      }

      return {
        id: saveStory._id,
        title: saveStory.title
      };
    }
    catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async update (id, data, params) {
    logger.info('Update story : ');
    return data;
  }

  async patch (id, data, params) {
    logger.info('Patch story : ');
    return data;
  }

  async remove (id, params) {
    logger.info('Remove story : ');
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
