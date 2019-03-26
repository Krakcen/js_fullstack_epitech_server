// Initializes the `story` service on path `/story`
const createService = require('./story.class');
const createModelStories = require('../../models/stories.model');
const hooks = require('./story.hooks');

module.exports = function (app) {
  createModelStories(app);
  const mongooseClient = app.get('mongooseClient');

  const paginate = app.get('paginate');

  const options = {
    name: 'story',
    Models: mongooseClient.models,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/story', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('story');

  service.hooks(hooks);
};
