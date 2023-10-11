import React from 'react';
import {  Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import { useState } from 'react';
import Register from './component/Register';
import Login from './component/Login';
import Home from './component/Home';
import Profile from './component/Profile';




function App() {
  const [logedInUser, setLogedInUser] = useState(null);

  const handleLogin = user => {
    setLogedInUser(user);
  }

  return (
    <div>
      <Navbar logedUser={logedInUser}/>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/register"  element={<Register/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/login" element={<Login onLogin={handleLogin}/>} />
      </Routes>
    
    </div>

  );
}

export default App;
