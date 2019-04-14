const swagger = require('feathers-swagger');
const config = require('config');
const path = require('path');

module.exports = function (app) {
  app.configure(
    swagger({
      docsPath: '/docs',
      uiIndex: path.join(__dirname, '../public/docs/docs.html'),
      info: {
        title: config.get('title'),
        description: 'description',
      },
    }),
  );
};
