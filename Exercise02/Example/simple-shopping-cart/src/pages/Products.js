import React, {Component} from 'react';
import ProductCard from '../components/ProductCard';
import {productService, cartService} from '../services/index';

class Products extends Component{
    constructor(props){
        super(props);

        this.state = {
            products: []
        }
        
        this.onCheckOut = this.onCheckOut.bind(this);
        this.onProductAddOrRemove = this.onProductAddOrRemove.bind(this);
    }

    componentDidMount(){
        let productFromStore = productService.getProducts();
        let cart = cartService.getCart();

        cart.forEach(element => {
            try{
                productFromStore.find(p => {return p.id === element.id}).isAdded = true;
            }finally{ }
        });
        this.setState({products: productFromStore});
    }

    onProductAddOrRemove(e){
        const {value} = e.target;
        const updateList = (isAdded) => {
            let copyProducts = this.state.products;
            try{                
                copyProducts.find(p => {return p.id == value}).isAdded = isAdded;
            }finally{
                this.setState({products: copyProducts})
            }
        }
        if(cartService.isExistInCart(value)){
            cartService.removeFormCart(value);            
            updateList(false);
            alert('Item is removed from cart.');
        }else{
            const prod = this.state.products.find(p => {return p.id == value});
            if(prod) {
                cartService.addToCart(prod);
                updateList(true);
                alert('Item is added to cart');
            } else alert('Item does not exist');
        }
    }

    onCheckOut(){
        this.props.history.push('cart');
    }

    render(){
        const mapProduct = this.state.products.map(prod => 
            <ProductCard product={prod} onProductClick={this.onProductAddOrRemove} />    
        )

        return(
            <div>
                <h1>Demo Store</h1>
                <h3>Products</h3>
                <button onClick={this.onCheckOut}>Checkout</button>
                <div className="product-list">
                    {mapProduct}
                </div>               
            </div>
        )
    }
}

export default Products