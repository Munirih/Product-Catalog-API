const Joi = require('joi');
const ProductModel = require('../models/product.model')

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string.optional(),
    category: Joi.string().required(),
    inStock: Joi.boolean().default(true)
})




const deleteProductById = async (req, res, next) => {
    try{
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        if(!product) {
            return res.status(404).json({
                message: `Product with id ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            message: "Product deleted successfully!"
        })
    }
    catch (error) {
        res.status(500).json({ error: error });
        next(error)
    }  
}