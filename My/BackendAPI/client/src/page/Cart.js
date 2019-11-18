import React, { Component } from 'react';
import Header from './../component/Header';
import Footer from './../component/Footer';
import MainCart from './../component/MainCart';
class Cart extends Component {
    render() {
        return (
            <div>
                <Header page={<MainCart />}/>
                <Footer/>
            </div>
        );
    }
}

export default Cart;