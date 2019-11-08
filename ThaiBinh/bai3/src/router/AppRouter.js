import React, { Component } from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Cart from '../components/Cart'
import ListProducts from '../components/ListProducts'
import AddProduct from '../components/AddProduct'
import EditProduct from '../components/EditProduct'


export default class AppRouter extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route exact path="/" component={ListProducts} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/add" component={AddProduct} />
                    <Route exact path="/edit/:productId" component={EditProduct} />
                    
                </Router>
            </div>
        )
    }
}
