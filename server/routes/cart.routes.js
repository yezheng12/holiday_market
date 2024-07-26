const CartController = require('../controllers/cart.controller');
module.exports = (app) => {
    app.post('/api/addCart', CartController.addToCart);
    app.get('/api/getCart/:userId', CartController.getCart);
    app.delete('/api/deleteFromCart/:userId/:productId', CartController.deleteFromCart);
    app.delete('/api/clearCart/:userId', CartController.clearCart);
}