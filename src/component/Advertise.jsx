import React from 'react'
import './Advertise.css'
import leftArrow from '../assets/icons/left-arrow.png'
import rightArrow from '../assets/icons/right-arrow.png'
const Advertise = () => {
    return (
        <div className='advertise'>
            <img src={leftArrow} alt="" />
            <p>Get 10% off on business sign up</p>
            <img src={rightArrow} alt="" />
        </div>
    )
}

export default Advertise
