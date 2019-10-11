import React from 'react';
import {productService,cartService} from './services/index';
import Pagination from "react-js-pagination";
// import "bootstrap/less/bootstrap.less";

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            cart:[],
            activePage: 1,
            currentItems: []
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
        // console.log("items" + this.state.items);
        this.setState({cart: newCart});
        // console.log("cart" + this.state.cart);
        let newCurrentItems = [];
        for (let i= this.state.activePage*3; i< this.state.activePage*3+3; i++)
        {
          if (newItems[i] != null) newCurrentItems.push(newItems[i]);
            
        }
        console.log(`active page is ${this.state.activePage}`);
        this.setState({currentItems: newCurrentItems})
        // console.log(this.state.currentItems);
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
        let newCurrentItems = this.state.currentItems;
        newCart.push(item);
        newItems.splice(newItems.indexOf(item),1);
        newCurrentItems.splice(newCurrentItems.indexOf(item),1);
        this.setState({item: newItems, cart: newCart});
        this.setState({currentItems: newCurrentItems})

        
        
      }
      remove(item,e){
        let newCart = this.state.cart;
        let newItems = this.state.items;
        let newCurrentItems = this.state.currentItems;

        newItems.push(item);
        newCurrentItems.push(item);

        newCart.splice(newCart.indexOf(item),1);
        this.setState({item: newItems, cart: newCart});
        this.setState({currentItems: newCurrentItems})
        
      }

      add(){
          this.props.history.push("/add");
      }
      handlePageChange(pageNumber) {
        
        this.setState({activePage: pageNumber});
        let newItems = this.state.items;
        let newCurrentItems = [];
        for (let i= (pageNumber-1)*3; i< (pageNumber-1)*3+3; i++)
        {
          if (newItems[i] != null) newCurrentItems.push(newItems[i]);
            
        }
        console.log(`active page is ${this.state.activePage}`);
        this.setState({currentItems: newCurrentItems})
      }
      render(){
        for(let i =0; i <this.state.currentItems.length;i++ ){
          console.log("currentItems:" +this.state.currentItems[i].name);
        }
        
        return (
          
          <div>
                    <h2>SHOP</h2>
                    <div className="row">
                        {this.state.currentItems.map(item =>
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
                     <div>
                        <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={3}
                          totalItemsCount={this.state.items.length}
                          pageRangeDisplayed={3}
                          onChange={this.handlePageChange.bind(this)}
                        />
                      </div>   
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