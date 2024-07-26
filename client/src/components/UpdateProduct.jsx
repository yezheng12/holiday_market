import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/AdminPage.css'; // Import the new CSS file

const UpdateProduct = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/oneProduct/${id}`)
            .then((res) => {
                console.log("Product data:", res.data);
                if (res.data) {
                    setName(res.data.name || "");
                    setDescription(res.data.description || "");
                    setPrice(res.data.price || "");
                    setQuantity(res.data.quantity || "");
                    setImage(res.data.imageUrl || null);
                } else {
                    console.error("No data received from the server.");
                }
            })
            .catch((err) => {
                console.error("Error fetching product data:", err);
            });
    }, [id]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Redirect to admin login page
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        if (image) {
            formData.append('image', image);
        }

        axios.put(`http://localhost:8000/api/product/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log("Update response:", res);
                navigate("/AdminHome");
            })
            .catch((err) => {
                console.error("Error updating product:", err.response?.data?.errors);
                setErrors(err.response?.data?.errors || {});
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Edit Product</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/AdminHome">Admin Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <div className="container mt-4">
                    <h1>Update Product</h1>
                    <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                                style={{ color: 'grey' }}
                            />
                            {errors.name ? <p className="text-danger">{errors.name.message}</p> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter product description"
                                style={{ color: 'grey' }}
                            />
                            {errors.description ? <p className="text-danger">{errors.description.message}</p> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter product price"
                                style={{ color: 'grey' }}
                            />
                            {errors.price ? <p className="text-danger">{errors.price.message}</p> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter product quantity"
                                style={{ color: 'grey' }}
                            />
                            {errors.quantity ? <p className="text-danger">{errors.quantity.message}</p> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image:</label>
                            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                            {errors.image ? <p className="text-danger">{errors.image.message}</p> : null}
                        </div>
                        <button className="btn btn-secondary m-3 btn-lg">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
