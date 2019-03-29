const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;
const validate = require('feathers-hooks-validate-joi');


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

  return context;
}

const beforeGetStory = async context => {

  return context;
}

const beforeCreateStory = async context => {
  // Rien.
  return context;
};

const beforeUpdateStory = async context => {
  return context;
}

const beforePatchStory = async context => {
  return context;
}

const beforeRemoveStory = async context => {
  return context;
}

// After -
// ------------------------------------------------------

const afterStory = async context => {

  return context;
}

const afterFindStory = async context => {

  return context;
}

const afterGetStory = async context => {

  return context;
}

const afterCreateStory = async context => {
  const {
    data,
    result,
    app,
    params
  } = context;

  const channel = app.channel(`story/${result._id}/`)
  const authorFound = await app.services.users.get(result.author);
  channel.join(authorFound);
  channel.send({
    action: 'create',
    by: params.payload.userId,
    result
  });
  return context;
};

const afterUpdateStory = async context => {
  const {
    data,
    result,
    app,
    params
  } = context;

  const channel = app.channel(`story/${result._id}/`)
  const userFound = await app.services.users.get(params.payload.userId);
  channel.join(userFound)
  channel.send({
    action: 'update',
    by: params.payload.userId,
    result
  });

  return context;
}

const afterPatchStory = async context => {

  const channel = app.channel(`story/${result._id}/`)
  const userFound = await app.services.users.get(params.payload.userId);
  channel.join(userFound)
  channel.send({
    action: 'patch',
    by: params.payload.userId,
    result
  });

  return context;
}

const afterRemoveStory = async context => {
  const {
    data,
    result
  } = context;

  const channel = app.channel(`story/${result._id}/`)


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
