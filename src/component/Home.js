import React , { useState, useEffect } from "react";

import './styles.css';
import { Link } from "react-router-dom";


function Home() {
    const [dataProduct, setDataProduct] = useState([]);
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => { setDataProduct(data); setListProduct(data) })
            .catch(error => console.error('Error fetching data:', error));
    };



    const dataFilter = (categori) => {
        if (categori === "All") {
            setListProduct(dataProduct);
        }
        else { setListProduct(dataProduct.filter(product => product.category === categori)) }

    }

    return (
        <div>
            <div id='categories'>
                <div className="buttons d-flex justify-content-center mb-1 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => dataFilter("All")}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => dataFilter("men's clothing")}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => dataFilter("women's clothing")}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => dataFilter("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => dataFilter("electronics")}>Electronic</button>

                </div>
            </div>
            <div id='homePage' >

                 {listProduct.map((product) => {
                    return (

                        <div className="col-md-3 mb-4 ms-2" key={product.id}>
                            <div className="card h-100 text-center p-4" >
                                <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                                    <p className="card-text lead fw-bold">
                                        ${product.price}
                                    </p>
                                    <Link to={`/product/${product.id}`} className="btn btn-outline-dark">Buy Now</Link>
                                </div>
                            </div>
                        </div>

                    )

                })}
            </div>
        </div>
    );

}

export default Home;