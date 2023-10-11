import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';






function Register() {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        avatar: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setFormData((prevData) => ({
                    ...prevData,
                    avatar: event.target.result,
                }));
            };

            reader.readAsDataURL(file);
        } else {

            setFormData((prevData) => ({
                ...prevData,
                avatar: '',
            }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();


        if (formData.name.trim() === '' ||
            formData.email.trim() === '' ||
            formData.password.trim() === '' ||
            formData.confirmPassword.trim() === '' ||
            formData.avatar.trim() === '' ||
            formData.phoneNumber.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (!validatePhoneNumber(formData.phoneNumber)) {
            alert('Wrong phone number format.Try agian!!!');
            return;
        }

        if (formData.confirmPassword !== formData.password) {
            alert('Those passwords didn’t match. Try again.');
            return;
        }



        const storedData = localStorage.getItem('userData');
        let parseData = [];
        let pushData = [];
        if (storedData) {
            parseData = JSON.parse(storedData);
            if (parseData.find((data) => data.email === formData.email)) {
                alert('Email is already taken!!!');
                return;
            }


        }
        parseData.push(formData);
        pushData = parseData.map(item => {
            const { confirmPassword, ...rest } = item;
            return rest;
        });
        localStorage.setItem('userData', JSON.stringify(pushData));
        alert("Your registration has been successful!!!");
        navigate('/login');
    };



    const validatePhoneNumber = phoneNumber => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phoneNumber);
    }

    return (

        <div>


            <div className='d-flex justify-content-center align-items-center'>


                <form onSubmit={handleSubmit}>
                    <h1 className='title' >Sign up</h1>
                    <label className='inputitem'>
                        <i className="bi inputicon bi-person-fill"></i>
                        <input
                            className='textfield'
                            type="text"
                            name="name"
                            placeholder='   Name'
                            value={formData.name}
                            onChange={handleChange}
                        />


                    </label>
                    <br />
                    <label className='inputitem'>
                        <i className="bi inputicon bi-envelope-fill"></i>
                        <input
                            className='textfield'
                            type="email"
                            name="email"
                            placeholder='   Email'
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete=''
                        />
                    </label>
                    <br />
                    <label className='inputitem'>
                        <i className="bi inputicon bi-telephone-fill"></i>
                        <input
                            className='textfield'
                            type="text"
                            name="phoneNumber"
                            placeholder='   Phone Number'
                            value={formData.phoneNumber}
                            onChange={handleChange}

                        />
                    </label>
                    <br />
                    <label className='inputitem'>
                        <i className="bi inputicon bi-lock-fill"></i>
                        <input
                            className='textfield'
                            type="password"
                            name="password"
                            placeholder='   Password'
                            value={formData.password}

                            onChange={handleChange}

                        />
                    </label>
                    <br />
                    <label className='inputitem'>
                        <i className="bi inputicon bi-key-fill"></i>
                        <input
                            className='textfield'
                            type="password"
                            name="confirmPassword"
                            placeholder='   Repeat password'
                            value={formData.confirmPassword}
                            onChange={handleChange}

                        />
                    </label>
                    <br />
                    <label className='inputitem' style={{ cursor: "pointer" }}>
                        <i className="bi inputicon bi-person-bounding-box "> <label htmlFor="file" style={{ cursor: "pointer" }}>Avatar</label></i>
                        <input
                            type="file"
                            accept="image/*"
                            id='file'
                            className='inputfile'
                            onChange={handleAvatarChange}
                        />

                    </label>
                    <br />
                    <button className='btnsubmit' type="submit">Register</button>
                </form>

                <div >
                    {formData.avatar && (
                        <img className="previewImage" src={formData.avatar} alt="Avatar" />
                    )}

                </div>
            </div>
        </div>

    );
}

export default Register;
