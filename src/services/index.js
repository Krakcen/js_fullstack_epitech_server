const users = require('./users/users.service');
const story = require('./story/story.service');
const block = require('./block/block.service');

const storyRooms = require('./story-rooms/story-rooms.service.js');

const methods = require('./methods/methods.service.js');

module.exports = function (app) {
  app.configure(users);
  app.configure(story);
  app.configure(block);
  app.configure(storyRooms);
  app.configure(methods);
};
