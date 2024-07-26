// models/cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{ type: Object, required: true }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
