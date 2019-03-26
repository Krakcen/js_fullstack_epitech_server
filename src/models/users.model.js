// users-model.js - A mongoose model

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, required: true, default: 'visiteur' },
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
