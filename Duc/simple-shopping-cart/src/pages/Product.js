import React, { Component } from 'react';
import { handleReq } from '../helper/index';


export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            imgReview: '',
            file: null
        }

        this.onAddProduct = this.onAddProduct.bind(this);
        this.onFieldChannge = this.onFieldChannge.bind(this);
        this.onImageSelected = this.onImageSelected.bind(this);
    }

    onAddProduct(e) {
        let newProduct = this.state.product;
        newProduct.productImage = document.getElementById('imgPreview').src;
        let product = new FormData();
        product.append("productImage", this.state.file);
        product.append("prod_name", newProduct.name);
        product.append("price", newProduct.price);
        for (var p of product) {
            console.log(p);
        }
        handleReq.addProduct(product).then(res => {
            alert(res)
        }).catch(err => {
            alert(err)
        })

        alert('Product is added');
    }

    onFieldChannge(e) {
        const { name, value } = e.target;
        this.setState({ product: { ...this.state.product, [name]: value } });
    }

    onImageSelected(e) {
        const imgFile = e.target.files[0];
        this.setState({ file: imgFile });
        let fileReader = new FileReader();
        let imgUrl;
        fileReader.onload = function () {
            imgUrl = fileReader.result;
            document.getElementById('imgPreview').src = imgUrl;
            console.log("base64: " + imgUrl)
        }
        fileReader.readAsDataURL(imgFile);
    }

    render() {
        return (
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
                        <tr>
                            <td>Product Image:</td>
                            <td>
                                <input type="file" name="productImage" onChange={this.onImageSelected} />
                            </td>
                        </tr>
                        <tr>
                            <td>Product Image Review:</td>
                            <td>
                                <img id="imgPreview" src={this.state.imgReview} style={{ width: "400px" }} />
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