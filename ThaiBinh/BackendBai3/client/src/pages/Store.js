import React, { Component } from 'react'
import StoreNavBar from '../components/StoreNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import store from '../store';
import {
    Container, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Spinner

} from 'reactstrap'
import { connect } from 'react-redux';
import { getProducts, addToCart, getProductById } from '../actions/productActions';
import { getUserCart } from '../actions/cartActions'
import { loadUser } from '../actions/authActions'
import { cartService } from '../services/cart.service'
import uuid from 'uuid'
class Store extends Component {
    state = {
        cart: [],
        user: null
    }

    componentDidMount() {
        
        this.props.getProducts();
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
    addToCart = (id) => {
        let auth = this.props.auth
        let items = this.props.products.products;
        let product = [...items.filter(product => product._id === id)]
        if (auth.isAuthenticated) {
            let productAddToCart = {
                _id: uuid.v4(),
                name: product[0].name,
                price: product[0].price,
                productId:product[0]._id,
                userId: auth.user._id
            }
            this.props.addToCart(productAddToCart)
            this.props.getUserCart(auth.user._id).then(action => {
               if(action)
               this.setState({
                   cart:action.payload
               })
            })
        }
        else {
            let productAddToCart = {
                _id: uuid.v4(),
                name: product[0].name,
                price: product[0].price,
                quantity:1,
                productId:product[0]._id
            }
            cartService.addToLocalCart(productAddToCart)
            let cart = cartService.getLocalCart()
            this.setState({
                cart: cart
            })

        }



    }

    render() {
        const { products } = this.props.products;
        
        let isLoading = this.props.products.loading;


        let auth = this.props.auth
        let role = ''
        if (auth.user) {
            role = auth.user.role
        } else {
            role = 'guest'
        }

        return (

            <Provider store={store}>
                <div>
                    <StoreNavBar role={role} cartNum={this.state.cart.length} />

                    <Container style={{ marginTop: "5%" }} >
                        {isLoading ? <Spinner color="primary" /> : ""}
                        {products.map(({ _id, name, price }) => (
                            <Card key={_id} style={{ width: "30%", marginRight: "2%", float: "left", marginTop: "30px", textAlign: "center", backgroundColor: "#ebebe0" }}>
                                <CardImg top width="100%" src="https://i1.wp.com/media.boingboing.net/wp-content/uploads/2019/08/Screenshot-2019-08-30-14.02.17.jpg?w=1441&ssl=1" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle><h3>{name}</h3></CardTitle>
                                    <CardSubtitle><h3>{price}</h3></CardSubtitle>

                                    <Button onClick={this.addToCart.bind(this, _id)} style={{ backgroundColor: "#007bff", borderColor: "#007bff" }} className="btn btn-primary">
                                        Add To Cart
                                </Button>

                                </CardBody>
                            </Card>

                        ))}
                    </Container>
                </div>


            </Provider>
        )
    }
}
const mapStatetoProps = (state) => ({
    products: state.products,

    cart: state.cart,
    auth: state.auth
})
export default connect(mapStatetoProps, {
    getProducts, loadUser, addToCart, getUserCart, getProductById
})(Store)
