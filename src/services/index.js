const users = require('./users/users.service');
const story = require('./story/story.service');
const block = require('./block/block.service');

module.exports = function (app) {
  app.configure(users);
  app.configure(story);
  app.configure(block);
};
