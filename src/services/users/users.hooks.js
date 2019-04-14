const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  isProvider, iff, discard, skipRemainingHooks,
} = require('feathers-hooks-common');

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const validate = require('feathers-hooks-validate-joi');

// const logger = require('../../logger');
const log = require('../../hooks/log');

const joiCreateRequest = require('../../schemas/requests/users/create');
// const joiPatchRequest = require('../../schemas/requests/users/patch');
// const joiUpdateRequest = require('../../schemas/requests/users/update');

const joiOptions = { convert: true, abortEarly: false };

// Before -
// ------------------------------------------------------
const beforeUsers = async context => context;

const beforeFindUsers = async context => context;

const beforeGetUsers = async context => context;

const beforeCreateUsers = async context => context;

const beforeUpdateUsers = async context => context;

const beforePatchUsers = async context => context;

const beforeRemoveUsers = async context => context;

// After -
// ------------------------------------------------------

const afterUsers = async context => context;

const afterFindUsers = async context => context;

const afterGetUsers = async context => context;

const afterCreateUsers = async context => context;

const afterUpdateUsers = async context => context;

const afterPatchUsers = async context => context;

const afterRemoveUsers = async context => context;

// Hooks -
// ------------------------------------------------------

module.exports = {
  before: {
    all: [skipRemainingHooks(isProvider('server')), beforeUsers],
    find: [authenticate('jwt'), beforeFindUsers],
    get: [authenticate('jwt'), beforeGetUsers],
    create: [validate.form(joiCreateRequest, joiOptions), hashPassword(), beforeCreateUsers],
    update: [
      /* validate.form(joiUpdateRequest, joiOptions), */
      hashPassword(),
      authenticate('jwt'),
      beforeUpdateUsers,
    ],
    patch: [
      /* validate.form(joiPatchRequest, joiOptions), */
      hashPassword(),
      authenticate('jwt'),
      beforePatchUsers,
    ],
    remove: [authenticate('jwt'), beforeRemoveUsers],
  },
  after: {
    all: [protect('password'), afterUsers],
    find: [afterFindUsers, iff(isProvider('external', discard('password', 'createdAt')))],
    get: [afterGetUsers],
    create: [afterCreateUsers],
    update: [afterUpdateUsers],
    patch: [afterPatchUsers],
    remove: [afterRemoveUsers],
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

// https://crow.docs.feathersjs.com/guides/basics/services.html#service-methods
