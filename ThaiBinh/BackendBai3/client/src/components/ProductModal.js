import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,Form,FormGroup,Label,Input
} from 'reactstrap'
import {connect} from 'react-redux';
import {addProduct } from '../actions/productActions'

class ProductModal extends Component {
    state={
        modal:false,
        name:''
    }
    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
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
        const newProduct={
          
            name:this.state.name,
            price:this.state.price
        };
        console.log("add")
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
                                 <Label for="Price">Price</Label>
                                <Input
                                type="text"
                                name="name"
                                id="price"
                                placeholder="Enter price"
                                onChange={this.onChangePrice}
                                />
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
