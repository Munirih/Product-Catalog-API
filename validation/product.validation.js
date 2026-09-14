const Joi = require('joi');

// Validation rules for creating a product
const productValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().optional(),
    category: Joi.string().required(),
    inStock: Joi.boolean().optional()
});

// Export the validation rules so the controller can use them
module.exports = productValidation;