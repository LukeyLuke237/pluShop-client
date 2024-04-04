import React from "react"
import {NavLink} from "react-router-dom"
import { useLocation } from "react-router-dom"
import '../css/style.css'

const Header = () => {
    const location = useLocation();
    let headerLogin = 'Logout'
    if (!localStorage.getItem('username') || location.pathname.includes("login")) {
        headerLogin = 'Login'
    }

    const logout = () => {
        localStorage.removeItem('username')
    }

    return (
        <header>
            <img className="logo" src="/images/logo.png" alt="Logo"></img>
            <div className="app-name">PluShop</div>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    {localStorage.getItem('username') ? (
                        <div>
                            <li><NavLink to="/cart">Your Cart</NavLink></li>
                            <li><NavLink to="/history">History</NavLink></li>
                        </div>
                    ) : (<></>) }
                    <li><NavLink to="/login" onClick={() => logout()}>{headerLogin}</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}
    
    


export default Header;
    
