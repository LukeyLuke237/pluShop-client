import React from "react";
import '../css/style.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({})
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        if (data.username && data.password) {
            if (data.username.trim() === "" || data.password.trim() === "") {
                setError('Please enter your username and password to login')
                return;
            }
            else {
                await fetch(`https://plushop-server.onrender.com/users/login`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.error) {
                            setError(res.error);
                        }
                        else {
                            localStorage.setItem('username', res.username);
                            navigate('/');
                        }
            });
            }
        } 
        else {
            setError('Please enter your username and password to login')
            return;
        } 
    }

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="form" action="" method="POST" onChange={event => handleChange(event)}>
                <div className="input-group">
                    <label>Username</label>
                    <input type="text" id="username" name="username" required></input>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
                <button type="submit" className="login-btn" onClick={event => handleLogin(event)}>Login</button>
                {error ? (<p className='error'>{error}</p>) : (<></>)}
            </form>
            
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    )
}

export default Login;