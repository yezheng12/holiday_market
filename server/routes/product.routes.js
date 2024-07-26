const ProductController = require('../controllers/product.controller');
module.exports = (app) => {
    app.post('/api/newProduct', ProductController.createProduct);
    app.get('/api/allProducts', ProductController.getAll);
    app.get('/api/oneProduct/:id', ProductController.getOne);
    app.put('/api/product/:id', ProductController.updateProduct); // This is the endpoint you need
    app.delete('/api/deleteProduct/:id', ProductController.deleteProduct);
};
