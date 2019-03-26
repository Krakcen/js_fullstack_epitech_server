// stories-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const stories = new Schema({
    author: {
      type: Schema.ObjectId,
      ref: 'users',
      required: true
    },
    title: {
      type: String,
      default: 'Stories : Inconnue',
      required: true
    },
    synopsis: {
      type: String,
      maxlength: 255,
      required: true
    },
    blocks: [{
      type: Schema.ObjectId,
      ref: 'blocks',
      required: false
    }],
    nombreOfBlockDefault: {
      type: Number,
      required: true,
      default: 0
    },
    nombreOfBlock: {
      type: Number,
      require: true,
      default: 0
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('stories', stories);
};
