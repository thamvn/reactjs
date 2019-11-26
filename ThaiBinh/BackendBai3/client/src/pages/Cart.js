import React, { Component } from 'react'
import { Table, Container, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import StoreNavBar from '../components/StoreNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from '../store';
import { getUserCart,editCart,removeFromCart } from '../actions/cartActions'
import {addToCart} from '../actions/productActions'
import { connect } from 'react-redux';
import {loadUser} from '../actions/authActions'
import {cartService} from '../services/cart.service'
class Cart extends Component {
    state = {
        cart: [],
        user: null
    }
    componentDidMount() {
       
        this.props.loadUser().then(action => {

            if (action) {
                this.setState({
                    user:action.payload
                })
                
                this.props.getUserCart(action.payload._id).then(cart => {
                    if(cart)
                    this.setState(({
                        cart: cart.payload,
                       
                    }))
                });
            } else {
                let cart = cartService.getLocalCart();

                this.setState({
                    cart: cart
                })
                
            }

        })
        

    }
    componentDidUpdate(prevProps, prevState) {

        let user = this.state.user
        
        if (prevState.user !== user) {
            console.log('didupdate')

            let cart = cartService.getLocalCart()
            let userId = user._id
            for (let i = 0; i < cart.length; i++) {

                cart[i].userId = userId
            }
           
            localStorage.setItem('cart', JSON.stringify(cart))
            cart.forEach(element => {
                this.props.addToCart(element).then(

                    cart => {

                        localStorage.removeItem('cart')
                    }
                )
            });
        }
    }
    getTotalPrice = (cart) => {
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price*cart[i].quantity
        }
        return totalPrice
    }
    
    onClickPlus = (id) => {
        let auth=this.props.auth
        if(auth.isAuthenticated){
            let cartItems = this.props.cart
            let product = cartItems.cart.filter(product => product._id === id)
            product[0].quantity++;
            this.props.editCart(product[0])
            this.forceUpdate()
        }else{
            let cartItems=cartService.getLocalCart()
            
            let product=cartItems.filter(product => product._id === id)
            product[0].quantity++;
            cartItems=cartService.editQuantityLocalCart(product[0])
            this.setState({
                cart:cartItems
            })
            
        }
        
        
        

    }
    onClickMinus = (id) => {
        let auth = this.props.auth
        if (auth.isAuthenticated) {
            let cartItems = this.props.cart
            let product = cartItems.cart.filter(product => product._id === id)
            if (product[0].quantity > 1) {
                product[0].quantity--
                this.forceUpdate()

            }
            
        }else{
            let cartItems=cartService.getLocalCart()
            
            let product=cartItems.filter(product => product._id === id)
            if(product[0].quantity>1){
                product[0].quantity--;
                cartItems=cartService.editQuantityLocalCart(product[0])
                this.setState({
                    cart:cartItems
                })
            }
           
        }
        
        
        
    }
    onClickDelete=(id)=>{
        
       
        let auth = this.props.auth
        if(auth.isAuthenticated){
            
            this.props.removeFromCart(id).then(product=>{
                let cartItems=[...this.state.cart]
                cartItems=cartItems.filter(item=>item._id!==product.payload._id)
                this.setState({
                    cart:cartItems
                })
            })
            
        }else{
            let cartItems=cartService.getLocalCart();
            cartItems=cartService.removeFromLocalCart(id)
            this.setState({
                cart:cartItems
            })
            
        }
    }
    render() {
        
        return (
            <Provider store={store}>
                <StoreNavBar cartNum={this.state.cart.length} />
                
                <Container style={{marginTop:"7%"}}>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                        <BreadcrumbItem active>Cart</BreadcrumbItem>
                    </Breadcrumb>
                </Container>
                <Container style={{ marginTop: "2%" }}>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th style={{ textAlign: "center" }} colSpan="3"></th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.length>0?this.state.cart.map(({ _id, name, price,quantity }) => (
                                <tr key={_id}>
                                    <th scope="row">{quantity}</th>
                                    <td>{name}</td>
                                    <td>{price}</td>
                                    <td>
                                        <Button
                                            className="plus-btn"
                                            color="success"
                                            size="sm"
                                            onClick={this.onClickPlus.bind(this, _id)}
                                        >+
                                         </Button>
                                    </td>
                                    <td>

                                        <Button
                                            className="minus-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onClickMinus.bind(this, _id)}
                                        >-
                                        </Button>
                                    </td>
                                    <td>

                                        <Button
                                            className="delete-btn"
                                            color="secondary"
                                            size="sm"
                                            onClick={this.onClickDelete.bind(this, _id)}
                                        >x
                                        </Button>
                                    </td>
                                </tr>

                            )):null}



                        </tbody>


                    </Table>
                    <h3 style={{ float: "right", marginRight: "11%" }}>Total<span style={{ marginLeft: "20%" }}>
                        {
                            this.getTotalPrice(this.state.cart)
                        }
                    </span></h3>
                </Container>
            </Provider>
        )
    }
}
const mapStatetoProps = (state) => ({
    cart: state.cart,
    auth:state.auth
})
export default connect(mapStatetoProps, {
    getUserCart,editCart,removeFromCart,loadUser,addToCart
})(Cart)

