import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Slide from "./Slide";


const Product = (user) => {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();


    let cartItem = [];
    useEffect(() => {
        const getProduct = async () => {

            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            setProduct(await response.json());
        }
        getProduct();
    }, [])

    


    const handleAddCart = () => {
        const cartData = localStorage.getItem("cartData");

       
        if (user.user) {
            cartItem = {
                name: product.title,
                email: user.user.email,
                price: product.price,
                image: product.image,
                quantity: 1,
            }

        } else {
            alert("Please log in to continue shopping!!!");
            return navigate('/login');}



        if (cartData) {
            const parseData = JSON.parse(cartData);


            const foundProduct = parseData.find(item => item.email === cartItem.email && item.name === cartItem.name);

            if (foundProduct) {

                alert("You already have this product in your cart!!!")

            } else {
                parseData.push(cartItem);
                localStorage.setItem("cartData", JSON.stringify(parseData));
                alert("Added product to shopping cart successfully!!!")
            }

        } else {
            localStorage.setItem("cartData", JSON.stringify([cartItem]));
            alert("Added product to shopping cart successfully!!!")
        }
    }


    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <Slide img={product.image}/>
                    {/* <img src={product.image} alt={product.title} height="400px" width="400px" /> */}
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className="display-5">{product.title}</h1>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className="bi bi-star-fill"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">${product.price} </h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={handleAddCart} >
                        <i className="bi bi-cart-plus-fill"></i>
                        Add to Cart
                    </button>
                    <NavLink to="/" className="btn btn-outline-dark px-4 py-2 ms-3">
                        Find More
                    </NavLink>
                </div>
            </>

        )
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    <ShowProduct />
                </div>
            </div>
        </div>
    );
}

export default Product;