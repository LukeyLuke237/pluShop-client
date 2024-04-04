import React from "react";
import '../css/style.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({})
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (data.username && data.password) {
            if (data.username.trim() === "" || data.password.trim() === "") {
                setError('Please enter your username and password')
                return;
            }
            else {
                await fetch(`https://plushop-server.onrender.com/users`, {
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
                            navigate('/login');
                        }
            });
            }
        } 
        else {
            setError('Please enter your username and password')
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
        <div className="register-container">
            <h2>Register</h2>
            <form action="" method="POST" onChange={(event => handleChange(event))}>
                <div className="input-group">
                    <label>Username</label>
                    <input type="text" id="username" name="username" required></input>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
                <button className="register-btn" type="submit" onClick={event => handleRegister(event)}>Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
            {error ? (<p className='error'>{error}</p>) : (<></>)}
        </div>
    )
}

export default Register;