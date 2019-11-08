import React, { Component } from 'react'
import { cartService } from '../services/Cart.service'

import '../App.css';

class Product extends React.Component {
    render() {
        return (
            <div className="Wrap">
                <div className="Product-wrap">
                    <h3>name: {this.props.name} </h3>
                    <p>price: {this.props.price}</p>
                    <img className="img-default" src="https://miro.medium.com/max/785/1*H-25KB7EbSHjv70HXrdl6w.png" alt=""/>
                </div>
            </div>
        )
    }
}
export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            cart:[],
            totalPrice:0,
        }
    }
    componentDidMount(){
        let cartItems=cartService.getCart();
        console.log(cartItems)
        if (cartItems.length > 0) {
           console.log(1)
            let newPrice = 0;
            for (let i = 0; i < cartItems.length; i++) {
                newPrice += cartItems[i].price
                this.setState({
                    totalPrice: newPrice,
                    cart: cartItems
                })
            }
        }else{
            this.setState({
               
                totalPrice: 0,
                cart: cartItems
            })
        }
        this.setState({

        })
    }
    render() {
        return (
            <div>
                {this.state.cart.map(e=><Product key={e.id}
                name={e.name}
                price={e.price} />)}
                <h2>Total Price:{this.state.totalPrice}</h2>
                <h2><a href="/">Back to store</a></h2>
            </div>
        )
    }
}
