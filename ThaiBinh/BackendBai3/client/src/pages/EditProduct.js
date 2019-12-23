import React, { Component } from 'react'
import {Container,Breadcrumb,BreadcrumbItem, Col, Button, Form, FormGroup, Label, Input,Alert
} from 'reactstrap';
import AppNavBar from '../components/AppNavBar'

import {getProducts,getProductById,editProduct} from '../actions/productActions'
import { connect } from 'react-redux';
class EditProduct extends Component {
    constructor(props){
        super(props)
        this.state={
            _id:0,
            name:"",
            price:"",
            msg:'',
            msgSuccess:''
        }
    }
    componentDidMount(){
        let id=(this.props.match.params.id)
        this.props.getProductById(id).then(action=>
            {
               this.setState({
                   _id:action.payload._id,
                   name:action.payload.name,
                   price:action.payload.price,
               })
            }
        ).catch(err=>console.log(err))
        
        
    }
    
    onChangeName=(e)=>{
        let name=e.target.value
        let regexName = /[A-Z][a-z,0-9," "]{0,10}$/;
        if (!regexName.test(name)) {
            this.setState({ nameErr: "The first letter of the name field must be text and Uppercase and it's min=1 cha,max=10 cha", name: name })
        } else {
            this.setState({
                nameErr: '',
                name: name
            })
        }


    }
    onChangePrice=(e)=>{
        let price=e.target.value;
        let regexPrice = /^[0-9]{0,10}$/;
        if (!regexPrice.test(price)) {
            this.setState({ priceErr: "You have to fill in the number and min=1, max= 10 character in the price field", price: price })
        } else {
            this.setState({
                price: price,
                priceErr: ""
            })
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        let editedProduct = this.state;
        let id=(this.props.match.params.id)
        editedProduct.price=Number(editedProduct.price)
        editedProduct._id=id;

        this.props.editProduct(editedProduct).then(product=>{
            if(product){
                this.setState({
                    msgSuccess:'Edit successfully'
                })
            }
        }).catch(err=>console.log(err))
           
            
        
    }
   
    render() {
      
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
                {this.state.msg? <Alert color="danger">{this.state.msg}</Alert>:null}
                {this.state.msgSuccess? <Alert color="success">{this.state.msgSuccess}</Alert>:null}
                    <FormGroup row>
                        <Label for="productName" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="name" value={this.state.name||""} onChange={this.onChangeName} required id="productName"  />
                            {this.state.nameErr? <Alert color="danger">{this.state.nameErr}</Alert>:null}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="productPrice" sm={2}>Price</Label>
                        <Col sm={10}>
                            <Input type="text" name="price" value={this.state.price||""}  onChange={this.onChangePrice}  required id="productPrice"  />
                            {this.state.priceErr? <Alert color="danger">{this.state.priceErr}</Alert>:null}
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
