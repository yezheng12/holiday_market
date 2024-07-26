const UserProduct = require('../models/userProduct.model');

// Create an order
exports.createUserProduct = async (req, res) => {
  const { userId, products } = req.body;
  try {
    const order = new UserProduct({
      userId,
      products,
      orderDate: new Date(),
      status: 'Pending'
    });

    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user's orders
exports.getUserProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await UserProduct.find({ userId: id }).populate('products');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user product
exports.deleteUserProduct = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    await UserProduct.updateOne(
      { userId },
      { $pull: { products: productId } }
    );
    res.json({ message: 'Product removed from order' });
  } catch (error) {
    console.error('Error deleting user product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
