import React from 'react';
import {  Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import { useState } from 'react';
import Register from './component/Register';
import Login from './component/Login';
import Home from './component/Home';
import Profile from './component/Profile';
import Product from './component/Product';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import About from './component/About';
import Contact from './component/Contact';




function App() {
  const [logedInUser, setLogedInUser] = useState(null);

  const handleLogin = user => {
    setLogedInUser(user);

   
  }
 
  return (
    <div>
      <Navbar logedUser={logedInUser} onLogin={handleLogin} />
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/register"  element={<Register/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/cart"  element={<Cart user={logedInUser}/>}/>
        <Route path="/product/:id"  element={<Product user = {logedInUser}   />}/>
        <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
        <Route path="/checkout"  element={<Checkout user={logedInUser}/>}/>
        <Route path="/about"  element={<About/>}/>
        <Route path="/contact"  element={<Contact/>}/>
      </Routes>
    
    </div>

  );
}

export default App;
