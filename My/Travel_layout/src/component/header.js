import React, { Component } from 'react';
import Cart from '../image/icon/cart.png';
class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <h1>Mrittika<span className="dot">.</span></h1>
                    </div>
                    <ul className="menu">
                        <li><a href="#">HOME</a></li>
                        <li><a href="#">ABOUT US</a></li>
                        <li><a href="#">FALACITIES</a></li>
                        <li><a href="#">CONTACT US</a></li>
                    </ul>
                    <ul className="menu">
                        <div><img src={Cart} alt="#" /><a href="#">CART</a></div>
                    </ul>
                </nav>
                <div className="intro">
                    <div className="content">
                        <div className="content-medium">
                            MRITTIKA'S BEACH HOUSE
                        </div>
                        <div className="content-large">
                            Dare to Live the Life
                            You've Always Wanted.
                        </div>
                        <div className="content-normal">
                            Twenty years from now you will be more disappointed by the things that you didn't do than by the
                            ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in
                            your sails.
                        </div>
                    </div>
                    <div className="scroll-bar">
                        <div className="number">01</div>
                        <div className="scroll-bar-height">
                            <div className="bar" />
                            <div>
                                <div className="circle" />
                            </div>
                            <div className="bar" />
                        </div>
                        <div className="scroll-button">
                            <div><button><i className="fa fa-chevron-up" /></button></div>
                            <div><button><i className="fa fa-chevron-down" /></button></div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;