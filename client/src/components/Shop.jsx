import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Shop.css'; // Import CSS file

const Shop = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchProducts();
    fetchCart();
  }, [userId, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/allProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getCart/${userId}`);
      setCart(response.data.products);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleAddToCart = async (product) => {
    if (!userId) {
      console.error('User ID is null');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/addCart', { userId, product });
      setCart(response.data.products);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
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
          <Link to="/shop" className="sidebar-link">
            <i className="fas fa-store"></i>
            <span>Shop</span>
          </Link>
          <button onClick={handleLogout} className="logout-button">
            <i className="fas fa-sign-out-alt btn btn-secondary"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="product-list">
        <h2>Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={`http://localhost:8000/${product.imageUrl}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
