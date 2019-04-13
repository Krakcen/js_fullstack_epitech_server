const { authenticate } = require('@feathersjs/authentication').hooks;
const validate = require('feathers-hooks-validate-joi');

const logger = require('../../logger');
const log = require('../../hooks/log');

const joiCreateRequest = require('../../schemas/requests/block/create');
const joiPatchRequest = require('../../schemas/requests/block/patch');
const joiUpdateRequest = require('../../schemas/requests/block/update');
const joiOptions = { convert: true, abortEarly: false };

// Before -
// ------------------------------------------------------
const beforeBlock = async context => {

  return context;
}

const beforeFindBlock = async context => {

  return context;
}

const beforeGetBlock = async context => {

  return context;
}

const beforeCreateBlock = async context => {
  // Rien.
  return context;
};

const beforeUpdateBlock = async context => {
  const {
    app,
    params,
    id
  } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  const blockFound = await app.services.block.get(id);
  if (!blockFound.author.equals(userFound._id)) {
    throw new Error("not authorized");
    // throw errors.NotAcceptable('no author in block');
  }

  return context;
}

const beforePatchBlock = async context => {
  const {
    app,
    params,
    id
  } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  const blockFound = await app.services.block.get(id);
  if (!blockFound.author.equals(userFound._id)) {
    throw new Error("not authorized");
    // throw errors.NotAcceptable('no author in block');
  }

  return context;
}

const beforeRemoveBlock = async context => {
  const {
    app,
    params,
    id
  } = context;

  const userFound = await app.services.users.get(params.payload.userId);
  const blockFound = await app.services.block.get(id);
  if (!blockFound.author.equals(userFound._id)) {
    throw new Error("not authorized");
    // throw errors.NotAcceptable('no author in block');
  }
  
  return context;
}

// After -
// ------------------------------------------------------

const afterBlock = async context => {

  return context;
}

const afterFindBlock = async context => {

  return context;
}

const afterGetBlock = async context => {

  return context;
}

const afterCreateBlock = async context => {
  const {
    data,
    result,
    app,
    params
  } = context;

  const idBlock = result;
  const idStory = data.idStory;
  
  console.log(idBlock)
  console.log('idBlock :' + idBlock)
  console.log('idStory :' + idStory)
  
  const foundStory = await app.services.story.get(idStory);
  if (!foundStory){
    throw new Error("story not found");
  }

  return context;
};

const afterUpdateBlock = async context => {
  const {
    data,
    result,
    app,
    params
  } = context;

  return context;
}

const afterPatchBlock = async context => {
  return context;
}

const afterRemoveBlock = async context => {
  const {
    data,
    result
  } = context;


  return context;
}

// Hooks -
// ------------------------------------------------------


module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      beforeBlock
    ],
    find: [
      beforeFindBlock
    ],
    get: [
      beforeGetBlock
    ],
    create: [
      validate.form(joiCreateRequest, joiOptions),
      beforeCreateBlock
    ],
    update: [
      validate.form(joiUpdateRequest, joiOptions),
      beforeUpdateBlock
    ],
    patch: [
      validate.form(joiPatchRequest, joiOptions),
      beforePatchBlock
    ],
    remove: [
      beforeRemoveBlock
    ]
  },

  after: {
    all: [afterBlock],
    find: [afterFindBlock],
    get: [afterGetBlock],
    create: [afterCreateBlock],
    update: [afterUpdateBlock],
    patch: [afterPatchBlock],
    remove: [afterRemoveBlock]
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
