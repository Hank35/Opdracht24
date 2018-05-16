const Joi = require('Joi');

function validateUser(user) {
    const schema = {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

exports.validate = validateUser;