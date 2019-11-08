import React, { Component } from 'react'
import Product from './Product'
import { productService } from '../services/Product.service'
import { cartService } from '../services/Cart.service'
import '../App.css';



export default class ListProducts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            totalPrice: 0,
            cart: []
        }
    }
    componentDidMount() {
        let productItems = productService.getProducts();
        if (productItems == null)
            productItems = productService.setProductsToStore();
        let cartItems = cartService.getCart();
        if (cartItems.length > 0) {

            let newPrice = 0;
            for (let i = 0; i < cartItems.length; i++) {
                newPrice += cartItems[i].price
                this.setState({
                    list: productItems,

                    totalPrice: newPrice,
                    cart: cartItems
                })
            }
        } else {
            this.setState({
                list: productItems,
                totalPrice: 0,
                cart: cartItems
            })
        }

    }

    clickBuyButton(i) {

        let items = this.state.list;

        if (!items[i].isClicked) {
            items[i].isClicked = true;


            this.setState({
                list: items,
                totalPrice: this.state.totalPrice + this.state.list[i].price
            })

            cartService.addToCart(items[i]);
            productService.setProductsToLocalStorage(items);



        } else {
            items[i].isClicked = false;
            this.setState({
                list: items,
                totalPrice: this.state.totalPrice - this.state.list[i].price
            })

            cartService.removeFromCart(items[i].id)
            productService.setProductsToLocalStorage(items);
        }

    }

    //Delete Product
    delProduct = (i) => {
        let items = this.state.list
        if (!items[i].isClicked) {
            let newProducts = productService.deleteProduct(items[i].id);

            this.setState({
                list: newProducts
            })
            productService.setProductsToLocalStorage(newProducts);
        } else {
            alert("You must remove item from cart before deleting")
        }

    }
   //go To Edit
   goToEdit=(i)=>{
       let items=this.state.list
       let editId=items[i].id;
       if(items[i].isClicked){
        alert("You must remove item from cart before editing")
       }else
        this.props.history.push(`/edit/${editId}`)
   }
    render() {
        
        return (
            <div>
            <div>
                <div>
                    {this.state.list.map((e, i) => <Product
                        key={e.id}
                        isClicked={e.isClicked}
                        name={e.name}
                        price={e.price}
                        handleClick={() => this.clickBuyButton(i)}
                        delProduct={() => this.delProduct(i)}
                        goToEdit={()=>this.goToEdit(i)}
                         />)}

                </div>
            </div>
            <h2>Total Price: {this.state.totalPrice}</h2>
                    <h2><a href="/cart">Checkout</a></h2>
            </div>
        )
    }
}


