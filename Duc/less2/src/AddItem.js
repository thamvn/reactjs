import React from 'react'
import EditProd from './EditProd'
import { validate } from './helper/index'
class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            isPaging: false,
            isdec: false,
            searchItem: '',
            name: '',
            price: '',
            image: '',
            file: null,
            imagePreviewUrl: null,
            thumbnail: null,
            listProd: Object.values({ ...this.props.listProd }),
            sortList: Object.values({ ...this.props.listProd }),
            next: 0,
            previous: 0,
            listPage: [],
            page: 1,
            isEdit: false,
            nameError: '',
            priceError: ''
        }
        this.fieldChange = this.fieldChange.bind(this);
        this.upload = this.upload.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.sortList = this.sortList.bind(this);
        this.back = this.back.bind(this);
        this.search = this.search.bind(this);
        this.paging = this.paging.bind(this);
        this.toPage = this.toPage.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.updateChange = this.updateChange.bind(this);
    }
    componentDidMount() {
        this.paging(this.state.listProd);
        // this.toPage(this.state.page);
    }
    updateChange(newList) {
        this.setState({ listPro: newList });
        this.paging(this.state.listProd);
        console.log("i am in page: " + this.state.page + " -next is: " + this.state.next + " -previous is: " + this.state.previous);
        // this.toPage(this.state.page);
    }
    fieldChange(e) {
        if (e.target.name === "prodName") {
            this.setState({ name: e.target.value })
        }
        else if (e.target.name === "price") {
            this.setState({ price: e.target.value })
        }
        else {
            this.setState({ searchItem: e.target.value })
        }

    }
    upload(callback) {
        let reader = new FileReader();
        reader.onloadend = () => {
            console.log("base64: " + reader.result);
            this.setState({ imagePreviewUrl: reader.result })
            var img = new Image();
            img.onload = function () {
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');
                canvas.width = canvas.height = 300;
                ctx.drawImage(
                    img,
                    0, 0,
                    300, 150
                );
                callback(canvas.toDataURL())
            };
            img.src = reader.result;
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
        var isValidName = validate.validateName(this.state.name);
        var isValidPrice = validate.validatePrice(this.state.price);
        console.log("Name check: " + JSON.stringify(isValidName))
        console.log("Price check: " + JSON.stringify(isValidPrice))
        if (!isValidName.error && !isValidPrice.error) {
            var newListProd = this.state.listProd;
            var newPro = {};
            newPro.name = this.state.name;
            newPro.price = this.state.price;
            newPro.imagePreviewUrl = this.state.imagePreviewUrl;
            newPro.thumbnail = this.state.thumbnail;
            newListProd.push(newPro);
            this.props.newProd(newListProd);
            var newList = this.props.listItems;
            newList.push(newPro);
            this.props.newList(newList);
            alert("Save successfully");
            this.props.history.push('/items');
        }
        else {
            if (isValidName.error) this.setState({ nameError: isValidName.message })
            if (isValidPrice.error) this.setState({ priceError: isValidPrice.message })
        }
    }
    search() {
        var list = this.state.listProd;
        var searchList = []
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].name.indexOf(this.state.searchItem) >= 0 || list[i].price.indexOf(this.state.searchItem) >= 0) searchList.push(list[i]);
            }
            this.setState({ sortList: searchList })
        }
    }
    paging(pageListed) {
        var idx = pageListed.length % 4 === 0 ? pageListed.length / 4 : parseInt(pageListed.length / 4) + 1;
        var list = pageListed;
        var listPage = [];
        list.map(item => item.isEdit = false);
        for (var i = 0; i < idx; i++) {
            var page = [];
            if (list[i * 4] !== undefined) page.push(list[i * 4]);
            if (list[i * 4 + 1] !== undefined) page.push(list[i * 4 + 1]);
            if (list[i * 4 + 2] !== undefined) page.push(list[i * 4 + 2]);
            if (list[i * 4 + 3] !== undefined) page.push(list[i * 4 + 3]);
            listPage.push(page);
        }
        this.setState({ listPage: listPage }, () => {
            this.setState({ pageNum: idx }, () => {
                var previous = idx - 1;
                this.state.page === 1 ? this.setState({ next: 2 }) : this.setState({ next: parseInt(this.state.page) + 1 });
                this.state.page === idx ? this.setState({ previous: parseInt(this.state.page) - 1 }) : this.setState({ previous: previous })
            });
            this.toPage(this.state.page);
        })
    }
    toPage(page) {
        if (!this.state.listPage[this.state.page - 1]) {
            this.setState({ page: page - 1 }, () => {
                this.setState({ sortList: this.state.listPage[this.state.page - 2] });
            });
        }
        else this.setState({ page: page }, () => {
            this.setState({ sortList: this.state.listPage[this.state.page - 1] });
        });
        var index = parseInt(page), next, previous;
        if (index >= this.state.next && index > 1 && index < this.state.previous) {
            next = index + 1;
            this.setState({ next: next })
        }
        else if (index === this.state.next - 1 && index > 1) {
            next = index;
            this.setState({ next: next })
        }
        else if (index <= this.state.previous && index < this.state.pageNum && index > this.state.next) {
            previous = index - 1;
            this.setState({ previous: previous })
        }
        else if (index === this.state.previous + 1 && index < this.state.pageNum) {
            previous = index;
            this.setState({ previous: previous })
        }
    }

    edit(prod, e) {

    }

    delete(prod, e) {
        var listPro = this.state.listProd, index = listPro.indexOf(prod);
        console.log("index: " + index);
        if (index >= 0) {
            listPro.splice(index, 1);
            this.props.newProd(listPro);
            alert("Delete successfully.")
            this.updateChange(listPro)
        }
    }

    back() {
        this.props.history.push('/items');
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>List products</h1>
                    <input type="text" value={this.state.searchItem} name="Search" onChange={this.fieldChange}></input>
                    <input type="button" onClick={this.search} value="Search"></input>
                </div>
                <div className="col-md-12">
                    <table className="table text-right">
                        <thead>
                            <th scope="col">Item name</th>
                            <th scope="col">
                                Item Price
                                <input type="button" value="Sort" onClick={this.sortList}></input>
                            </th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </thead>
                        <tbody>
                            {this.state.sortList === undefined ? alert("No product...") : this.state.sortList.map((prod, idx) =>
                                <tr>
                                    <td>
                                        <input type="text" value={prod.name} disabled="true"></input>
                                    </td>
                                    <td><input type="text" value={prod.price} disabled="true"></input>
                                    </td>
                                    <td><img src={prod.thumbnail} /></td>
                                    <td>
                                        <div className="form-group">
                                            <input type="button" value="Edit" onClick={e => this.edit(e)}></input>
                                            <input type="button" value="Delete" onClick={e => this.delete(prod, e)}></input>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <div className="row">
                        <div>
                            {this.state.page !== '' ? <h6>Showing from {this.state.page * 4 - 3} to {this.state.page * 4 > this.state.listProd.length ? this.state.listProd.length : this.state.page * 4} of {this.state.listProd.length} </h6> : <h6> </h6>}
                        </div>
                        {/* <input type="button" onClick={this.paging} value="Paging"></input> */}
                        {this.state.listPage.map((el, idx) =>
                            <div>
                                {(idx + 1 === parseInt(this.state.next) - 1) || (idx + 1 === parseInt(this.state.next)) || (idx + 1 === parseInt(this.state.previous)) || (idx + 1 === parseInt(this.state.previous) + 1) ? <input type='button' onClick={e => this.toPage(e.target.value)} value={idx + 1}></input> : <h6>-</h6>}
                            </div>
                        )}
                    </div>

                </div>
                <div className="col-md-12">
                    <h1>Add new product...</h1>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Type product name</label>
                        <input type="text" name="prodName" value={this.state.name} onChange={e => this.fieldChange(e)}></input>
                        {this.state.nameError !== '' ? <h6 className="text-danger">{this.state.nameError}</h6> : <h6> </h6>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Type price</label>
                        <input type="text" name="price" value={this.state.price} onChange={e => this.fieldChange(e)}></input>
                        {this.state.priceError !== '' ? <h6 className="text-danger">{this.state.priceError}</h6> : <h6> </h6>}
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
                                    this.setState({ file: e.target.files[0] }, () => this.upload((canvas) => {
                                        this.setState({ thumbnail: canvas })
                                    }))

                                }} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <img src={this.state.imagePreviewUrl} style={{ height: "300px", width: "500" }} />
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