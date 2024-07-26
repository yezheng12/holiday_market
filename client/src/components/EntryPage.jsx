import React from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import "../styles/EntryPage.css";

const EntryPage = () => {
    return (
        <div className="home-page">
            <nav className="navbar">
                <div className="navbar-brand text-light">Holiday Market <i class="fa-solid fa-gifts"></i></div>
                <div className="navbar-links">
                    <Link to ="/adminLogin">Admin Login</Link>
                </div>
            </nav>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-lg btn-warning mr-3" to="/userLogin"> Login </Link>
                <Link className="btn btn-lg btn-warning" to ='/register'> Register </Link>
            </div>
        </div>
    );
}

export default EntryPage;
