import React, {Component} from 'react';
import ProductCard from '../components/ProductCard';

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
        let productFromStore = JSON.parse(window.localStorage.getItem('products'));
        let cart = JSON.parse(window.localStorage.getItem('cart'))||[];

        cart.forEach(element => {
            try{
                productFromStore.find(p => {return p.id === element.id}).isAdded = true;
            }finally{ }
        });
        this.setState({products: productFromStore});
    }

    onProductAddOrRemove(e){
        const {value} = e.target;
        let cart = JSON.parse(window.localStorage.getItem('cart'))||[];
        const updateList = (isAdded) => {
            let copyProducts = this.state.products;
            try{                
                copyProducts.find(p => {return p.id == value}).isAdded = isAdded;
            }finally{
                this.setState({products: copyProducts})
            }
        }

        if(cart.findIndex(item => { return item.id == value }) >= 0){
            let newCart = [];
            for(let i = 0; i < cart.length; i++){
                if(cart[i].id != value){
                    newCart.push(cart[i]);
                }
            }

            window.localStorage.setItem('carts', JSON.stringify(newCart));         
            updateList(false);
            alert('Item is removed from cart.');
        }else{
            const prod = this.state.products.find(p => {return p.id == value});
            if(prod) {                
                cart.push(prod)
                window.localStorage.setItem('cart', JSON.stringify(cart));
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
                <button onClick={this.onCheckOut}>Checkout</button> &nbsp;&nbsp;&nbsp;
                <button onClick={() => {this.props.history.push('/product')}}>New Product</button>
                <div className="product-list">
                    {mapProduct}
                </div>               
            </div>
        )
    }
}

export default Products