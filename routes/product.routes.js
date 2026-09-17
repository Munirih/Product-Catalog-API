const express = require("express");

// Import the product controller functions
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
} = require("../controllers/product.controller");

// Create a router
const router = express.Router();

// POST /api/products - Create a new product
router.post("/", createProduct);

// GET /api/products - Get all products
router.get("/", getAllProducts);

// GET /api/products - Get a product by ID
router.get("/:id", getProductById);

// GET /api/products - Update a product by ID
router.put("/:id", updateProductById);

// DELETE /api/products/:id - Delete a product by ID
router.delete("/:id", deleteProductById);

// Export the router
module.exports = router;