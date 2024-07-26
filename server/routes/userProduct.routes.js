const UserProductController = require('../controllers/userProduct.controller');
module.exports = (app) => {
    app.post('/api/createUserProducts', UserProductController.createUserProduct);
    app.get('/api/userProducts/:id', UserProductController.getUserProducts);
    app.delete('/api/deleteUserProduct/:userId/:productId', UserProductController.deleteUserProduct);
};
