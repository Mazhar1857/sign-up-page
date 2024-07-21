import React, { useEffect, useState } from 'react'
import './SignUpPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { otpAction } from '../store/otp';
import { accInfoAction } from '../store/accInfoSlice';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
    const navigate = useNavigate();
    const loginCredentials = useSelector(state => state.loginCredentials);
    const dispatch = useDispatch();
    const [errorKey, setErrorKey] = useState(false);
    const [accInfo, setAccInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [infoError, setInfoError] = useState({
        username: true,
        email: true,
        password: true
    })

    const emailValidation = (email) => {

        let count = 0;

        for (let i = 0; i < email.length; i++) {
            if (email.charAt(i) === '@') {
                count++;
            }
        }

        if (count !== 1) {
            return 'please enter valid email';
        }

        const emailPart = email.split('@');
        const emailId = emailPart[0];
        const domain = emailPart[1];

        if (emailId === '' || domain === '') {
            return 'please enter valid email';
        }

        if (emailId !== '') {

            for (let i = 0; i < emailId.length; i++) {
                const char = emailId.charAt(i);
                if (i === 0 && (!isNaN(char) || ['.', '!', '#', '$', '%', '&', "'", '*', '+', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~', '-'].includes(char))) {
                    return 'please enter valid email';
                } else if (char === ' ') {
                    return 'remove extra spaces'
                }
            }
        }

        if (domain !== '') {

            if (domain.indexOf('.') === -1) {
                return 'please enter valid email';
            }

        }

        if (Object.keys(loginCredentials).includes(email)) {
            return 'Email id already exist';
        }

        return true;
    }

    const nameVlidation = (name) => {
        if (name.trim() === '') {
            return 'please enter username'
        }

        let parts = name.split(' ');
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].length === 0) {
                return 'please remove extra spaces';
            }
            for (let j = 0; j < parts[i].length; j++) {
                let charCode = parts[i].charCodeAt(j);
                if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) {
                    return 'please enter valid username';
                }
            }
        }
        return true;
    }

    const passwordValidation = (password) => {
        if (password.trim() === '') {
            return 'please enter password'
        }

        if (password.length < 8) {
            return 'minimum length should be 8'
        }
        return true
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setAccInfo((pre) => {
            return { ...pre, [name]: value }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorKey(true);

        if (emailValidation(accInfo.email) === true && nameVlidation(accInfo.username) === true && passwordValidation(accInfo.password) === true) {

            dispatch(accInfoAction.setAccInfo(accInfo));
            const arr = [];
            for (let i = 0; i < 8; i++) {
                arr.push(Math.floor((Math.random() * 9) + 1));
            }
            dispatch(otpAction.setOtp(Number(arr.join(''))));

            navigate('/verification');
        }
    }

    useEffect(() => {
        if (errorKey) {
            setInfoError((pre) => {
                return {
                    username: nameVlidation(accInfo.username),
                    email: emailValidation(accInfo.email),
                    password: passwordValidation(accInfo.password)
                }

            })
        }

        setErrorKey(false);
    })

    const handleLoginBtn = () => {
        navigate('/login')
    }

    useEffect(() => {
        alert(` Dummy username and password \n email: 'mazhar@gmail.com' \n password: '123456789' \n ------------- \n email: 'ali@gmail.com' \n password: '987654321' \n ------------- \n you can checkout github readme for Dummy username and password`)
    }, [])

    return (
        <div className='sign-up'>
            <h1>Create your account</h1>
            <form action="">
                <div>
                    <label htmlFor="user-name">Name</label>
                    <input type="text" id='user-name' name='username' value={accInfo.username} placeholder='Enter' onChange={handleChange} />
                    <div className={infoError.username === true ? 'valid' : 'invalid'}>{infoError.username}</div>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' placeholder='Enter' name='email' value={accInfo.email} onChange={handleChange} />
                    <div className={infoError.email === true ? 'valid' : 'invalid'}>{infoError.email}</div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' value={accInfo.password} placeholder='Enter' onChange={handleChange} />
                    <div className={infoError.password === true ? 'valid' : 'invalid'}>{infoError.password}</div>
                </div>

                <button onClick={handleSubmit}>CREATE ACCOUNT</button>
            </form>

            <p>Have an Account? <span onClick={handleLoginBtn}>LOGIN</span></p>

        </div>
    )
}

export default SignUpPage
