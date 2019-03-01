const users = require('./users/users.service.js');
const stories = require('./stories/stories.service.js');
const blocks = require('./blocks/blocks.service.js');
const mutationsStories = require('./mutations-stories/mutations-stories.service.js');

module.exports = function (app) {
  app.configure(users);
  app.configure(stories);
  app.configure(blocks);
  app.configure(mutationsStories);
};
