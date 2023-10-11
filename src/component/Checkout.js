import React, { useState, useEffect } from 'react'
import "./styles.css"
import { useNavigate } from 'react-router-dom';


const Checkout = (props) => {

    const [province, setProvince] = useState("");
    const [listProvince, setListProvince] = useState([]);
    const [city, setCity] = useState("");
    const [listCity, setListCity] = useState([]);
    const [ward, setWard] = useState("");
    const [listWard, setListWard] = useState([]);
    const [listCityFilter, setListCityFilter] = useState([]);
    const [listWardFilter, setListWardFilter] = useState([]);
    const [total, setTotal] = useState(0);
    const [dataProduct, setDataProduct] = useState([]);
    const [isAddCart, setisAddCart] = useState(false);
    const [cart, setCart] = useState({});
    const [isQuantity, setIsQuantity] = useState(false);
    const [addressField, setAddressField] = useState("");
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cartData')));

    const [bill, setBill] = useState({
        name: props.user.name,
        email: props.user.email,
        address: '',
        paymentType: '',
        nameOnCard: '',
        creditNumber: ''
    });

    const negative = useNavigate();
    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/')
            .then(response => response.json())
            .then(data => {
                setListProvince(data);
            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });

        fetch(`https://provinces.open-api.vn/api/d/`)
            .then(response => response.json())
            .then(data => {
                setListCity(data);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });

        fetch(`https://provinces.open-api.vn/api/w/`)
            .then(response => response.json())
            .then(data => {
                setListWard(data);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    }, []);

    useEffect(() => {
        if (province) {
            setListCityFilter(listCity.filter(item => parseInt(item.province_code) === parseInt(province)))
        }
        else {
            setListCityFilter([]);
        }
    }, [province]);

    useEffect(() => {
        if (city) {
            setListWardFilter(listWard.filter(item => parseInt(item.district_code) === parseInt(city)))
        }
        else {
            setListWardFilter([]);
        }
    }, [city]);

    const handleChangeProvince = (e) => {
        setProvince(e.target.value);
    }
    const handleChangeCity = (e) => {
        setCity(e.target.value);
    }
    const handleChangeWard = (e) => {
        setWard(e.target.value);
    }





    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartData');


        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => { setDataProduct(data); })
            .catch(error => console.error('Error fetching data:', error));


        if (storedCartItems) {
            setCartData(JSON.parse(storedCartItems));
        }


    }, []);

    useEffect(() => {
        let tot = 0;

        cartData.filter(item => item.email === props.user.email).forEach(element => {
            tot += element.quantity * element.price;
            setTotal(tot);
        });
    }, [cartData]);


    const ItemList = (item) => {
        return (

            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 className="my-0">{item.item.name} x{item.item.quantity}</h6>
                </div>
                <span className="text-muted">${item.item.quantity * item.item.price}</span>
            </li>
        );
    }


    const AddCartItem = (props) => {

        return (
            <li className='list-group-item d-flex justify-content-between lh-sm"' >
                <img className='checkoutcartimg' src={props.item.image} />
                <div>
                    <h6 className="my-0 btn-click" onClick={handleSelectItem}>{props.item.title} </h6>
                </div>
                <span className="text-muted">${props.item.price}</span>
            </li>
        );
    }


    const filterArray = dataProduct.filter(item1 => !cartData.filter(cart=>cart.email===props.user.email).some(item2 => item2.name === item1.title ));



    const handleAddCart = () => {
        setisAddCart(!isAddCart);
    }

    const handleSelectItem = (e) => {
        let newcart = {
            name: e.target.textContent.slice(0, -1),
            quantity: 1
        }
        setCart(newcart);
        setisAddCart(false);
        setIsQuantity(true);
    }

    const handleAdd = () => {

        const temp = dataProduct.find(item => item.title === cart.name)


        const pushData = {
            name: temp.title,
            email: props.user.email,
            price: temp.price,
            quantity: cart.quantity,
            image: temp.image
        }

        let data = cartData;
        data.push(pushData);
        setCartData(data);
        localStorage.setItem('cartData', JSON.stringify(cartData));
        setIsQuantity(false);

        ///
        let tot = 0;

        cartData.filter(item => item.email === props.user.email).forEach(element => {
            tot += element.quantity * element.price;
            setTotal(tot);
        });

    }

    const handleOptionChange = (event) => {
        let newbill = {
            ...bill, paymentType: event.target.value
        }

        setBill(newbill);

    };

    const handlePostBill = (e) => {
        e.preventDefault();
        let prov = '';
            let dictr = '';
            let war = '';

        if (province && city && ward) {
             prov = listProvince.find(provice => provice.code == province)
             dictr = listCity.find(item => item.code == city)
             war = listWard.find(item => item.code == ward)
        } else {
            alert("Choose your address!!!")
            return;
        }




         let addressData = prov.name + "/" + dictr.name + "/" + war.name + "/" + addressField;

        let totalBill = 0;

        let fil = cartData.filter(item=>item.email===props.user.email)
            
        let billCart = fil.map(item=> {
            totalBill += item.price*item.quantity;
            return{
                name:item.name,
                quantity:item.quantity,
                total: item.price*item.quantity
            }
        });
        

            let postData = {
                ...bill,
                address: addressData,
                billCart:billCart,
                total:totalBill
            }
            
           let billData = localStorage.getItem("billData");
           let delCart = cartData.filter(item=>item.email!==props.user.email)
           if (billData) {
             let bi = JSON.parse(billData);
             localStorage.setItem("billData", JSON.stringify([...bi, postData]));
             localStorage.setItem("cartData",JSON.stringify(delCart));
             alert("Buy Successfully!!");
             negative("/");

           } else{
            localStorage.setItem("billData",JSON.stringify([postData]));
            localStorage.setItem("cartData",JSON.stringify(delCart));
            alert("Buy Successfully!!");
            negative("/");
           }
            


    }

    return (
        <>
            <div className="container my-5">
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill"></span>
                        </h4>
                        <ul className="list-group mb-3">

                            {cartData.filter(item => item.email === props.user.email).length === 0 ? <div></div> :

                                cartData.filter(item => item.email === props.user.email).map((item, index) => (

                                    <ItemList key={index} item={item} />



                                ))
                            }

                            {<li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>{total}</strong>
                            </li>
                            }
                        </ul>

                        <button className='btn-adding-cart' onClick={handleAddCart}>Find More </button>
                        {
                            !isAddCart ? <div></div> :
                                <ul className='list-group mb-3 checkout-adding-cart'>
                                    {filterArray.map((item, index) => (
                                        <AddCartItem key={index} item={item} />
                                    ))}
                                </ul>
                        }


                        {
                            !isQuantity ? <div /> :
                                <div className='list-group-item mt-2 justify-content-between lh-sm'>
                                    <br />
                                    <div>
                                        <h6 className="my-0" >{cart.name}</h6>
                                    </div>
                                    <input type='number' min={1}
                                        value={cart.quantity}
                                        className='quantity-input'
                                        onChange={e => setCart({ name: cart.name, quantity: e.target.value })
                                        }></input>
                                    <button className='btn-add' onClick={handleAdd}>Add to Cart</button>
                                </div>
                        }





                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" noValidate="">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="fullname" className="form-label">Full Name</label>
                                    <div className="input-group has-validation">
                                        <input type="text"
                                            className="form-control"
                                            id="fullname"
                                            placeholder="Fullname"
                                            required=""
                                            value={bill.name}
                                            readOnly
                                        />

                                    </div>
                                </div>


                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="you@example.com"
                                        value={bill.email}
                                        readOnly
                                    />

                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="1234 Main St"
                                        required=""
                                        value={addressField}
                                        onChange={e => setAddressField(e.target.value)}
                                    />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>



                                <div className='d-flex'>
                                    <div className="col-md-5">
                                        <label htmlFor="province" className="form-label">Province</label>
                                        <select className="form-select" id="province" required="" onChange={handleChangeProvince}>
                                            <option value="">Choose...</option>
                                            {listProvince.map((provinceOption) => (
                                                <option key={provinceOption.code} value={provinceOption.code}>
                                                    {provinceOption.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid Province.
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <select className="form-select" id="city" required="" onChange={handleChangeCity}>
                                            <option value="">Choose...</option>
                                            {listCityFilter.map((provinceOption) => (
                                                <option key={provinceOption.code} value={provinceOption.code}>
                                                    {provinceOption.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid City.
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="districts" className="form-label">Districts</label>
                                        <select className="form-select" id="districts" required="" onChange={handleChangeWard}>
                                            <option value="">Choose...</option>
                                            {listWardFilter.map((provinceOption) => (
                                                <option key={provinceOption.code} value={provinceOption.code}>
                                                    {provinceOption.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid Districts.
                                        </div>
                                    </div>

                                </div>
                            </div>





                            <hr className="my-4" />

                            <h4 className="mb-3">Payment</h4>

                            <div className="my-3">
                                <div className="form-check">
                                    <input id="credit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        required=""
                                        value="credit"
                                        checked={bill.paymentType === 'credit'}
                                        onChange={handleOptionChange}

                                        defaultChecked />
                                    <label className="form-check-label" htmlFor="credit" >Credit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="debit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        required=""
                                        value="debit"
                                        checked={bill.paymentType === 'debit'}
                                        onChange={handleOptionChange}
                                    />
                                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="form-check">
                                    <input id="paypal"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        required=""
                                        value="Paypal"
                                        checked={bill.paymentType === 'PayPal'}
                                        onChange={handleOptionChange}
                                    />
                                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                </div>
                            </div>

                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                                    <input type="text"
                                        className="form-control"
                                        id="cc-name"
                                        placeholder=""
                                        onChange={e => setBill({ ...bill, nameOnCard: e.target.value })}
                                        value={bill.nameOnCard}
                                        required="" />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Card number</label>
                                    <input type="text"
                                        className="form-control"
                                        id="cc-number"
                                        placeholder=""
                                        onChange={e => setBill({ ...bill, creditNumber: e.target.value })}
                                        value={bill.creditNumber}
                                        required="" />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type='submit'  onClick={handlePostBill} >
                                Continue to checkout


                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout