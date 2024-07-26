// src/LoginPage.js

// src/AdminLogin.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css'; // Shared CSS file for styling

const AdminLogin = () => {
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/adminLogin', {
        adminID,
        password,
      });

      const { adminId, token } = response.data;
      localStorage.setItem('adminId', adminId);
      localStorage.setItem('token', token);
      navigate('/AdminHome'); // Navigate to admin dashboard or protected route
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage('No response from the server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="navbar-brand">Holiday Market <i className="fa-solid fa-gifts"></i></div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
        </div>
      </nav>
      <div className="auth-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="adminID">Admin ID:</label>
            <input
              type="text"
              id="adminID"
              value={adminID}
              onChange={(e) => setAdminID(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
