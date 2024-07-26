import { useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import About from './components/About';
import Shop from './components/Shop';
import CreateForm from './components/CreateForm';
import AdminHome from './components/AdminHome';
import UpdateProduct from './components/UpdateProduct';
import UserLogin from './components/UserLogin';
import Register from './components/Register';
import EntryPage from './components/EntryPage';
import AdminLogin from './components/AdminLogin';
import Order from './components/Order';
import Cart from './components/Cart';



function App() {
  
  return (
    <div className='App'>
      
      <BrowserRouter>
      {/* <NavBar/> */}
        <Routes>
        <Route path="/" element={<EntryPage />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/createNew" element={<CreateForm />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Order />} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
