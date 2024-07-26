import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Shop.css'; // Import CSS file

const Order = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [orders, setOrders] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [userId, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/userProducts/${userId}`);
      if (response.data) {
        setOrders(response.data);
      } else {
        setOrders([]); // Ensure orders is an array
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]); // Ensure orders is an array even on error
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/userlogin');
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
        <h2>Your Orders</h2>
        <div className="product-grid">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-card">
                <h3>Order ID: {order._id}</h3>
                <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                <p>Status: {order.status}</p>
                <div className="order-products">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="product-card">
                      <img src={`http://localhost:8000/${product.imageUrl}`} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p>Price: ${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>You have no orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
