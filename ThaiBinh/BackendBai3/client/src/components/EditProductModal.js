import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,Form,FormGroup,Label,Input
} from 'reactstrap'
import {connect} from 'react-redux';
import {editProduct } from '../actions/productActions'

class EditProductModal extends Component {
    state={
        modal:false,
        name:''
    }
    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
    }
    
    render() {
        return (
            <div>
                <Button
                color="primary"
                style={{marginBottom:'2rem'}}
                onClick={this.toggle}
                >Edit Product</Button>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>EditProduct</ModalHeader>
                    <ModalBody>
                       <Form onSubmit={this.props.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter name"
                                value={this.props.name}
                                onChange={this.props.onChangeName}
                                />
                                 <Label for="Price">Price</Label>
                                <Input
                                type="text"
                                name="name"
                                id="price"
                                value={this.props.price}
                                placeholder="Enter price"
                                onChange={this.props.onChangePrice}
                                />
                                <Button
                                color="primary"
                                style={{marginTop:"2rem"}}
                                >Edit Item</Button>
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
export default connect(mapStateToProps,{editProduct})(EditProductModal)
