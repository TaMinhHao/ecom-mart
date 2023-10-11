import React, { useEffect, useState } from "react";
import { Indent } from "react-bootstrap-icons";
import { Link, json } from "react-router-dom";
import "./styles.css";




function Cart(user) {
    const [isEmpty, setIsEmpty] = useState(false);
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cartData')));


    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartData');

        if (storedCartItems) {
            setCartData(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(cartData));
    }, [cartData]);

    const handlePlus = (name) => {
        const updatedCartItems = cartData.map(item => {
            if (item.name === name && item.email === user.user.email) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });

        setCartData(updatedCartItems);
    };


    const handleMinus = (name) => {
        const updatedCartItems = cartData.map(item => {
            if (item.name === name && item.email === user.user.email) {
                if (item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                } else{

                }
            }
            return item;
        });

        setCartData(updatedCartItems);
    }

  

    const CartItems = (props) => {

        return (
            <div className="px-4 my-5  rounded-3" >
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={props.cartItem.image} alt={props.cartItem.name} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{props.cartItem.name}</h3>
                            <p className="lead fw-bold">
                                {props.cartItem.quantity} x $ {props.cartItem.price} = ${props.cartItem.quantity * props.cartItem.price}
                            </p>
                            <button className="btn btn-outline-dark me4 me-1" onClick={() => handleMinus(props.name)} >
                                <i className="bi bi-dash-lg"></i>   
                            </button>
                            <input className="quantity-field" type="text" value={props.cartItem.quantity} readOnly></input>
                            <button className="btn btn-outline-dark me4 ms-1" onClick={() => handlePlus(props.name)}>
                                <i className="bi bi-plus-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const EmptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        );
    }

    const Checkout = () => {
        return (
            <div className="container ">
                <div className="row">
                    <Link to="/checkout" className="btn btn-outline-dark mb-5 w-25 mx-auto">Proceed To checkout</Link>
                </div>
            </div>
        );
    }
    const ToHome = () => {
        return (
            <div className="container ">
                <div className="row">
                    <Link to="/" className="btn btn-outline-dark mb-5 w-25 mx-auto">Find More</Link>
                </div>
            </div>
        );
    }

    return (
        <div>



            {cartData.filter(item => item.email === user.user.email).length === 0 ? <EmptyCart /> :




                cartData.filter(item => item.email === user.user.email).map((item, index) => (

                    <CartItems cartItem={item} key={index} name={item.name} />
                )) 
            }
           {
            cartData.filter(item => item.email === user.user.email).length === 0 ? <ToHome/>: <Checkout/>
           }
        </div>
    )
}

export default Cart;