import React from 'react';
var converter = require('number-to-words');

class CheckOutPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart: JSON.parse(localStorage.getItem('cart'))

        }
        this.sumPrice = this.sumPrice.bind(this);
        this.back = this.back.bind(this);
    }
    sumPrice(){
        let total = 0;
        let cart = this.state.cart;
        if (cart === []) { alert("Chua mua gi!!")}
        else
        {
            for (let i = 0; i < cart.length ; i++)
            {
                total += parseInt(cart[i].price);
            }
        }
        return total;
    }
    back(){
        this.props.history.push("/");
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="box-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {this.state.cart.map(item =>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            
                                        </tr>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-12">
                    <h3>Total: {this.sumPrice() + "$"}</h3>
                    <h4> {converter.toWords(this.sumPrice())+ " dollars"}</h4>
                </div>
                <div className="col-md-12">
                    <button onClick={this.back}>Back</button>
                </div>
            </div>
        )
    }
}
export default CheckOutPage