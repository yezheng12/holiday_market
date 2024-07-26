// src/LoginPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/AuthPage.css'; // Shared CSS file for styling
import axios from "axios";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8000/api/userlogin', {
          email,
          password,
        });
        console.log('Login response:', response.data); // Debug log
        const { userId, userName, token } = response.data;
        localStorage.setItem('token', token); // Save token to localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        console.log(userId)
        console.log('Stored userId:', localStorage.getItem('userId')); // Add this line for debugging
        navigate('/shop');
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
          <div className="navbar-brand text-light">Holiday Market <i className="fa-solid fa-gifts"></i></div>
          <div className="navbar-links">
            <Link to="/">Home</Link>
          </div>
        </nav>
        <div className="auth-container">
          <h2>User Login</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">User Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default UserLogin;
