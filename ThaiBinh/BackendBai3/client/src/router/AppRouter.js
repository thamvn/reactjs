import React, { Component } from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import App from '../App'
import EditProduct from '../pages/EditProduct'
import Store from '../pages/Store'
import Cart from '../pages/Cart'

export default class AppRouter extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route exact path="/" component={Store} />
                    <Route path="/dashboard" component={App} />
                    <Route path='/edit/:id' component={EditProduct} />
                    <Route path="/cart" component={Cart} />
                   
                </Router>
            </div>
        )
    }
}