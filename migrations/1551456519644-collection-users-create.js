const db = require('../src/models');
exports.up = function (next) {
  db.users = [];
  db.users.push('email');
  db.users.push('password');
  db.users.push('role');

  next();
};

exports.down = function (next) {
  db.users.pop('email');
  db.users.pop('password');
  db.users.pop('role');
  delete db.users;

  next();
};