import React from "react";
import '../css/style.css';
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
    const navigate = useNavigate();

    return (
        <div className="card">
            <img src={`images/${props.data.image}`} alt={props.data.name}></img>
            <div className="product-info">
                <h2>{props.data.name}</h2>
                <p className="price">{`$${parseFloat(props.data.price).toFixed(2)}`}</p>
                <button className="add-to-cart" onClick={() => {
                    if (localStorage.getItem('username')) {
                        props.showToast();
                        props.setData(props.data);
                        props.setCart(props.data);
                    }
                    else {
                        navigate('/login')
                    }
                    
                }}>Add to Cart</button>
            </div>
        </div>
    )
    
}

export default ProductCard;