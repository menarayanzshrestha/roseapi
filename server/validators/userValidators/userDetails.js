const Joi = require('@hapi/joi');

const userDetailsSchema = Joi.object().keys({
    _id : Joi.string(),
    userId : Joi.string(),
    fullName : Joi.string().min(3).max(30)
});

module.exports = userDetailsSchema;