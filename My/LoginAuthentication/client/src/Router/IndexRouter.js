import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import Home from '../page/Home';
import Cart from '../page/Cart';
import login from '../page/login'
class IndexRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={login} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/cart" component={Cart} />
                </div>
            </Router>
        );
    }
}

export default IndexRouter;