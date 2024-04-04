import React from "react";
import '../css/style.css';

const CartItem = (props) => {
  return (
    <div className="cart-item">
      <span className="cart-image"><img src={`images/${props.item.image}`} alt={props.item.name}/></span>
      <span className="cart-name">{props.item.name}</span>
      <span className="cart-price">${parseFloat(props.item.price).toFixed(2)}</span>
      <button className="remove-from-cart" onClick={() => {
        props.setCart(props.item);
        props.setData(props.item);
      }}>Remove</button>
    </div>
  )
}

export default CartItem;