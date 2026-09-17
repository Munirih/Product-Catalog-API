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
        return res.status(201).json({
            status: 'success',
            data: product
        });

    } catch (error) {
        res.status(404).json({ 
            status: 'fail',
            message: error.message
         });
        // Pass unexpected errors to the error-handling middleware
        next(error);
    }
};

// Get all products
const getAllProducts = async (req, res, next) => {
    const { limit = 10, page = 1, search } = req.query;
    const skip = (page - 1 ) * limit;

    let query = {}
    if (search) {
        query = {
            $or: [
                { name: {$regex: search, $options: 'i'} },
            ]
        }
    }

    try {
        // Get all products from MongoDB
        const products = await ProductModel.find(query)
            .sort({ price: 1 })
            .skip(skip)
            .limit(parseInt(limit));
        const totalproducts = await ProductModel.countDocuments(query)

        // Return products and filtered to the client
        res.status(200).json({
            status: "success",
            length: products.length,
            data: products,
            totalproducts: Math.ceil(totalproducts / limit),
            currentPage: parseInt(page)
            })
           

    } catch (error) {
        // Pass unexpected errors to the error-handling middleware
        next(error);
    }
};


//Get Product By ID
const getProductById = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: `Product with id ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            status: "success",
            data: product
        })

    }
    catch(error) {
        console.log(error);
        next(error)
    }
}


//Update Product By ID
const updateProductById = async (req, res, next) => {
    // Validate the product data sent by the client
    const { error, value } = productValidation.validate(req.body);

    // Return an error if the product data is invalid
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
           req.params.id,
           { ...req.body, updatedAt: new Date() },
           { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                message: `Product with id ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            status: "success",
            data: updatedProduct
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//Delete Product By ID
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
    getProductById,
    updateProductById,
    deleteProductById
};



