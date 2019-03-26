const mongoose = require('mongoose');

module.exports = function (app) {
  const {
    user,
    pass,
    hostname,
    port,
    name } = app.get('db');

  mongoose.connect(
    `mongodb://${user}:${pass}@${hostname}:${port}/${name}`,
    { useCreateIndex: true, useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
