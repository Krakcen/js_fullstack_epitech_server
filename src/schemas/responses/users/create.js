const Joi = require('joi');

module.exports = Joi.object({
  _id: Joi.string().email().required(),
  password: Joi.string().max(8).required(),
  username: Joi.string().required()
}).required();