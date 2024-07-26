const Cart = require('../models/cart.model');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { userId, product } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    cart.products.push(product);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get cart for user
exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('products');
    if (!cart) {
      return res.json({ products: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete product from cart
exports.deleteFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    console.log(`Deleting product ${productId} from user ${userId}'s cart`);
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ error: 'Cart not found' });
    }
    console.log('Current cart products:', cart.products);
    cart.products = cart.products.filter(product => product._id.toString() !== productId);
    console.log('Updated cart products:', cart.products);
    await cart.save();
    console.log(`Deleted product ${productId} from user ${userId}'s cart`);
    res.json(cart);
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Clear cart for user
exports.clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.products = [];
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

