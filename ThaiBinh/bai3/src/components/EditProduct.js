import React, { Component } from 'react'
import {productService} from '../services/Product.service'


export default class EditProduct extends Component {
    constructor(props){
        super(props)
        this.state={
            id:0,
            name: "",
            price: "",
            nameErr:"",
            priceErr:"",
        }
    }
    componentDidMount(){
        let productId =parseInt(this.props.match.params.productId);
        let product=productService.getProductById(productId);
        this.setState({
            id:product.id,
            name:product.name,
            price:product.price,
        })
        
    }
    onChangeName=(e)=>{
         
        let nameItem=e.target.value
        
        let regexName=/[A-Z][a-z,0-9," "]{0,10}$/;
        if(regexName.test(nameItem)===false){
            this.setState({nameErr:"The first letter of the name field must be text and Uppercase and it's min=1 cha,max=10 cha",name:nameItem})
        }else
        this.setState({
            name: nameItem,
            nameErr:""

        })

    }
    clearText=()=>{
        this.setState({
            name:"",
            price:"",
            nameErr:"",
            priceErr:"",
        })
    }
    onChangePrice = (e) => {
        let priceItem=e.target.value
        let regexPrice = /^[1-9][0-9]{0,10}$/;
        if(regexPrice.test(priceItem)===false){
            this.setState({priceErr:"Begin of price field can't equal 0,maximum character=10",price:priceItem})
        }else
        this.setState({
            price: priceItem,
            priceErr:""
        })
    }
    onSubmit = (e) => {
        
        e.preventDefault();
        let editedProduct =this.state;
        
        if(editedProduct.name.length<=10 && editedProduct.price.length<=10 && editedProduct.name.charAt(0).toUpperCase()===editedProduct.name.charAt(0) ){
        productService.editProduct(editedProduct);
        alert("Successful!")
        }else{
            alert("please check your inputs")
        }

    }

    render() {
        
       
           
        return (
            <form onSubmit={this.onSubmit}>
                <input required style={{ width: "50%", padding: "10px" }} type="text" name="productName"
                    value={this.state.name} placeholder="Enter Product's Name...." onChange={this.onChangeName} />
                <p style={{color:"red"}}>{this.state.nameErr}</p>
                <input required style={{ width: "50%", padding: "10px" }} type="text" value={this.state.price||""} name="price"
                    placeholder="Enter Product's  Price" onChange={this.onChangePrice} />
                    <p style={{color:"red"}}>{this.state.priceErr}</p>
                <div>
                    <input type="submit" value="Submit" className="btn" />
                    <button type="button" onClick={this.clearText}> ClearText </button>
                </div>
                <div>
                    <a href="/">Back to store</a>
                </div>

            </form>
        )
        
        
       
    }
}
