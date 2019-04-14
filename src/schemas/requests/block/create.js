const Joi = require('joi');

module.exports = Joi.object({
  author: Joi.string().required(),
  idStory: Joi.string().required(),
  context: Joi.string().required()
}).required();
