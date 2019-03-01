// Initializes the `mutationsStories` service on path `/stories/mutations`
const createService = require('./mutations-stories.class');
const hooks = require('./mutations-stories.hooks');

const Stories = require('../../models/stories.model');
const Blocks = require('../../models/stories.model');
const Users = require('../../models/users.model');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate,
    Models: {
      stories: Stories,
      blocks: Blocks,
      Users: Users
    }
  };

  // Initialize our service with any options it requires
  app.use('/stories/mutations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('stories/mutations');

  service.hooks(hooks);
};
