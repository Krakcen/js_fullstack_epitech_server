const Joi = require('joi');

module.exports = Joi.object({
  author: Joi.string().required(),
  title: Joi.string().required(),
  synopsis: Joi.string().required(),
  nombreOfBlockDefault: Joi.number().positive().min(0).required(),
}).required();