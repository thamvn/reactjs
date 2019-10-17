import React, { Component } from 'react';
import configDefault from '../configDefault'
import { funCommon } from '../helper/index'
export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: []
        }
        this.add = this.add.bind(this);
        this.minus = this.minus.bind(this);
    }

    componentDidMount() {
        var carts = JSON.parse(window.localStorage.getItem('carts'));
        if (carts !== null) {
            carts.forEach(element => {
                if (element.numberItem === undefined) element.numberItem = 1;
            })
            this.setState({ cart: carts })
        }
    }
    add(item, e) {
        var newCart = funCommon.add(this.state.cart, item)
        this.setState({ cart: newCart })
        window.localStorage.setItem('carts', JSON.stringify(newCart))
    }
    minus(item, e) {
        var newCart = funCommon.minus(this.state.cart, item)
        this.setState({ cart: newCart })
        window.localStorage.setItem('carts', JSON.stringify(newCart))
    }
    render() {
        return (
            <div className="container">
                <h1>Demo Store</h1>
                <h3>Cart Details</h3>
                <a href='#/'>Continue Shopping?</a>
                <table className="cart-table">
                    <thead>
                        <th>No.</th>
                        <th>Item Image</th>
                        <th>Item Name</th>
                        <th>Inc/Dec</th>
                        <th>Item Price</th>
                        <th>Amount</th>
                    </thead>
                    <tbody>
                        {this.state.cart.length == 0 && <tr>
                            <td colSpan="3">No item in cart</td>
                        </tr>}
                        {this.state.cart.map((item, idx) =>
                            <tr>
                                <td>{idx + 1}</td>
                                <td><img src={item.image || configDefault.defaultImage} /></td>
                                <td>{item.prod_name}</td>
                                <td> Number Item: {item.numberItem} <button onClick={e => this.add(item, e)}>+</button> <button onClick={e => this.minus(item, e)}>-</button></td>
                                <td>$ {item.price}</td>
                                <td>$ {item.price * item.numberItem}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">
                                Total
                            </td>
                            <td>$ {this.state.cart.map(item => { return item.price * item.numberItem }).reduce((a, b) => a + b, 0)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}