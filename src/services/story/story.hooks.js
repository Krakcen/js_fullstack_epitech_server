const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;
const validate = require('feathers-hooks-validate-joi');
const errors = require('feathers-errors');


const logger = require('../../logger');
const log = require('../../hooks/log');

const joiCreateRequest = require('../../schemas/requests/story/create');
const joiPatchRequest = require('../../schemas/requests/story/patch');
const joiUpdateRequest = require('../../schemas/requests/story/update');
const joiOptions = { convert: true, abortEarly: false };

// Before -
// ------------------------------------------------------
const beforeStory = async context => {

  return context;
}

const beforeFindStory = async context => {
  const {
    app,
    params
  } = context;

  //const userFound = await app.services.users.get(params.payload.userId);
  // app.channel('story').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
}

const beforeGetStory = async context => {
  const {
    app,
    params
  } = context;

  //const userFound = await app.services.users.get(params.payload.userId);
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
}

const beforeCreateStory = async context => {
  const {
    app,
    params
  } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
};

const beforeUpdateStory = async context => {
  const {
    app,
    params
  } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  const storyFound = await app.services.story.get(id);

  if (!storyFound.author.equals(userFound._id)) {
    throw new Error("not authorized");
    // throw errors.NotAcceptable('no author in story');
  }
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
}

const beforePatchStory = async context => {
  const {
    app,
    params
  } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  const storyFound = await app.services.story.get(id);

  if (!storyFound.author.equals(userFound._id)) {
    throw new Error("not authorized");
    // throw errors.NotAcceptable('no author in story');
  }
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
}

const beforeRemoveStory = async context => {
  const {
    app,
    params,
    id
  } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  const storyFound = await app.services.story.get(id);

  console.log("KEKEK");
  console.log(storyFound.author);
  console.log(userFound._id);


  // throw new Error("wip");

  if (!storyFound.author.equals(userFound._id)) {
    throw new Error("not authorized");
    // throw errors.NotAcceptable('no author in story');
  }

  return context;
}

// After -
// ------------------------------------------------------

const afterStory = async context => {

  return context;
}

const afterFindStory = async context => {
  const {
    app,
    params,
    result
  } = context;

  // const userFound = await app.services.users.get(params.payload.userId);
  // const channel = app.channel(`stories`)
  // channel.join(userFound)
  // channel.send({
  //   action: 'find',
  //   on: '*',
  //   by: params.payload.userId,
  //   result
  // });
  return context;
}

const afterGetStory = async context => {

  const {
    data,
    result,
    app,
    params
  } = context;

  // const channel = app.channel(`story`)
  // const authorFound = await app.services.users.get(result.author);
  // channel.join(authorFound);
  // channel.send({
  //   action: 'create',
  //   on: result._id,
  //   by: params.payload.userId,
  //   result
  // });
  return context;
}

const afterCreateStory = async context => {
  const {
    data,
    result,
    app,
    params
  } = context;

  // const channel = app.channel(`story`)
  // const authorFound = await app.services.users.get(result.author);
  // channel.join(authorFound);
  // channel.send({
  //   action: 'create',
  //   on: result._id,
  //   by: params.payload.userId,
  //   result
  // });
  return context;
};

const afterUpdateStory = async context => {
  const {
    result,
    app,
    params
  } = context;

  // const channel = app.channel(`story`)
  // const userFound = await app.services.users.get(params.payload.userId);
  // channel.join(userFound)
  // channel.send({
  //   action: 'update',
  //   on: result._id,
  //   by: params.payload.userId,
  //   result
  // });

  return context;
}

const afterPatchStory = async context => {

  // const channel = app.channel(`story`)
  // const userFound = await app.services.users.get(params.payload.userId);
  // channel.join(userFound)
  // channel.send({
  //   action: 'patch',
  //   on: result._id,
  //   by: params.payload.userId,
  //   result
  // });

  return context;
}

const afterRemoveStory = async context => {
  const {
    data,
    result,
    app,
  } = context;

  // const channel = app.channel(`story`)
  // const userFound = await app.services.users.get(params.payload.userId);

  // channel.join(userFound)
  // channel.send({
  //   action: 'remove',
  //   on: result._id,
  //   by: params.payload.userId,
  //   result
  // });

  // app.channel('story').leave(connection => {
  //   return connection.user._id === userFound._id
  // });

  return context;
}

// Hooks -
// ------------------------------------------------------

module.exports = {
  before: {
    all: [
      beforeStory
    ],
    find: [
      beforeFindStory
    ],
    get: [
      beforeGetStory
    ],
    create: [
      validate.form(joiCreateRequest, joiOptions),
      authenticate('jwt'),
      beforeCreateStory
    ],
    update: [
      validate.form(joiUpdateRequest, joiOptions),
      authenticate('jwt'),
      beforeUpdateStory
    ],
    patch: [
      validate.form(joiPatchRequest, joiOptions),
      authenticate('jwt'),
      beforePatchStory
    ],
    remove: [
      authenticate('jwt'),
      beforeRemoveStory
    ]
  },

  after: {
    all: [afterStory],
    find: [afterFindStory],
    get: [afterGetStory],
    create: [afterCreateStory],
    update: [afterUpdateStory],
    patch: [afterPatchStory],
    remove: [afterRemoveStory]
  },

  error: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
