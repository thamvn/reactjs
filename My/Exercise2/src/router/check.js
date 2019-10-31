import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import Garage from '../component/Shop.js';
import Cart from '../component/Cart.js';
class Check extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Garage} />
                    <Route exact path="/cart" component={Cart} />
                </div>
            </Router>
        );
    }
}

export default Check;