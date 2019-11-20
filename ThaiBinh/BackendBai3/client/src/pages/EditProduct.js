import React, { Component } from 'react'
import {Container,Breadcrumb,BreadcrumbItem, Col, Button, Form, FormGroup, Label, Input,} from 'reactstrap';
import AppNavBar from '../components/AppNavBar'

import {getProducts,getProductById,editProduct} from '../actions/productActions'
import { connect } from 'react-redux';
class EditProduct extends Component {
    constructor(props){
        super(props)
        this.state={
            _id:0,
            name:"",
            price:""
        }
    }
    componentDidMount(){
        let id=(this.props.match.params.id)
        this.props.getProductById(id)
    }
   
    onChangeName=(e)=>{
        this.setState({
            name:e.target.value
        })


    }
    onChangePrice=(e)=>{
        this.setState({
            price:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        let editedProduct = this.state;
        let id=(this.props.match.params.id)
        editedProduct.price=Number(editedProduct.price)
        editedProduct._id=id;

        this.props.editProduct(editedProduct)
           
            
        
    }
   
    render() {
        const product=this.props.product.products
        console.log(product)
        return (
           
            <div>
                <AppNavBar/>
                <Container>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                        <BreadcrumbItem>EditProduct</BreadcrumbItem>
                        <BreadcrumbItem>{this.props.match.params.id}</BreadcrumbItem>
                    </Breadcrumb>
                </Container>
                <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label for="productName" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="name" value={this.state.name||""} onChange={this.onChangeName} required id="productName"  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="productPrice" sm={2}>Price</Label>
                        <Col sm={10}>
                            <Input type="text" name="price" value={this.state.price||""}  onChange={this.onChangePrice}  required id="productPrice"  />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button size="md" color="primary">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <a href='/dashboard'><h5 style={{marginTop:"10%"}} >Back To Dashboard</h5></a>
                </Container>
            </div>
            
        )
    }
}
const mapStatetoProps=(state)=>({
    product:state.products
})

export default connect(mapStatetoProps,
    {getProductById,getProducts,
    editProduct
    })(EditProduct)
