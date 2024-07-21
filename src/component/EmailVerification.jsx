import React, { useEffect, useRef, useState } from "react";
import './EmailVerification.css'
import { useDispatch, useSelector } from "react-redux";
import { loginCredentialsAction } from "../store/LoginCredentialsSlice";
import { useNavigate } from "react-router-dom";
import { profileInfoAction } from "../store/profileInfoSlice";

const EmailVerification = () => {
    const info = useSelector(state => state.info);
    const genOtp = useSelector(state => state.otp);
    const credential = useSelector(state => state.loginCredentials);
    const profileInfo = useSelector(state => state.profiles);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOpt] = useState(Array(8).fill(''));
    const inputRef = useRef([0])
    const [error, setError] = useState(true);

    const handleOtp = (e, ind) => {

        const newOtp = [...otp];
        newOtp[ind] = e.target.value;
        setOpt(newOtp);

        if (e.target.value && ind < inputRef.current.length - 1) {
            inputRef.current[ind + 1].focus();
        }
    }

    const handleKeyDown = (e, ind) => {

        if (e.key === 'Backspace' && ind > 0 && !otp[ind]) {
            inputRef.current[ind - 1].focus();
        }
    }

    const email = (info.email.slice(0, 3) + '***' + info.email.slice(info.email.indexOf('@')));

    const handleSubmit = () => {
        if (Number(otp.join('')) === genOtp) {
            setError(true);
            dispatch(loginCredentialsAction.setCredential(info));
            dispatch(profileInfoAction.setProfile({ [info.email]: { checkedCategory: [] } }));
            navigate('/login')
        } else {
            setError(false);
        }
    }

    return (
        <div className="email-verification">
            <h1>Verify your email</h1>
            <p>Enter the 8 digit code you have received on {email}</p>

            <div>
                <p>code</p>
                <div className="input">
                    {otp.map((num, ind) => {
                        return <input key={ind} type="text" maxLength='1' value={num} onChange={(e) => handleOtp(e, ind)} ref={(e) => inputRef.current[ind] = e} onKeyDown={(e) => { handleKeyDown(e, ind) }} />
                    })}
                </div>
                <div className={error ? 'valid' : 'invalid'}>{error ? '' : 'enter correct otp'}</div>
            </div>
            <button onClick={handleSubmit}>VERIFY</button>
            <div className="gen-otp">OTP: {genOtp}</div>
        </div>
    )
}

export default EmailVerification;