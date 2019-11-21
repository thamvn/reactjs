import React, { Component } from 'react'
import StoreNavBar from '../components/StoreNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import store from '../store';
import {
    Container, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button,Spinner
    
} from 'reactstrap'
import { connect } from 'react-redux';
import {getProducts,addToCart,getProductById} from '../actions/productActions';
import {getCart} from '../actions/cartActions'
import {loadUser} from '../actions/authActions'

class Store extends Component {
   
   
    componentDidMount(){
        this.props.loadUser();
        this.props.getProducts();
        this.props.getCart()
        this.setState({
            cart:JSON.parse(localStorage.getItem('cart'))
        })
       
    }
    // componentDidUpdate(prevProps,prevState){
    //     let cart=localStorage.getItem('cart')
    //     if(prevState.cart!==cart){
    //         this.setState({
    //             cart:cart
    //         })
    //     }
    // }
    addToCart=(id)=>{
        
        let items=this.props.products.products;
        let product=[...items.filter(product =>product._id===id)]
        this.props.addToCart(product[0])
        this.props.getCart()
        this.forceUpdate()
        // let auth=this.props.auth
        // if(auth.isAuthenticated){
        //    let productAddToCart={
        //         id:product[0]._id,
        //         name:product[0].name,
        //         price:product[0].price,
        //         userId:auth.user._id

        //     }
        //     this.props.addToCart(productAddToCart)
        //     this.props.getCart()
        //     this.forceUpdate()
            
        // }else{
        //     let productAddToCart={
        //         id:product[0]._id,
        //         name:product[0].name,
        //         price:product[0].price

        //     }
        //     this.props.addToCart(productAddToCart)
        //     this.props.getCart()
        //     this.forceUpdate()
        // }
       
        
       
    }
    
    render() {
        const {products}=this.props.products;
       
        let isLoading=this.props.products.loading;
        
        const {cart}=this.props.cart;
        
        return (
            
            <Provider store={store}>
                <div>
                    <StoreNavBar cartNum={cart.length} />
                    
                    <Container style={{marginTop:"5%"}} >
                    {isLoading?<Spinner color="primary"  />:""}
                    {products.map(({_id,name,price})=>(
                        <Card key={_id} style={{width:"30%",marginRight:"2%",float:"left",marginTop:"30px",textAlign:"center",backgroundColor:"#ebebe0"}}>
                            <CardImg top width="100%" src="https://i1.wp.com/media.boingboing.net/wp-content/uploads/2019/08/Screenshot-2019-08-30-14.02.17.jpg?w=1441&ssl=1" alt="Card image cap" />
                            <CardBody>
                                <CardTitle><h3>{name}</h3></CardTitle>
                                <CardSubtitle><h3>{price}</h3></CardSubtitle>
                                
                                <Button  onClick={this.addToCart.bind(this,_id)} style={{backgroundColor:"#007bff",borderColor:"#007bff"}}className="btn btn-primary">
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
const mapStatetoProps=(state)=>({
    products:state.products,
    product:state.product,
    cart:state.cart,
    auth:state.auth
})
export default connect(mapStatetoProps,{getProducts,loadUser,addToCart,getCart,getProductById
    })(Store)
