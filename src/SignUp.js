import './SignUp.css';
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'; 


function SignUpDiv(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const navigate = useNavigate();

    const userRegister = () => {
        if (!email || !pass || !rePass) {
            alert('Fill All Required Inputs!');
        } else if (pass !== rePass) {
            alert('Passwords do not match!');
        } else {
            alert('User Registered Successfully');
            navigate("/login"); // Redirect to login after signup
        }
    };

    return (
        <div className='signup'>
            <h1>SIGN UP</h1>
            <div className='input'>
                <form autoComplete='off' id='inputForm'>
                    <input type="email" placeholder="Enter Email" id="email" onChange={(e) => setEmail(e.target.value)} required></input>
                    <input type="password" placeholder="Enter Password" id="pass" onChange={(e) => setPass(e.target.value)} required></input>
                    <input type="password" placeholder="Enter Password Again" id="RePass" onChange={(e) => setRePass(e.target.value)} required></input>
                </form>
            </div>

            <div className="line-container">
                <hr className="line"></hr>
            </div>
            <p className="text">Already have an account? <Link to="/login">Sign In</Link></p>

            <div className="SignUpButton">
                <button id="SignUpBtn" onClick={userRegister}>REGISTER</button>
            </div>
        </div>
    );
}


export {SignUpDiv};