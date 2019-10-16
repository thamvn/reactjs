import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { handleReq } from '../helper/index';
class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }

        this.onCheckOut = this.onCheckOut.bind(this);
        this.onProductAddOrRemove = this.onProductAddOrRemove.bind(this);
    }

    componentDidMount() {
        let productFromStore;
        let cart = JSON.parse(window.localStorage.getItem('carts')) || [];
        handleReq.getProducts().then(res => {
            console.log("res: " + JSON.stringify(res));
            productFromStore = res.data.products;
            cart.forEach(element => {
                try {
                    for (var i = 0; i < productFromStore.length; i++) {
                        if (productFromStore[i].isAdded) continue;
                        else productFromStore[i].id === element.id ? productFromStore[i].isAdded = true : productFromStore[i].isAdded = false;
                    }
                } finally { }
            });
            this.setState({ products: productFromStore });

        }).catch(err => {
            console.log("err: " + err)
        })

    }

    onProductAddOrRemove(e) {
        const { value } = e.target;
        let carts = JSON.parse(window.localStorage.getItem('carts')) || [];
        const updateList = (isAdded) => {
            let copyProducts = this.state.products;
            try {
                copyProducts.find(p => { return p.id == value }).isAdded = isAdded;
            } finally {
                this.setState({ products: copyProducts })
            }
        }

        if (carts.findIndex(item => { return item.id == value }) >= 0) {
            let newCart = [];
            for (let i = 0; i < carts.length; i++) {
                if (carts[i].id != value) {
                    newCart.push(carts[i]);
                }
            }
            window.localStorage.setItem('carts', JSON.stringify(newCart));
            updateList(false);
            alert('Item is removed from cart.');
        } else {
            const prod = this.state.products.find(p => { return p.id == value });
            if (prod) {
                prod.isAdded = true;
                carts.push(prod)
                window.localStorage.setItem('carts', JSON.stringify(carts));
                updateList(true);
                alert('Item is added to cart');
            } else alert('Item does not exist');
        }
    }

    onCheckOut() {
        this.props.history.push('cart');
    }

    render() {
        const mapProduct = this.state.products.map(prod =>
            <ProductCard product={prod} onProductClick={this.onProductAddOrRemove} {...this.props} />
        )

        return (
            <div>
                <h1>Demo Store</h1>
                <h3>Products</h3>
                <button onClick={this.onCheckOut}>Checkout</button> &nbsp;&nbsp;&nbsp;
                <button onClick={() => { this.props.history.push('/product') }}>New Product</button>
                <div className="product-list">
                    {mapProduct}
                </div>
            </div>
        )
    }
}

export default Products