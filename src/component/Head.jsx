import React from 'react'
import search from '../assets/icons/search.png';
import shoppingCart from '../assets/icons/shopping-cart.png';
import './Head.css'
const Head = () => {
    return (
        <header className='header'>
            <h1 className='logo'>ECOMMERCE</h1>
            <nav className='navigation'>
                <div>Categories</div>
                <div>Sale</div>
                <div>Clearance</div>
                <div>New stock</div>
                <div>Trending</div>
            </nav>
            <figure className='cart'>
                <img src={search} alt="" />
                <img src={shoppingCart} alt="" />
            </figure>
            <div>
                <div>Help</div>
                <div>Orders & Returns</div>
                <div>Hi, John</div>
            </div>
        </header>
    )
}

export default Head

