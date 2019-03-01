const db = require('../src/models');
exports.up = function (next) {
  db.blocks = [];
  db.blocks.push('author');
  db.blocks.push('context');
  db.blocks.push('isPublished');

  next();
};

exports.down = function (next) {
  db.blocks.pop('author');
  db.blocks.pop('context');
  db.blocks.pop('isPublished');
  delete db.blocks;

  next();
};