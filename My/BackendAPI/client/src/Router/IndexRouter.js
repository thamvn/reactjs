import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import Home from '../page/Home';
import Cart from '../page/Cart';
class IndexRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/cart" component={Cart} />
                </div>
            </Router>
        );
    }
}

export default IndexRouter;