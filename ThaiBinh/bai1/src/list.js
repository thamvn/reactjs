import React from 'react';
import './App.css';

let products = [{
    id: 1,
    disable:false,
    name: "Product 1",
    price: 2000,
    color:"red"
},
{
    id: 2,
    disable:false,
    name: "Product 2",
    price: 3000,
    color:"blue",
}]


localStorage.setItem("products", JSON.stringify(products));
class Product extends React.Component {
    render() {
        return (
            <div className="Wrap">
                <div className="Product-wrap">
                    <h3>name: {this.props.name} </h3>
                    <p>price: {this.props.price}</p>
                    <p>color: {this.props.color}</p>
                    <button onClick={this.props.handleClick} disabled={this.props.disable}  className="Buy" type="button">Buy!</button>
                </div>
            </div>
        )
    }
}
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            list: JSON.parse(localStorage.getItem("products")),
            totalPrice: 0,
            
            
        }
        console.log(JSON.parse(localStorage.getItem("products")));
        console.log(this.state.list)
    }
    
    clickBuyButton(i){
        
      let item=this.state.list
      item[i].disable=true
        
        this.setState({
            list: item,
            totalPrice:this.state.totalPrice+this.state.list[i].price
           
        })
        

    }
    render() {
        
        return (
            <div>{this.state.list.map((e, i) => (<Product key={e.name} disable={e.disable} name={e.name} price={e.price} color={e.color} handleClick={() => {
                this.clickBuyButton(i)
            }} />))}
            <div><h2>Total Price: {this.state.totalPrice}</h2></div>
            </div>
        )
    }
}
export default List;