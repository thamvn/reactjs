import React, { Component } from 'react'
import StoreNavBar from '../components/StoreNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import store from '../store';
import '../App.css'
import {
    Container, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Spinner, FormGroup, Form, Input, Label
} from 'reactstrap'
import { connect } from 'react-redux';
import { getProducts, addToCart, getProductById, countProducts, getProductsByPage } from '../actions/productActions';
import { getUserCart, getProductInCartOfSpecificUser, editCart } from '../actions/cartActions'
import { loadUser } from '../actions/authActions'
import { cartService } from '../services/cart.service'
import { productService } from '../services/product.service'
import uuid from 'uuid'

class Store extends Component {
    state = {
        products: [],
        currentPage: '',
        cart: [],
        user: null,
        pagesNum: 5,
        productsPerPage: '',
        productsNum: '',


    }

    componentDidMount() {
        let ininitalPage = parseInt(this.props.match.params.page);
        let productsPerPage = productService.getProductsPerPageFromLocal()

        this.props.getProductsByPage(ininitalPage ? ininitalPage : 1, productsPerPage ? productsPerPage : 3).then(products => {
            this.setState({
                currentPage: ininitalPage ? ininitalPage : 1,
                productsPerPage: productsPerPage ? productsPerPage : 3,
                products: products.payload
            })
        });

        this.props.countProducts().then(num => this.setState({
            productsNum: num.payload
        }))
        this.props.loadUser().then(action => {

            if (action) {
                this.setState({
                    user: action.payload
                })

                this.props.getUserCart(action.payload._id).then(cart => {
                    if (cart)
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
    getTotalPages = () => {
        
        let productsNum = this.state.productsNum;
        let productsPerPage = this.state.productsPerPage
        let totalPages = Math.ceil(productsNum / productsPerPage)
        let pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(i + 1)
        }
        return pages
    }
    componentDidUpdate(prevProps, prevState) {

        let user = this.state.user

        if (prevState.user !== user) {
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
        let currentPage = this.state.currentPage
        let productsPerPage = this.state.productsPerPage

        if (currentPage) {

            if (prevState.currentPage !== currentPage || prevState.productsPerPage !== productsPerPage) {
                this.props.getProductsByPage(currentPage, productsPerPage).then(products => {
                    this.setState({
                        products: products.payload
                    })
                });
            }
        }

    }
    getNumCart = (cart) => {
        let cartNum = 0;
        for (let i = 0; i < cart.length; i++) {

            cartNum += cart[i].quantity
        }
        return cartNum
    }

    addToCart = (id) => {
        let auth = this.props.auth
        let items = this.state.products
        let product = [...items.filter(product => product._id === id)]
        if (auth.isAuthenticated) {
            this.props.getProductInCartOfSpecificUser(auth.user._id, product[0]._id)
                .then(action => {
                    if (action.payload) {

                        action.payload.quantity++;
                        this.props.editCart(action.payload)
                        this.props.getUserCart(auth.user._id).then(action => {
                            if (action)
                                this.setState({
                                    cart: action.payload
                                })
                        })
                    } else {

                        let productAddToCart = {
                            name: product[0].name,
                            price: product[0].price,
                            productId: product[0]._id,
                            userId: auth.user._id
                        }
                        this.props.addToCart(productAddToCart)
                        this.props.getUserCart(auth.user._id).then(action => {
                            if (action)
                                this.setState({
                                    cart: action.payload
                                })
                        })
                    }
                }).catch(err => console.log(err))

        }
        else {
            let itemInLocal = cartService.findProductInLocalCart(id)
            if (itemInLocal) {
                itemInLocal.quantity++
                cartService.editQuantityLocalCart(itemInLocal)
                let cart = cartService.getLocalCart()

                this.setState({
                    cart: cart
                })
            } else {
                let productAddToCart = {
                    _id: uuid.v4(),
                    name: product[0].name,
                    price: product[0].price,
                    quantity: 1,
                    productId: product[0]._id
                }


                cartService.addToLocalCart(productAddToCart)
                let cart = cartService.getLocalCart()
                this.setState({
                    cart: cart
                })
            }
        }

    }
    onPageChange = (page) => {

        this.setState({
            currentPage: page
        })
        this.props.history.push(`/store/${page}`)
    }
    onProductsPerPageChange = (e) => {
        let currentPage = this.props.match.params.page

        let productsPerPage = Number(e.target.value)
        productService.setProductsPerPageToLocal(productsPerPage)
        this.setState({
            productsPerPage: productsPerPage,
            currentPage: currentPage ? currentPage : 1
        })

    }
    render() {
        let isLoading = this.props.products.loading;
        let pages = this.getTotalPages();
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
                    <StoreNavBar role={role} cartNum={this.getNumCart(this.state.cart)} />

                    <Container style={{ marginTop: "5%", width: "100%", height: "700px" }} >
                        {isLoading ? <Spinner color="primary" /> : ""}
                        <Form style={{ width: "20%" }}>

                            <FormGroup>
                                <Label for="productPerPage">
                                    Product per page
                                </Label>
                                <Input value={this.state.productsPerPage || 3} type="select" name="productPerPage" onChange={this.onProductsPerPageChange}>
                                    <option value="1">1</option>
                                    <option value="3">3</option>
                                    <option value="6">6</option>
                                    <option value="9">9</option>

                                </Input>
                            </FormGroup>
                        </Form>
                        {this.state.products.length > 0 ? this.state.products.map(({ _id, name, price, productImg }) => (
                            <Card key={_id} style={{ width: "30%", marginRight: "2%", float: "left", marginTop: "30px", textAlign: "center", backgroundColor: "#ebebe0" }}>

                                <CardImg top width="100%" src={`../../../${productImg}`} style={{ height: "200px", objectFit: "cover" }} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle><h3>{name}</h3></CardTitle>
                                    <CardSubtitle><h3>{price}</h3></CardSubtitle>

                                    <Button onClick={this.addToCart.bind(this, _id)} style={{ backgroundColor: "#007bff", borderColor: "#007bff" }} className="btn btn-primary">
                                        Add To Cart
                                </Button>

                                </CardBody>
                            </Card>

                        )) : null}


                    </Container>

                    <Container  >
                        <ul style={{ marginLeft: "360px" }} className="pagination">
                            <li>
                                <button
                                    disabled={this.state.currentPage === 1 ? true : false}
                                    onClick={() => this.onPageChange(1)}>
                                    First
                                    </button>

                            </li>
                            <li>
                                <button
                                    disabled={this.state.currentPage === 1 ? true : false}
                                    onClick={() => this.onPageChange(this.state.currentPage - 1)}>
                                    Prev
                                    </button>
                            </li>
                            {pages.map((page, index) => (

                                <li key={index}>
                                    <button
                                        className={page === (Number(this.props.match.params.page)?Number(this.props.match.params.page):this.state.currentPage)? "active" : ""}
                                        onClick={() => this.onPageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))
                            }
                            <li>
                                <button
                                    disabled={this.state.currentPage === pages.length ? true : false}
                                    onClick={() => this.onPageChange(this.state.currentPage + 1)}>
                                    Next
                                    </button>
                            </li>
                            <li>
                                <button 
                                    disabled={this.state.currentPage === pages.length ? true : false}
                                    onClick={() => this.onPageChange(pages.length)}  >
                                    Last
                                    </button>

                            </li>
                        </ul>
                        
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
    getProducts, getProductsByPage, loadUser, addToCart, getUserCart, getProductById, getProductInCartOfSpecificUser, editCart, countProducts
})(Store)
