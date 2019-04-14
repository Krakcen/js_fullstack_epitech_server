const Joi = require('joi');

module.exports = Joi.object({
  strategy: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
}).required();
