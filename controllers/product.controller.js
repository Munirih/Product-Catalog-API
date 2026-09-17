const ProductModel = require('../models/product.model')
// Import the product validation rules
const productValidation = require('../validation/product.validation');

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        // Validate the product data sent by the client
        const { error, value } = productValidation.validate(req.body);

        // Return an error if the product data is invalid
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // Save the validated product in MongoDB
        const product = await ProductModel.create(value);

        // Return the newly created product
        return res.status(201).json(product);

    } catch (error) {
        // Pass unexpected errors to the error-handling middleware
        next(error);
    }
};

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        // Get all products from MongoDB
        const products = await ProductModel.find();

        // Return the products to the client
        return res.status(200).json(products);

    } catch (error) {
        // Pass unexpected errors to the error-handling middleware
        next(error);
    }
};


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

// Export the product controller functions
module.exports = {
    createProduct,
    getAllProducts,
    deleteProductById
};



