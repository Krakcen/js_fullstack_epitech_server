const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const validate = require('feathers-hooks-validate-joi');

const createSchemaRequest = require('../../schemas/requests/users/create');

const joiOptions = { convert: true, abortEarly: false };

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      validate.form(createSchemaRequest, joiOptions),
      hashPassword()
    ],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },
  after: {
    all: [protect('password')],
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

// https://crow.docs.feathersjs.com/guides/basics/services.html#service-methods