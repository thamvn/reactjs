import React, {Component} from 'react';
import config from 'react-global-configuration';
// import configuration from '../../config';
export default class Cart extends Component{
    constructor(props){
        super(props);

        this.state = {
            cart: JSON.parse(window.localStorage.getItem('cart'))||[],
            // tempCart: []
        }
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }
    componentDidMount(){
        let cart = this.state.cart;
        cart.forEach(element => {
            if (element.count == null)
                element.count = 1;
        });
        console.log(cart);
        this.setState({cart:cart});
        window.localStorage.setItem('cart', JSON.stringify(cart));

    }
    increase(e){
        // console.log(e.target.value);
        let cart = this.state.cart;
        let item = cart.find(p => {return p.id == e.target.value});
        item.count +=1;
        this.setState({cart : cart})
       
            
        console.log(this.state.countList);
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    decrease(e){
        let cart = this.state.cart;
        let item = cart.find(p => {return p.id == e.target.value});
        
        item.count -= 1;
        if (item.count != 0){
            this.setState({cart : cart})
        }
        else {
            cart.splice(cart.indexOf(item),1);
            this.setState({cart : cart});
        }
        console.log(this.state.countList);
        window.localStorage.setItem('cart', JSON.stringify(cart));

    }
    render(){
        // config.set({defaultImg:'https://addons-media.operacdn.com/media/CACHE/images/themes/85/40485/1.0-rev1/images/a36e03a2-b5cf-42d4-8724-4dd8f816ba6b/c2dff71127a4dcad0a86331e4a1433f1.jpg'},
        //             { freeze: false }
        // );
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
                        <th>Actions</th>
                        <th>Count</th>
                        <th>Items Price</th>
                       
                    </thead>
                    <tbody>
                        {this.state.cart.length==0&&<tr>
                            <td colSpan="3">No item in cart</td>
                        </tr>}
                        {this.state.cart.map((item, idx) => 
                            <tr>
                                <td>{idx+1}</td>
                                <td><img src={item.productImage|| config.get('defaultImg')} /></td>
                                <td>{item.name}</td>
                                <td><button value={item.id} onClick={this.increase}>+</button> 
                                    <button value={item.id} onClick={this.decrease}>-</button></td>
                                <td> {this.state.cart.find(p => {return p.id == item.id}).count}</td>
                                <td>$ {item.price * this.state.cart.find(p => {return p.id == item.id}).count }</td>                                
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">
                                Total
                            </td>
                            <td>$ {this.state.cart.map(item => {return item.price * this.state.cart.find(p => {return p.id == item.id}).count}).reduce((a,b) => a + b, 0 )}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}