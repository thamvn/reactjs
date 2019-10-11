import React, {Component} from 'react';
import {cartService} from '../services/index';
import {commonConstants} from '../common/index';

export default class Cart extends Component{
    constructor(props){
        super(props);

        this.state = {
            cart: cartService.getCart()
        }
    }

    render(){
        return(
            <div className="container">
                <h1>Demo Store</h1>
                <h3>Cart Details</h3>
                <a href='#/'>Continue Shopping?</a>
                <table className="cart-table">
                    <thead>
                        <th>No.</th>
                        <th>Item Image</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                    </thead>
                    <tbody>
                        {this.state.cart.length==0&&<tr>
                            <td colSpan="3">No item in cart</td>
                        </tr>}
                        {this.state.cart.map((item, idx) => 
                            <tr>
                                <td>{idx+1}</td>
                                <td><img src={item.productImage||commonConstants.defaultProductImg} /></td>
                                <td>{item.name}</td>
                                <td>$ {item.price}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">
                                Total
                            </td>
                            <td>$ {this.state.cart.map(item => {return item.price}).reduce((a,b) => a + b, 0 )}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}