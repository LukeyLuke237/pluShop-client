import React from "react";
import '../css/style.css';
import ProductCard from './ProductCard';

const Home = (props) => {

    const showToast = () => {
        let toast = document.querySelector(".toast");
        toast.style.visibility = "visible";
        setTimeout(() => {
            toast.style.visibility = "hidden";
        }, 1500);
    }

    if (props.loading) {
        <h2>Getting our products information...</h2>
    }
    else if (props.data.length !== 0) {
        return (
            <div>
                <div className="home-container">
                {props.data.map(plush => 
                    <ProductCard data={plush} key={plush._id} showToast={showToast} setData={props.setData} setCart={props.setCart}/>
                )}
                </div>
                <div className="toast">The product has been added to your cart</div>
            </div>
        )
    } else {
        return (
            <div className="home-container">
                <h2>Sorry, we have no products in stock right now</h2>
            </div>
        )
    }
    
    
}

export default Home;