const Joi = require("joi");

const registerValidation = (data) => {
    const Schema = Joi.object({
        username: Joi
            .string()
            .min(2)
            .required(),

        email: Joi
            .string()
            .min(6)
            .required()
            .email(),

        password: Joi
            .string()
            .min(6)
            .required(),

        mobile: Joi
            .string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),

        status: Joi
            .string()
            .default('active'),

        role: Joi
            .string()
            .default('admin')
    });
    return Schema.validate(data)
}


const loginValidation = (data) => {

    const Schema = Joi.object({

        email: Joi
            .string()
            .required()
            .min(6),

        password: Joi
            .string()
            .required()
            .min(6)
    })
    return Schema.validate(data)
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation


