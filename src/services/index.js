const users = require('./users/users.service');
const stories = require('./stories/stories.service');
const story = require('./story/story.service.js');
const blocks = require('./blocks/blocks.service');

module.exports = function (app) {
  app.configure(users);
  app.configure(stories);
  app.configure(story);
  app.configure(blocks);
};
