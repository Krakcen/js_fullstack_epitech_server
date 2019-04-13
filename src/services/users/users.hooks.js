const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;
const validate = require('feathers-hooks-validate-joi');


const logger = require('../../logger');
const log = require('../../hooks/log');

const joiCreateRequest = require('../../schemas/requests/users/create');
const joiPatchRequest = require('../../schemas/requests/users/patch');
const joiUpdateRequest = require('../../schemas/requests/users/update');
const joiOptions = { convert: true, abortEarly: false };

// Before -
// ------------------------------------------------------
const beforeUsers = async context => {

  return context;
}

const beforeGetUsers = async context => {
  
  return context;
}

const beforeCreateUsers = async context => {

  return context;
};

const beforeUpdateUsers = async context => {
  
  return context;
}

const beforePatchUsers = async context => {
  
  return context;
}

const beforeRemoveUsers = async context => {
  
  return context;
}

// After -
// ------------------------------------------------------

const afterUsers = async context => {

  return context;
}

const afterGetUsers = async context => {
  
  return context;
}

const afterCreateUsers = async context => {

  return context;
};

const afterUpdateUsers = async context => {

  return context;
}

const afterPatchUsers = async context => {

  return context;
}

const afterRemoveUsers = async context => {

  return context;
}

// Hooks -
// ------------------------------------------------------

module.exports = {
  before: {
    all: [beforeUsers],
    get: [
      authenticate('jwt'),
      beforeGetUsers],
    create: [
      validate.form(joiCreateRequest, joiOptions),
      hashPassword(),
      beforeCreateUsers
    ],
    update: [
      validate.form(joiUpdateRequest, joiOptions),
      hashPassword(),
      authenticate('jwt'),
      beforeUpdateUsers],
    patch: [
      validate.form(joiPatchRequest, joiOptions),
      hashPassword(),
      authenticate('jwt'),
      beforePatchUsers],
    remove: [
      authenticate('jwt'),
      beforeRemoveUsers]
  },
  after: {
    all: [protect('password'), afterUsers],
    get: [afterGetUsers],
    create: [afterCreateUsers],
    update: [afterUpdateUsers],
    patch: [afterPatchUsers],
    remove: [afterRemoveUsers]
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

// https://crow.docs.feathersjs.com/guides/basics/services.html#service-methods
