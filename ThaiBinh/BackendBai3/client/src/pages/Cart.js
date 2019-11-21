import React, { Component } from 'react'
import { Table, Container, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import StoreNavBar from '../components/StoreNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from '../store';
import { getCart,editCart,removeFromCart } from '../actions/cartActions'
import { connect } from 'react-redux';
import {loadUser} from '../actions/authActions'
class Cart extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
        this.props.getCart();

    }
    getTotalPrice = (cart) => {
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price*cart[i].quantity
        }
        return totalPrice
    }
    
    onClickPlus = (id) => {
        let cartItems = this.props.cart
        let product=cartItems.cart.filter(product=>product._id===id)
        product[0].quantity++;
        this.props.editCart(product[0])
        this.forceUpdate()
        
        

    }
    onClickMinus = (id) => {
        let cartItems = this.props.cart
        let product=cartItems.cart.filter(product=>product._id===id)
        if(product[0].quantity>1){
            product[0].quantity--
            this.forceUpdate()
            
        }
        else{
            product[0].quantity--
            this.props.removeFromCart(id)
            this.forceUpdate()
        }
        
        
    }
    render() {
        const { cart } = this.props.cart;
        
        return (
            <Provider store={store}>
                <StoreNavBar cartNum={cart.length} />
                
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
                                <th style={{ textAlign: "center" }} colSpan="2">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(({ _id, name, price,quantity }) => (
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
                                </tr>

                            ))}



                        </tbody>


                    </Table>
                    <h3 style={{ float: "right", marginRight: "11%" }}>Total<span style={{ marginLeft: "20%" }}>
                        {
                            this.getTotalPrice(cart)
                        }
                    </span></h3>
                </Container>
            </Provider>
        )
    }
}
const mapStatetoProps = (state) => ({
    cart: state.cart
})
export default connect(mapStatetoProps, {
    getCart,editCart,removeFromCart
})(Cart)

