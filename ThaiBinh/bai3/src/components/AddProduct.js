import React, { Component } from 'react'
import { productService } from '../services/Product.service'
export default class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            price: "",
            nameErr:"",
            priceErr:"",
        }
    }
    clearText=()=>{
        this.setState({
            name:"",
            price:"",
            nameErr:"",
            priceErr:"",
        })
    }
    onChangeName = (e) => {
        
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
    onChangePrice = (e) => {
        let priceItem=e.target.value
        let regexPrice = /^[0-9]{0,10}$/;
        if(regexPrice.test(priceItem)===false){
            this.setState({priceErr:"You have to fill in the number and min=1, max= 10 character in the price field",price:priceItem})
        }else
        this.setState({
            price: priceItem,
            priceErr:""
        })
    }
    onSubmit = (e) => {
        
        e.preventDefault();
        let newProduct=this.state;
        if(newProduct.name.length<=10 && newProduct.price.length<=10 && newProduct.name.charAt(0).toUpperCase()===newProduct.name.charAt(0) ){
        productService.newProduct(newProduct);
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
