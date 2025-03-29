import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function LoginDiv({ setIsAuthenticated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // default account 
        if (email === "admin@gmail.com" && password === "password") {
            localStorage.setItem("isAuthenticated", "true");
            setIsAuthenticated(true);
            navigate("/");  // Redirect to homepage
        } else {
            alert("Invalid credentials! Try again.");
        }
    };

    return (
        <div className='welcome'>
            <h2>WELCOME TO BOOKHAVEN - AN ONLINE BOOK STORE</h2>
            <div className='login'>
                <h1>LOGIN</h1>
                <div className='input'>
                    <form autoComplete='off' id='inputForm' onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            id="email" 
                            required
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            id="pass" 
                            required
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" id="loginBtn">LOGIN</button>
                    </form>
                </div>

                <div className="line-container">
                    <hr className="line" />
                </div>

                <p className="text">Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
            <p className='cred'>Created by Ibtesam Hussain 😊</p>
        </div>
    );
}

export { LoginDiv };
