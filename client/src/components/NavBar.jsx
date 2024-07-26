import React, { useState } from 'react';
import {Link} from 'react-router-dom'


const NavBar = () => {
    return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Holiday Market <i class="fa-solid fa-gifts"></i></a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link class="nav-link" to="/home">Home </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/CreateNew">Create Product</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/shop">Shop</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" href="/about">About</Link>
                </li>
            </ul>

        </div>

    </nav>);
}

export default NavBar;
