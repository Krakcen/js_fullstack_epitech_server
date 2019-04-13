const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().max(8),
    username: Joi.string()
}).required();