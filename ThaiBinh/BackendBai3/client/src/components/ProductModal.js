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
        image:null,
        imageURL:'',
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
    onImageChange=(e)=>{
        let image=e.target.files[0]
        let imageURL=URL.createObjectURL(image)
        this.setState({
            image:image,
            imageURL:imageURL
        })
    }
    clearText=()=>{
        this.setState({
            name:'',
            price:'',
            image:null,
            imageURL:'',
            nameErr:'',
            priceErr:'',
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const newProduct={
          
            name:this.state.name,
            price:this.state.price,
            image:this.state.image
        };
        
        //Add product via productActions
        this.props.addProduct(newProduct).then(product=>{window.location.reload()});

        //Close modal
        this.toggle()
        this.clearText()
        // window.location.reload()
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
                                 
                                
                               
                            </FormGroup>
                            <FormGroup>
                                <Label for="Price">Price</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="price"
                                    placeholder="Enter price"
                                    onChange={this.onChangePrice}
                                />
                                {this.state.priceErr ? <Alert color="danger">{this.state.priceErr}</Alert> : null}
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Product Image</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    placeholder="Upload image"
                                    onChange={this.onImageChange}
                                />
                                <img style={{ width: "70%", height: "70%" }} src={this.state.imageURL} alt="" />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="dark"
                                    style={{ marginTop: "2rem" }}
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
