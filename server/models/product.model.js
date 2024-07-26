const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        minLength: [3, "Product name must be at least 3 characters."]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [3, "Description must be at least 3 characters."]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0."]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity must be greater than 0."]
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL is required"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
