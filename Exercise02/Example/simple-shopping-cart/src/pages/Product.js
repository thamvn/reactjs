import React, {Component} from 'react';
import {productService} from '../services/index';

export default class Product extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            product: {}
        }

        this.onAddProduct = this.onAddProduct.bind(this);
        this.onFieldChannge = this.onFieldChannge.bind(this);
    }

    onAddProduct(){
        productService.newProduct(this.state.product);
        alert('Product is added');
    }

    onFieldChannge(e){
        const {name, value} = e.target;
        this.setState({product: {...this.state.product, [name]: value}});
    }

    render(){
        return(
            <div className="container">
            <h1>Demo Store</h1>
            <h3>Add Product</h3>
            <a href='#/'>Continue Shopping?</a>
            <table>
                <tbody>
                   <tr>
                       <td>Product Name:</td>
                       <td>
                           <input type="text" value={this.state.product.name} name="name" onChange={this.onFieldChannge} />
                       </td>
                   </tr>
                   <tr>
                       <td>Product Price:</td>
                       <td>
                           <input type="number" value={this.state.product.price} name="price" onChange={this.onFieldChannge} />
                       </td>
                   </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                        </td>
                        <td><button onClick={this.onAddProduct}>Add Product</button></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        )
    }
}