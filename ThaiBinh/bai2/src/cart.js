import React from 'react';
import './App.css';

class Product extends React.Component {
    render() {
        return (
            <div className="Wrap">
                <div className="Product-wrap">
                    <h3>name: {this.props.name} </h3>
                    <p>price: {this.props.price}</p>
                    <p>color: {this.props.color}</p>
                </div>
            </div>
        )
    }
}
class Cart extends React.Component{
    constructor(props){
        let products=JSON.parse(localStorage.getItem("products"));
        let arr=products.list
        let cart={list:[,],totalPrice:0};
        for(let i=0;i<arr.length;i++){
            if(products.list[i].isClicked===true){
                cart.list.push(products.list[i])
                cart.totalPrice=products.totalPrice
            }
        }
        super(props);
        this.state = {
            
            listBuy: cart.list,
            totalPrice: cart.totalPrice,
        }
    }
    render(){
        return(
            <div>
               
                {this.state.listBuy.map((e,i) => <Product
                    key={e.name} 
                    name={e.name} 
                    price={e.price} 
                    color={e.color}
                />)}
                <div><h2>Total Price:{this.state.totalPrice} </h2></div>
                <div><h2><a href="/"> Back to store!</a></h2></div>
            </div>
        )
    }
}
export default Cart;