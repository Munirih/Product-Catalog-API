const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

module.exports = Product;