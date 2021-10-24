const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html');

//Sanitizing - para evitar que se pueda ingresar html en en los formularios y evitar posibles ataques a la web.
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.monsterSchema = Joi.object({
    monster: Joi.object({
        name: Joi.string().required().escapeHTML(),
        // image: Joi.string().required(),
        price: Joi.number().required().min(0),
        discount: Joi.number().required().min(0).max(100),
    }).required(),
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(0).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})