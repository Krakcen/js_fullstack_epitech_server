// blocks-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const blocks = new Schema({
    author: {
      type: Schema.ObjectId,
      ref: 'users',
      required: true
    },
    context: {
      type: String,
      required: false
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('blocks', blocks);
};
