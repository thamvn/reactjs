import React from 'react';
import './App.css';

let products = {
    list: [{
        id: 1,
        isClicked: false,
        name: "Product 1",
        price: 2000,
        color: "red"
    },
    {
        id: 2,
        isClicked: false,
        name: "Product 2",
        price: 3000,
        color: "blue",
    },
    ], totalPrice: 0
}

class Product extends React.Component {
    render() {
        return (
            <div className="Wrap">
                <div className="Product-wrap">
                    <h3>name: {this.props.name} </h3>
                    <p>price: {this.props.price}</p>
                    <p>color: {this.props.color}</p>
                    <button onClick={this.props.handleClick} className="Buy" type="button">{this.props.isClicked ? "remove from cart" : "add to cart"}</button>
                </div>
            </div>
        )
    }
}
class List extends React.Component {
    constructor(props) {
        let cartItems = JSON.parse(localStorage.getItem("products"));

        super(props);
        if (cartItems != null) {
            
            this.state = {
                list: cartItems.list,
                totalPrice: cartItems.totalPrice,
            }
        } else {
            
            this.state = {
                list: [{
                    id: 1,
                    isClicked: false,
                    name: "Product 1",
                    price: 2000,
                    color: "red"
                },
                {
                    id: 2,
                    isClicked: false,
                    name: "Product 2",
                    price: 3000,
                    color: "blue",
                }],
                totalPrice: 0
            }
        }
    }
    clickBuyButton(i) {
        let items = this.state.list

        if (items[i].isClicked === false) {
            items[i].isClicked = true;
            this.setState({
                list: items,
                totalPrice: this.state.totalPrice + this.state.list[i].price
            })
            products.list[i].isClicked = items[i].isClicked;
            localStorage.setItem("products", JSON.stringify(products))
        } else {
            items[i].isClicked = false;
            this.setState({
                list: items,
                totalPrice: this.state.totalPrice - this.state.list[i].price
            })
            products.list[i].isClicked = items[i].isClicked;
            localStorage.setItem("products", JSON.stringify(products))
        }
    }
    render() {
        return (
            <div>
               
                {this.state.list.map((e, i) => <Product
                    key={e.name}
                    isClicked={e.isClicked}
                    name={e.name} price={e.price}
                    color={e.color} handleClick={() => {this.clickBuyButton(i)}}
                 />)}
                {localStorage.setItem("products", JSON.stringify(this.state))}
                <div><h2>Total Price: {this.state.totalPrice}</h2></div>
                <div><h2><a href="/cart"> Checkout!</a></h2></div>
            </div>
        )
    }
}
export default List;