const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin, skipRemainingHooks, isProvider } = require('feathers-hooks-common');
const validate = require('feathers-hooks-validate-joi');

const log = require('../../hooks/log');

const joiCreateRequest = require('../../schemas/requests/story/create');
const joiPatchRequest = require('../../schemas/requests/story/patch');
const joiUpdateRequest = require('../../schemas/requests/story/update');

const joiOptions = { convert: true, abortEarly: false };

// Before -
// ------------------------------------------------------
const beforeStory = async context => context;

const beforeFindStory = async context => context;

const beforeGetStory = async context => context;

const beforeCreateStory = async (context) => {
  const { app, params } = context;

  await app.services.users.get(params.payload.userId);
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
};

const beforeUpdateStory = async (context) => {
  const { app, params } = context;

  await app.services.users.get(params.payload.userId);
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
};

const beforePatchStory = async (context) => {
  const { app, params } = context;

  await app.services.users.get(params.payload.userId);
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
};

const beforeRemoveStory = async (context) => {
  const { app, params, id } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  const storyFound = await app.services.story.get(id);

  if (!storyFound.author.equals(userFound._id)) {
    throw new Error('not authorized');
    // throw errors.NotAcceptable('no author in story');
  }

  // console.log("YELP");
  // console.log(storyFound);

  // throw new Error('wip');

  // remove blocks associated
  await app.service('block').Model.deleteMany({ _id: { $in: storyFound.blocks } });

  return context;
};

// After -
// ------------------------------------------------------

const afterStory = async context => context;

const afterFindStory = async context => context;

const afterGetStory = async context => context;

const afterCreateStory = async context => context;

const afterUpdateStory = async context => context;

const afterPatchStory = async context => context;
const afterRemoveStory = async context => context;

// Hooks -
// ------------------------------------------------------

const postResolvers = {
  joins: {
    blocks: {
      resolver: (/* $select, $limit, $sort */) => async (story, context) => {
        const blockPopulate = await context.app
          .service('block')
          .Model.find({ _id: { $in: story.blocks } });
        story.blocks = blockPopulate;
        return story.blocks;
      },
    },
    author: {
      resolver: (/* $select, $limit, $sort */) => async (story, context) => {
        const authorPopulate = await context.app
          .service('users')
          .find({ query: { _id: story.author } });
        if (authorPopulate && authorPopulate.data.length === 1) {
          delete authorPopulate.data[0].password;
          story.author = authorPopulate.data[0];
        }
        return story.author;
      },
    },
  },
};

module.exports = {
  before: {
    all: [skipRemainingHooks(isProvider('server')), beforeStory],
    find: [beforeFindStory],
    get: [beforeGetStory],
    create: [validate.form(joiCreateRequest, joiOptions), authenticate('jwt'), beforeCreateStory],
    update: [validate.form(joiUpdateRequest, joiOptions), authenticate('jwt'), beforeUpdateStory],
    patch: [validate.form(joiPatchRequest, joiOptions), authenticate('jwt'), beforePatchStory],
    remove: [authenticate('jwt'), beforeRemoveStory],
  },

  after: {
    all: [afterStory],
    find: [afterFindStory, fastJoin(postResolvers)],
    get: [afterGetStory],
    create: [afterCreateStory],
    update: [afterUpdateStory],
    patch: [afterPatchStory],
    remove: [afterRemoveStory],
  },

  error: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
