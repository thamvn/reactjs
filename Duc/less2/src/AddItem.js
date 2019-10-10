import React from 'react'
class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isdec: false,
            name: '',
            price: '',
            image: '',
            file: null,
            imagePreviewUrl: null,
            listProd: Object.values({ ...this.props.listProd }),
            sortList: Object.values({ ...this.props.listProd })
        }
        this.fieldChange = this.fieldChange.bind(this);
        this.upload = this.upload.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.sortList = this.sortList.bind(this);
        this.back = this.back.bind(this);
    }
    fieldChange(e) {
        // var 
        e.target.name === "prodName" ? this.setState({ name: e.target.value }) : this.setState({ price: e.target.value })

    }
    upload() {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(this.state.file)
    }
    sortList() {
        var tmp = this.state.sortList;
        this.state.isdec ? tmp.sort(function (a, b) { return b.price - a.price }) : tmp.sort(function (a, b) { return a.price - b.price });
        this.setState({ isdec: !this.state.isdec })
        this.setState({ sortList: tmp })
    }
    saveProduct() {
        var newListProd = this.state.listProd;
        var newPro = {};
        newPro.name = this.state.name;
        newPro.price = this.state.price;
        newPro.imagePreviewUrl = this.state.imagePreviewUrl;
        newListProd.push(newPro);
        this.props.newProd(newListProd);
        var newList = this.props.listItems;
        newList.push(newPro);
        this.props.newList(newList);
        this.props.history.push('/items');
    }
    back() {
        this.props.history.push('/items');
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>List products...</h1>
                </div>
                <div className="col-md-12">
                    <table className="cart-table text-right">
                        <thead>
                            <th>Item name</th>
                            <th>
                                Item Price
                                <input type="button" value="Sort" onClick={this.sortList}></input>
                            </th>
                            <th>Image</th>
                        </thead>
                        <tbody>
                            {this.state.sortList.map((prod, idx) =>
                                <tr>
                                    <td>{prod.name}</td>
                                    <td>{prod.price}</td>
                                    <td><img src={prod.imagePreviewUrl} style={{ height: "150px", width: "300px" }} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-12">
                    <h1>Add new product...</h1>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Type product name</label>
                        <input type="text" name="prodName" value={this.state.name} onChange={e => this.fieldChange(e)}></input>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Type price</label>
                        <input type="text" name="price" value={this.state.price} onChange={e => this.fieldChange(e)}></input>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="form-group">
                                <label>Pick a picture</label>
                                <input type='text' name='image' value={this.state.image}></input>
                                <input type='file' onChange={(e) => {
                                    this.setState({ image: e.target.files[0].name })
                                    this.setState({ file: e.target.files[0] }, () => this.upload())

                                }} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <img src={this.state.imagePreviewUrl} style={{ height: "300px", width: "500px" }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Save" onClick={this.saveProduct}></input>
                        <input type="button" value="Back" onClick={this.back}></input>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddItem