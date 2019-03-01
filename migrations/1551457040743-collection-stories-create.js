const db = require('../src/models');
exports.up = function (next) {
  db.stories = [];
  db.stories.push('author');
  db.stories.push('title');
  db.stories.push('synopsis');
  db.stories.push('blocks');
  db.stories.push('nombreOfBlockDefault');
  db.stories.push('nombreOfBlock');

  next();
};

exports.down = function (next) {
  db.stories.pop('author');
  db.stories.pop('title');
  db.stories.pop('synopsis');
  db.stories.pop('blocks');
  db.stories.pop('nombreOfBlockDefault');
  db.stories.pop('nombreOfBlock');
  delete db.stories;

  next();
};