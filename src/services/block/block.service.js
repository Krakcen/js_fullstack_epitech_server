// Initializes the `blocks` service on path `/blocks`
const createService = require('feathers-mongoose');
const createModel = require('../../models/blocks.model');
const hooks = require('./block.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'block',
    Model,
    paginate,
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use('/block', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('block');

  service.hooks(hooks);
};
