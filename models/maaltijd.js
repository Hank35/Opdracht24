const Joi = require('Joi');

function validateMeal(maaltijd) {
    const schema = {
        naam: Joi.string().required(),
        beschrijving: Joi.string().required(),
        ingredienten: Joi.string().required(),
        allergie : Joi.string().required(),
        prijs : Joi.number().required()

    };
    return Joi.validateMeal(maaltijd, schema);
}

 exports.validate = validateMeal;