import React, { useState } from "react";
import { json, useNavigate } from 'react-router-dom';
import './styles.css';

const Login = ({ onLogin }) => {
    const data = JSON.parse(localStorage.getItem('userData'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let User  = {};
        if (data) {User = data.find((User) => User.email === email); }
        else {localStorage.setItem("userData",JSON.stringify([{
            name:'a',
            email:'',
            phoneNumber:'',
            password:'',
            avatar:''
        }]))}


        if (!User) {
            alert('Người dùng không tồn tại');
            return;
        }
        if (User.password !== password) {
            alert('Mật khẩu không chính xác.');
            return;
        }
        if (email === '') {
            alert('Vui lòng nhập email.');
            return;
        }
        if (password === '') {
            alert('Vui lòng nhập mật khẩu.');
            return;
        }

        onLogin(User);
        navigate('/');
    };
    return (
        <div className="d-flex justify-content-center align-items-center">
            <form >

            <h1 className='title' >Login</h1>
                <label className="inputitem">
                    <i className="bi inputicon bi-envelope-fill"></i>
                    <input
                        type="email"
                        className="textfield"
                        placeholder="   Email"
                        value={email}
                        onChange={handleEmailChange} />
                </label>
                <br />
                <label className='inputitem'>
                <i className="bi inputicon bi-lock-fill"></i>
                    <input 
                        className="textfield"
                        type="password"
                        placeholder="   Password"
                        value={password}
                        onChange={handlePasswordChange} />
                </label>
                <br/>
                <button className="btnsubmit" onClick={handleSubmit}>Login</button>
            </form>
                
        </div>
    );
}

export default Login;
