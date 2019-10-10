import React from 'react';
import {productService,cartService} from './services/index';

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            cart:[],
            
        };
        this.checkout = this.checkout.bind(this);
        this.pick = this.pick.bind(this)
        this.remove = this.remove.bind(this);
        // this.refresh = this.refresh.bind(this);
        this.add = this.add.bind(this);
    
      }
      componentDidMount(){
        let newItems = productService.getProducts();
        let newCart = cartService.getCart();
        this.setState({items: newItems});
        console.log("items" + this.state.items);
        this.setState({cart: newCart});
        console.log("cart" + this.state.cart);
      }
      
      checkout(){
        let listItems = this.state.items;
        let listCart = this.state.cart;
        if (listItems !== [])
        {
          window.localStorage.setItem('items', JSON.stringify(listItems));
        }
        if (listCart !== [])
        {
          window.localStorage.setItem('cart', JSON.stringify(listCart));
        }
        this.props.history.push("/checkout");
      }
      pick(item,e){
        let newCart = this.state.cart;
        let newItems = this.state.items;
        newCart.push(item);
        newItems.splice(newItems.indexOf(item),1);
        this.setState({item: newItems, cart: newCart})
        
        
      }
      remove(item,e){
        let newCart = this.state.cart;
        let newItems = this.state.items;
        newItems.push(item);
        newCart.splice(newCart.indexOf(item),1);
        this.setState({item: newItems, cart: newCart})
      }

      add(){
          this.props.history.push("/add");
      }
      render(){
        
        return (
          <div>
                    <h2>SHOP</h2>
                    <div className="row">
                        {this.state.items.map(item =>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">Item: {item.name}</h3>
                                        <h3 className="card-text">Price: {item.price}</h3>
                                        <button onClick={e => this.pick(item, e)} >Add</button>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <h2>CART</h2>
                    <div className="row">
                        {this.state.cart.map(item =>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">Item: {item.name}</h3>
                                        <h3 className="card-text">Price: {item.price}</h3>
                                        <button onClick={e => this.remove(item, e)} >Remove</button>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={e => this.checkout()}>Checkout</button>
                    </div>
                    <div>
                        <button onClick={e => this.add()}>Add new item</button>
                    </div>
                    
                </div>
        );
      }
}

export default Products;