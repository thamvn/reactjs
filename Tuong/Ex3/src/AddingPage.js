import React from 'react';
import {productService} from './services/index';
// import axios from 'axios';
import AddNew from './pages/AddNew';
class AddingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items:[]
            
        };
        this.update = this.update.bind(this);
        this.sortName = this.sortName.bind(this);
        this.sortPrice = this.sortPrice.bind(this);
      }
    componentDidMount(){
    let newItems = productService.getProducts();
    // let newCart = cartService.getCart();
    this.setState({items: newItems});
    console.log("items" + this.state.items);
    // this.setState({cart: newCart});
    // console.log("cart" + this.state.cart);
    }
    update(newItems){
        this.setState({items: newItems})
    }

    sortName(e){
        let newItems = this.state.items;
        newItems.sort((a,b) => { return (a.name == b.name) ? 0 : ((a.name > b.name) ? 1 : -1 )})
        this.setState({items: newItems})
    }

    sortPrice(e){
        let newItems = this.state.items;
        newItems.sort( (a,b) => {return a.price - b.price});
        this.setState({items: newItems})
    }
    render() {
    

    return (
        <div>
        <div>
            <table class='table'>
                <thead>
                    
                    <th><button onClick={e => this.sortName()}>Item Name</button></th>
                    <th><button onClick={e => this.sortPrice()}>Item Price</button></th>
                    <th>Item Img</th>
                    
                </thead>
                <tbody>
                    {this.state.items.length == 0&& <tr>
                            <td colSpan="3">No more item</td>
                        </tr>}
                        {this.state.items.map(item =>
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td><img src={item.imagePreviewUrl} /></td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
        <div>
            <AddNew updateFunc ={this.update}></AddNew>
        </div>
        </div>
    )
    }
}
      
export default AddingPage;