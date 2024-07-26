import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Shop.css'; // Import CSS file

const Cart = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [products, setProducts] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchCart();
  }, [userId, navigate]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getCart/${userId}`);
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]); // Ensure products is an array
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setProducts([]); // Ensure products is an array even on error
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDelete = async (productId) => {
    try {
      console.log(`Attempting to delete product ${productId} for user ${userId}`);
      const response = await axios.delete(`http://localhost:8000/api/deleteFromCart/${userId}/${productId}`);
      console.log(`Response from delete request:`, response);
      if (response.status === 200) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/createUserProducts', { userId, products });
      if (response.data) {
        console.log('Order created:', response.data);
        // Clear the cart after successful order
        await axios.delete(`http://localhost:8000/api/clearCart/${userId}`);
        setProducts([]);
        navigate('/orders'); // Navigate to orders page
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="shop-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Hello, {userName}</h3>
        </div>
        <div className="sidebar-menu">
          <Link to={`/orders`} className="sidebar-link">
            <i className="fas fa-shopping-bag"></i>
            <span>Orders</span>
          </Link>
          <Link to={`/cart`} className="sidebar-link">
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
          </Link>
          <Link to={`/shop`} className="sidebar-link">
            <i className="fas fa-store"></i>
            <span>Shop</span>
          </Link>
          <button onClick={handleLogout} className="logout-button">
            <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="product-list">
        <h2>Your Cart</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="product-card">
                <img src={`http://localhost:8000/${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleDelete(product._id)} className="btn btn-danger">Delete</button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        {products.length > 0 && (
          <div className="buy-button-container">
            <button onClick={handleBuy} className="btn btn-primary mt-3 buy-button">Buy Everything</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
