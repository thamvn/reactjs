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

class Store extends Component {
    componentDidMount(){
        
        this.props.getProducts();
    }
    addToCart=(id)=>{
        
       let items=this.props.products.products;
      
       let product=[...items.filter(product =>product._id===id)]
     
       this.props.addToCart(product[0])
    }
    render() {
        const {products}=this.props.products;
       
        let isLoading=this.props.products.loading;
        
        
        return (
            
            <Provider store={store}>
                <div>
                    <StoreNavBar />
                    <Container>
                       
                    {isLoading?<Spinner color="primary"  />:""}
                    {products.map(({_id,name,price})=>(
                        <Card key={_id} style={{width:"30%",marginRight:"2%",float:"left",marginTop:"30px",textAlign:"center"}}>
                            <CardImg top width="100%" src="https://miro.medium.com/max/785/1*H-25KB7EbSHjv70HXrdl6w.png" alt="Card image cap" />
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
    cart:state.cart
})
export default connect(mapStatetoProps,{getProducts,addToCart,getProductById
    })(Store)
