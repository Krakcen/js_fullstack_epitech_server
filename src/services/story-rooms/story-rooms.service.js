// Initializes the `story-rooms` service on path `/story-rooms`
const createService = require('feathers-memory');
const hooks = require('./story-rooms.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/story-rooms', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('story-rooms');

  service.hooks(hooks);
};
