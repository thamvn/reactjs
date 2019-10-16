import React from 'react';
import { handleReq } from '../helper/index'
class ProductHandle extends React.Component {
    constructor() {
        super();
        this.state = {
            product: {},
            file: null
        }
        this.onDeleteProduct = this.onDeleteProduct.bind(this);
        this.onEditProduct = this.onEditProduct.bind(this);
        this.onFieldChannge = this.onFieldChannge.bind(this);
        this.onImageSelected = this.onImageSelected.bind(this);
    }
    componentDidMount() {
        handleReq.getProductById(this.props.match.params.id).then(res => {
            if (res.data.product) {
                console.log("product: " + res.data.product)
                this.setState({ product: res.data.product })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    onEditProduct(e) {
        let editProduct = this.state.product;
        editProduct.productImage = document.getElementById('imgPreview').src;
        let product = new FormData();
        product.append("productImage", this.state.file);
        product.append("prod_name", editProduct.prod_name);
        product.append("price", editProduct.price);
        for (var p of product) {
            console.log(p);
        }
        handleReq.updateProduct(product, editProduct.id).then(res => {
            this.props.history.push('/');
        }).catch(err => {
            alert(err)
        })

        alert('Product is updated');
    }

    onDeleteProduct(e) {
        handleReq.delProduct(this.state.product.id).then(res => {
            console.log("res: " + JSON.stringify(res));
            alert("Product is deleted");
            this.props.history.push('/');
        }).catch(err => {
            console.log("err: " + err)
        })
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
                <h3>Handle Product</h3>
                <a href='#/'>Continue Shopping?</a>
                <table>
                    <tbody>
                        <tr>
                            <td>Product Name:</td>
                            <td>
                                <input type="text" value={this.state.product.prod_name} name="prod_name" onChange={this.onFieldChannge} />
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
                                <img id="imgPreview" src={this.state.product.image} style={{ width: "400px" }} />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><button onClick={this.onDeleteProduct}>Delete Product</button></td>
                            <td><button onClick={this.onEditProduct}>Edit Product</button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default ProductHandle