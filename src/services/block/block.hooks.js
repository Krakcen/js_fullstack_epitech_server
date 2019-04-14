const { authenticate } = require('@feathersjs/authentication').hooks;
const { skipRemainingHooks, isProvider } = require('feathers-hooks-common');
const validate = require('feathers-hooks-validate-joi');

const log = require('../../hooks/log');

const joiCreateRequest = require('../../schemas/requests/block/create');
const joiPatchRequest = require('../../schemas/requests/block/patch');
const joiUpdateRequest = require('../../schemas/requests/block/update');

const joiOptions = { convert: true, abortEarly: false };

// Before -
// ------------------------------------------------------
const beforeBlock = async context => context;

const beforeFindBlock = async context => context;

const beforeGetBlock = async context => context;

const beforeCreateBlock = async context => context;
const beforeUpdateBlock = async context => context;

const beforePatchBlock = async context => context;

const beforeRemoveBlock = async context => context;

// After -
// ------------------------------------------------------

const afterBlock = async context => context;

const afterFindBlock = async context => context;

const afterGetBlock = async context => context;

const afterCreateBlock = async context => context;

const afterUpdateBlock = async context => context;

const afterPatchBlock = async context => context;

const afterRemoveBlock = async context => context;

// Hooks -
// ------------------------------------------------------

module.exports = {
  before: {
    all: [skipRemainingHooks(isProvider('server')), authenticate('jwt'), beforeBlock],
    find: [beforeFindBlock],
    get: [beforeGetBlock],
    create: [validate.form(joiCreateRequest, joiOptions), beforeCreateBlock],
    update: [validate.form(joiUpdateRequest, joiOptions), beforeUpdateBlock],
    patch: [validate.form(joiPatchRequest, joiOptions), beforePatchBlock],
    remove: [beforeRemoveBlock],
  },

  after: {
    all: [afterBlock],
    find: [afterFindBlock],
    get: [afterGetBlock],
    create: [afterCreateBlock],
    update: [afterUpdateBlock],
    patch: [afterPatchBlock],
    remove: [afterRemoveBlock],
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
