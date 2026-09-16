const express = require("express");

// Import the product controller functions
const {
    createProduct,
    getAllProducts,
    deleteProductById
} = require("../controllers/product.controller");

// Create a router
const router = express.Router();

// POST /api/products - Create a new product
router.post("/", createProduct);

// GET /api/products - Get all products
router.get("/", getAllProducts);

// DELETE /api/products/:id - Delete a product by ID
router.delete("/:id", deleteProductById);

// Export the router
module.exports = router;