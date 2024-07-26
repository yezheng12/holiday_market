const Product = require('../models/product.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

// Create one product
const createProduct = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Multer error:", err);
            return response.status(500).json({ error: err.message });
        }

        const { name, description, price, quantity } = request.body;
        const newProduct = new Product({
            name,
            description,
            price,
            quantity,
            imageUrl: request.file ? request.file.path : null
        });

        newProduct.save()
            .then(product => response.json({ product }))
            .catch(err => {
                console.error("Mongoose error:", err);
                response.status(400).json({ errors: err.errors });
            });
    });
};

// Get all products
const getAll = (request, response) => {
    Product.find()
        .then(allProducts => response.json(allProducts))
        .catch(err => response.status(400).json({ err }));
};

// Get one product
const getOne = (request, response) => {
    Product.findOne({ _id: request.params.id })
        .then(oneProduct => response.json(oneProduct))
        .catch(err => response.status(400).json({ err }));
};

// Update product
const updateProduct = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Multer error:", err);
            return response.status(500).json({ error: err.message });
        }

        const { name, description, price, quantity } = request.body;
        const updatedProduct = {
            name,
            description,
            price,
            quantity
        };

        if (request.file) {
            updatedProduct.imageUrl = request.file.path;
        }

        Product.findOneAndUpdate({ _id: request.params.id }, updatedProduct, { new: true, runValidators: true })
            .then(updatedProduct => response.json({ updatedProduct }))
            .catch(err => {
                console.error("Mongoose error:", err);
                response.status(400).json({ err });
            });
    });
};

// Delete product
const deleteProduct = (request, response) => {
    Product.deleteOne({ _id: request.params.id })
        .then(deletedRes => response.json({ deletedRes }))
        .catch(err => response.status(400).json({ err }));
};

module.exports = {
    createProduct,
    getAll,
    getOne,
    updateProduct,
    deleteProduct
};
