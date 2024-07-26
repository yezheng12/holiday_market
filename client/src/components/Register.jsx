// src/RegisterPage.js

import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Shared CSS file for styling
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(name,email,password)
        try {
            const response = await axios.post('http://localhost:8000/api/userRegister', {
                name,
                email,
                password,
            });

            // Handle successful registration
            setSuccessMessage('Successful registration!');
            setTimeout(() => {
                navigate('/userLogin'); // Navigate to '/userLogin' after 3 seconds
            }, 3000);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setErrorMessage(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('No response from the server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage('An error occurred. Please try again later.');
            }
            console.error('Registration error:', error);
        }
    };


    return (
        <div className="auth-page">
            <nav className="navbar">
                <div className="navbar-brand text-light">Holiday Market <i class="fa-solid fa-gifts"></i></div>
                <div className="navbar-links">
                    <Link to ="/">Home</Link>
                </div>
            </nav>
            <div className="auth-container">
                <h2>Register</h2>
                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;

