import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="subscribe">
                    <div className="subscribe-title">
                        Subscribe<br /> to Our Newsletter
                    </div>
                    <div className="subscribe-form">
                        <input type="text" className placeholder="jhondoe@gmail.com" />
                        <button><span>Subscribe<span /></span></button>
                    </div>
                </div>
                <div className="menu-footer">
                    <div className="logo">
                        <h1>Mrittika<span className="dot">.</span></h1>
                    </div>
                    <ul className="menu">
                        <li><a href="#">HOME</a></li>
                        <li><a href="#">ABOUT US</a></li>
                        <li><a href="#">FALACITIES</a></li>
                        <li><a href="#">CONTACT US</a></li>
                    </ul>
                    <div className="icon-social">
                        <i className="fa fa-facebook-f" />
                        <i className="fa fa-twitter" />
                        <i className="fa fa-instagram" />
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;