import React from "react";
import '../css/style.css';
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
    const navigate = useNavigate()
    
    const noItem = () => {
        if (props.cart.length > 0) {
            let total = 0;
            props.cart.forEach(plush => {
                total += parseFloat(plush.price)
            });
            return (
                <div className="cart-item total">
                    <span className="empty-span"></span>
                    <span className="cart-name">Total:</span>
                    <span className="cart-price">${total.toFixed(2)}</span>
                    <button className="check-out-btn" onClick={() => {
                        props.setTotal(total)
                        navigate('/checkout')
                    }}>Checkout</button>
                </div>
            )
        } else {
            return (
                <div className="no-cart-item">
                    <h3 style={{textAlign: "center"}}>There is no item in your cart</h3>
                </div>
            )
                
            
        }
    }

    return (
        <div className="cart-container">
            <h1>Your Cart {props.cart.length > 0 ? '(' + props.cart.length + ')' : ''}</h1>
            
            {props.cart.map(product =>
                <CartItem item={product} key={product._id} setData={props.setData} setCart={props.setCart}/>
            )}

            {noItem()}
        
            
        </div>
    )
}
    

export default Cart;