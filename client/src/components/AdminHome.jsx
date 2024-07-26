import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AdminPage.css'; // Import the new CSS file

const AdminHome = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/allProducts")
            .then((response) => {
                console.log(response.data);
                setAllProducts(response.data);
            })
            .catch((err) => { console.log(err.response) });
    }, []);

    const handleDeleteProduct = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/deleteProduct/${idFromBelow}`)
            .then((response) => {
                console.log(response);
                const filteredProducts = allProducts.filter((product) => {
                    return product._id !== idFromBelow;
                });
                setAllProducts(filteredProducts);
            })
            .catch((err) => {
                console.log("error deleting product", err.response);
            });
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Redirect to admin login page
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Admin Dashboard</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/createNew">Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <div className="container">
                    <h1>Products Inventory</h1>
                    <br/>
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <div className="button-group">
                                                <Link className="btn btn-secondary" to={`/updateProduct/${product._id}`}>Edit</Link>
                                                <button className="btn btn-secondary" onClick={() => handleDeleteProduct(product._id)}>Remove</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
