const Joi = require("joi");


// VALIDATION
registerValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(15).required()
    });
    Joi.validate(req.body, schema, (err, result) => {
        if (err) {
            var error = new Error(err.details[0].message);
            error.status = 416;
            next(error);
        } else {
            console.log(result);
            next();
        }

    })
}


module.exports = { registerValidation }