const Joi = require('joi');
const ProductModel = require('../models/product.model')





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
        console.log(error)
        next(error)
    }  
}