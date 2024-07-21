import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loggedProfileAction } from '../store/loggedProfileSlice';

const LoginPage = () => {
    const credential = useSelector(state => state.loginCredentials)
    const dispatch = useDispatch();

    const [status, setStatus] = useState(true);
    const [privacy, setPrivacy] = useState('password');
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const emailValidation = (email) => {
        if (Object.keys(credential).includes(email)) {
            return true;
        } else {
            return false;
        }
    }

    const passwordValidation = (email, password) => {
        if (credential[email].password === password) {
            return true;
        } else {
            return false;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginInfo((pre) => {
            return { ...pre, [name]: value }
        })

    }

    const handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = loginInfo;
        if (emailValidation(email) && passwordValidation(email, password)) {
            setStatus(true);
            dispatch(loggedProfileAction.setLoggedProfile(email));
            navigate('/categories')
        } else {
            setStatus(false);
        }
    }

    const handlePrivacy = () => {
        setPrivacy((pre) => {
            return pre === 'password' ? 'text' : 'password';
        })
    }

    const handleSignInBtn = () => {
        navigate('/')
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <h2>Welcome back to ECOMMERCE</h2>
            <p>The next gen business marketplace</p>

            <form action="">
                <div>
                    <label htmlFor="email-2">Email</label>
                    <input type="text" id='email-2' name='email' value={loginInfo.email} onChange={handleChange} placeholder='Enter' />
                    <div className={status ? 'valid' : 'invalid'}>{status ? '' : 'invalid email and password'}</div>
                </div>
                <div>
                    <label htmlFor="password-2">Password</label>
                    <div className='password-field'>
                        <input type={privacy} id='password-2' name='password' value={loginInfo.password} onChange={handleChange} placeholder='Enter' />
                        <span onClick={handlePrivacy}>{privacy === 'password' ? 'Show' : 'Hide'}</span>
                    </div>
                    <div className={status ? 'valid' : 'invalid'}>{status ? '' : 'invalid email and password'}</div>
                </div>
                <button onClick={handleLogin}>LOGIN</button>
            </form>
            <div className='hr-line'></div>
            <p>Don't have an Account?<span onClick={handleSignInBtn}> SIGN UP</span></p>
        </div>
    )
}

export default LoginPage
