const errors = require('@feathersjs/errors');
const logger = require('../../logger.js');

class Service {
  constructor(options) {
    this.options = options || {};
    this.models = options.Models || {};
  }

  async find(params) {
    logger.info('Get by params of story');
    const { query } = params;

    const storyFound = await this.models.stories.find(query);
    if (!storyFound) {
      throw errors.NotFound('story no found');
    }
    return storyFound;
  }

  async get(id) {
    logger.info(`Get by ${id} of story`);

    const storyFound = await this.models.stories.findById(id);
    if (!storyFound) {
      throw errors.NotFound('story no found');
    }
    return storyFound;
  }

  async create(data) {
    logger.info('create a new Story');

    const {
      author, title, synopsis, nombreOfBlockDefault,
    } = data;

    const authorFound = await this.models.users.findById(author);
    if (!authorFound) {
      throw errors.NotFound('author no found');
    }

    logger.info(
      `authorFound ${': '.red}${authorFound.username}${'\n -'.blue} id : ${authorFound._id}`,
    );

    const newStory = new this.models.stories({
      author: authorFound._id,
      title,
      synopsis,
      nombreOfBlockDefault,
      nombreOfBlock: 0,
      blocks: [],
    });

    if (!newStory) {
      throw errors.NotImplemented('the created story is failed');
    }

    const saveStory = await newStory
      .save()
      .then(newData => newData)
      .catch(() => undefined);

    if (!saveStory) {
      throw errors.NotImplemented('the created story is failed');
    }

    return {
      id: saveStory._id,
      title: saveStory.title,
    };
  }

  async update(id, data, params) {
    /* tout modifier */
    logger.info('Update story : ');

    const storyFound = await this.models.stories.findById(id);
    if (!storyFound) {
      throw errors.NotFound('story no found');
    }

    if (storyFound.author !== params.user._id) {
      throw errors.NotAuthenticated('is no auth to update the story');
    }
    return data;
  }

  async patch(id, data) {
    /*  */
    try {
      logger.info('Patch story : ');
      return data;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async remove(id) {
    try {
      logger.info('Remove story : ');
      return { id };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
