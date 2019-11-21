import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,Form,FormGroup,Label,Input,Alert
} from 'reactstrap'
import {connect} from 'react-redux';
import {addProduct } from '../actions/productActions'

class ProductModal extends Component {
    state={
        modal:false,
        name:'',
        price:'',
        nameErr:'',
        priceErr:'',

    }
    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
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
        const newProduct={
          
            name:this.state.name,
            price:this.state.price
        };
        
        //Add product via productActions
        this.props.addProduct(newProduct);

        //Close modal
        this.toggle()
    }
    render() {
        return (
            <div>
                <Button
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={this.toggle}
                >Add Product</Button>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Shopping list</ModalHeader>
                    <ModalBody>
                       <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter name"
                                onChange={this.onChangeName}
                                />
                                {this.state.nameErr? <Alert color="danger">{this.state.nameErr}</Alert>:null}
                                 <Label for="Price">Price</Label>
                                <Input
                                type="text"
                                name="name"
                                id="price"
                                placeholder="Enter price"
                                onChange={this.onChangePrice}
                                />
                                {this.state.priceErr? <Alert color="danger">{this.state.priceErr}</Alert>:null}
                                <Button
                                color="dark"
                                style={{marginTop:"2rem"}}
                                >Add Item</Button>
                            </FormGroup>
                       </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps=state=>({
    product:state.product
})
export default connect(mapStateToProps,{addProduct})(ProductModal)
