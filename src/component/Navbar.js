import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {useNavigate } from "react-router";
import Register from "./Register";




const Navbar = ({logedUser,onLogin}) => {
 const [isLogin,setIsLogin] = useState(false); 
  const navigate = useNavigate();

 
  const Loged = () => {
      
    
useEffect(()=>{
  if (!logedUser){
    setIsLogin(true);
  }
},[logedUser])

    return (
      <div className="d-flex">
        
        {logedUser ?  <div  className="d-flex justify-content-center align-items-center">
          <img className="profile-img" src={logedUser.avatar}/>
           <p className="profile-name">{logedUser.name.toUpperCase()}</p>
          </div> : <img/>}

        <Link to="/cart" className="btn btn-outline-dark ms-2">
        <i className="bi bi-cart-fill"></i>
          Cart
        </Link>
        <button className="btn  btn-outline-dark ms-2" onClick={handleLogout}>
        <i className="bi  bi-box-arrow-right"></i>
          Logout
          </button>
      </div>
    );
  }

  const Logout = () => {
    return (
      <div>
        <Link to="/login" className="btn btn-outline-dark" ><i className="bi bi-box-arrow-in-left"></i> Login</Link>

        <Link to="/register" className="btn btn-outline-dark ms-2">
        <i className="bi bi-person-fill-add"></i>
          Register
        </Link>
      </div>
    );
  }

 


  const handleLogout = () =>{  
    setIsLogin(false)
    onLogin(null);
    navigate("/Home");
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" to="/">Techno Blast</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" to="/products">Product</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>


            </ul>
            <div className="buttons-container">
                          {logedUser ? <Loged /> : <Logout/>}

            </div>
          </div>
        </div>
      </nav>


    </div>
  );
}

export default Navbar;