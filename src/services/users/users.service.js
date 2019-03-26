// Initializes the `users` service on path `/users`
const createServiceMongoose = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');


module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', createServiceMongoose(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};

// https://medium.com/@codingfriend/feathersjs-a-framework-that-will-spoil-you-109525dfd35e