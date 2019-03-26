const { authenticate } = require('@feathersjs/authentication').hooks;
const validate = require('feathers-hooks-validate-joi');

const createSchemaRequest = require('../../schemas/requests/story/create');
const joiOptions = { convert: true, abortEarly: false };

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validate.form(createSchemaRequest, joiOptions)],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
