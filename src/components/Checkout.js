import React, { useState } from "react";
import '../css/style.css';
import {FaCcVisa, FaCcMastercard, FaUser, FaAddressCard} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const Validate = async (event) => {
        event.preventDefault()
        if (Object.keys(data).length === 8) {
            if (data.cardname.trim() === "" || data.cardnumber.trim() === "" || data.cvv.trim() === "" || data.expmonth.trim() === "" || data.expyear.trim() === "" || data.name.trim() === "" || data.address.trim() === "" || data.zip.trim() === "") {
                setError("Please enter your information in all the fields")
            } else {
                if (isNaN(Number(data.cardnumber)) || data.cardnumber.length !== 16) {
                    setError("Please enter your 16-digit card number (with no whitespace)")
                } 
                else if (isNaN(Number(data.cvv)) || data.cvv.length !== 3) {
                    setError("Please enter the cvv/cvc of your card (The 3 number at the back)")
                }
                else if (isNaN(Number(data.expmonth)) || Number(data.expmonth) < 1 || Number(data.expmonth) > 12) {
                    setError("Please enter the correct expiration month of your card")                    
                }
                else if (isNaN(Number(data.expyear))) {
                    setError("Please enter the correct expiration year of your card")
                }
                else {
                    let today = new Date();
                    // let day = String(today.getDate()).padStart(2, '0');
                    // let month = String(today.getMonth() + 1).padStart(2, '0');
                    // let year = today.getFullYear();

                    props.cart.forEach(async item => {
                        let newOrder = {
                            date: today,
                            name: item.name,
                            price: item.price,
                            user: localStorage.getItem('username')
                        }

                        await fetch(`https://plushop-server.onrender.com/orders`, {
                            method: 'POST',
                            mode: 'cors',
                            cache: 'no-cache',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newOrder),
                        })
                        .then(res => res.json())
                        .then(res => {
                            if (res.error) {
                                setError(res.error);
                                return;
                            }
                            props.setCart([])
                        })
                        .catch (err => {
                            console.log(err)
                            return;
                        });

                        await fetch(`https://plushop-server.onrender.com/products/${item._id}`, {
                            method: 'DELETE',
                            mode: 'cors',
                            cache: 'no-cache'
                        })
                        .then(res => res.json())
                        .catch (err => {
                            console.log(err)
                        });
                    });
                    navigate('/');
                }
            }
        } else {
            setError("Please enter your information in all the fields")
        }
    }

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="checkout-container">
            <form action="" method="POST" onChange={event => handleChange(event)}>
                <div className="checkout-row">
                    <div className="col-50">
                        <h3>
                            Payment
                            <FaCcVisa style={{"color": "navy"}}/>
                            <FaCcMastercard style={{"color": "red"}}/>
                        </h3>
                        
                        <label className="checkout-label">Name on Card</label>
                        <input type="text"   className="checkout-input"  id="cname" name="cardname" />
                        
                        <div className="checkout-row">
                            <div className="col-50">
                                <label className="checkout-label">Credit card number</label>
                                <input type="text"   className="checkout-input"  id="ccnum" name="cardnumber" placeholder="Your 16-digit card number" />
                            </div>
                            <div className="col-50">
                                <label className="checkout-label">CVV/CVC</label>
                                <input type="text"   className="checkout-input"  id="cvv" name="cvv" />
                            </div>
                        </div>
                    
                        <div className="checkout-row">
                            <div className="col-50">
                                <label className="checkout-label">Expiration Month</label>
                                <input type="text"   className="checkout-input" id="expmonth" name="expmonth" placeholder="1-12"/>
                            </div>
                            <div className="col-50">
                                <label className="checkout-label">Expiration Year</label>
                                <input type="text"   className="checkout-input"  id="expyear" name="expyear" />
                            </div>
                        </div>
                    </div>

                    <div className="col-50">
                        <h3>Billing Address</h3>
                        <label className="checkout-label" ><FaUser/> Full Name</label>
                        <input type="text"   className="checkout-input"  id="fname" name="name" />
                        <label className="checkout-label"><FaAddressCard/> Address</label>
                        <input type="text"   className="checkout-input"  id="adr" name="address" />
                    
                        <div className="checkout-row">
                            <div className="col-50">
                                <label className="checkout-label">Zip</label>
                                <input type="text"   className="checkout-input" id="zip" name="zip"/>
                            </div>
                        </div>
                    </div>
                </div>
                {error ? (<p className='error'>{error}</p>) : (<></>)}
                {props.total && <p>You are making a payment of <strong>${props.total.toFixed(2)}</strong></p>}
                <input type="submit" value="Checkout" className="btn-checkout" onClick={(event) => Validate(event)}/>
            </form>
        </div>
    )
}

export default Checkout;