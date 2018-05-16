const Joi = require('Joi');

function validateMeal(meal) {
    const schema = {
        maalid: Joi.strict().required(),
        naam: Joi.string().required(),
        beschrijving: Joi.string().required(),
        ingredienten: Joi.string().required(),
        allergie: Joi.string().required(),
        prijs: Joi.number().required(),
        userID: Joi.string().required(),
        studentenhuisID: Joi.string().required()
    };
    return Joi.validate(meal, schema);
}

 exports.validate = validateMeal;