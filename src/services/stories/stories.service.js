// Initializes the `stories` service on path `/stories`
const createService = require('./stories.class');
const hooks = require('./stories.hooks');

const Stories = require('../../models/stories.model');
const Users = require('../../models/users.model');

module.exports = function (app) {

  const Model = {
    name: 'stories',
    stories: Stories,
    users: Users
  };
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/stories', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('stories');

  service.hooks(hooks);
};
