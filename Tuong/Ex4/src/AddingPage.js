import React from 'react';
import {productService} from './services/index';
// import axios from 'axios';
import AddNew from './pages/AddNew';
class AddingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            editClicked: [],
            editName: '',
            editPrice: '',
            editImg: '',
            editFile: ''
        };
        this.update = this.update.bind(this);
        this.sortName = this.sortName.bind(this);
        this.sortPrice = this.sortPrice.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this._handleSubmit= this._handleSubmit.bind(this);
        this._handleImageChange= this._handleImageChange.bind(this);
        this._itemNameHandleChange= this._itemNameHandleChange.bind(this);
        this._itemPriceHandleChange= this._itemPriceHandleChange.bind(this);
        this.back = this.back.bind(this);
        this.view = this.view.bind(this);
      }
    componentDidMount(){
    let newItems = productService.getProducts();
    // let newCart = cartService.getCart();
    this.setState({items: newItems});
    console.log("items" + this.state.items);
    // this.setState({cart: newCart});
    // console.log("cart" + this.state.cart);
    }
    update(newItems){
        this.setState({items: newItems})
    }

    sortName(e){
        let newItems = this.state.items;
        newItems.sort((a,b) => { return (a.name == b.name) ? 0 : ((a.name > b.name) ? 1 : -1 )})
        this.setState({items: newItems})
    }

    sortPrice(e){
        let newItems = this.state.items;
        newItems.sort( (a,b) => {return a.price - b.price});
        this.setState({items: newItems})
    }

    delete(item){
        productService.deleteProduct(item);
        let newItems = this.state.items;
        newItems.splice(newItems.indexOf(item),1);
        this.setState({items: newItems});
        window.localStorage.setItem('items', JSON.stringify(newItems));
        alert("Deleted item " + item.name);
    }

    edit(item){
        let newEditList = this.state.editClicked;
        newEditList.push(item);
        this.setState({editClicked: newEditList});
        console.log("editClicked " + this.state.editClicked)
    }

    _itemNameHandleChange(e){
        e.preventDefault();
        this.setState({editName: e.target.value});
    }

    _itemPriceHandleChange(e){
        e.preventDefault();

        this.setState({editPrice: e.target.value});
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
            editFile: file,
            editImg: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    _handleSubmit(item) {
        // e.preventDefault();
        // TODO: do something with -> this.state.file
        let newItems = this.state.items;
        let name = this.state.editName;
        newItems.splice(newItems.indexOf(item),1);
        if (name == '') name = item.name;
        name = name.replace(/\s+/g, " ");
        

        let price = this.state.editPrice;
        if (price == '') price = item.price;
        if (  name.length >= 8 && name.length <= 20 && name.charAt(0) == name.charAt(0).toLocaleUpperCase())
        {
            if (  !isNaN(price*1) && price > 0 && price <1000)
            {
                newItems.push(
                    {
                        name: name,
                        price: price,
                        file: this.state.editFile,
                        imagePreviewUrl: this.state.editImg
                    }
                );
                alert("Edited name:" + name + " price:" + price );
            }
            else
            {
                alert("Invalid price!!!");
                return;
            }
        }
        else
        {
           alert("Invalid name!!!") ;
           return;
        } 
        window.localStorage.setItem('items', JSON.stringify(newItems));
        this.setState({items: newItems});
        let newEditList = this.state.editClicked;
        newEditList.splice(newEditList.indexOf(item),1);
        this.setState({editClicked: newEditList});
    }
    
    back(){
        this.props.history.push("/");
    }
    
    view(item){
        
    }
    render() {
        

    return (
        <div>
        <div>
            <table class='table'>
                <thead>
                    
                    <th><button onClick={e => this.sortName()}>Item Name</button></th>
                    <th><button onClick={e => this.sortPrice()}>Item Price</button></th>
                    <th>Item Img</th>
                    <th>Option</th>
                </thead>
                <tbody>
                        {this.state.items.length == 0&& <tr>
                            <td colSpan="3">No more item</td>
                        </tr>}
                        {this.state.items.map(item =>
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td><img src={item.imagePreviewUrl} /></td>
                        <td><button value={item} onClick={() => this.edit(item)}>Edit</button>
                        <button  onClick={() => this.delete(item)}>Delete</button>
                        <button value={item} onClick={() => this.view(item)}>View</button>
                        </td>

                        {this.state.editClicked[this.state.editClicked.indexOf(item)] &&
                        <div>
                        <form>
                            <label>
                                Name:
                                <input type="text" value={this.editName} onChange={(e) => this._itemNameHandleChange(e)}  />
                            </label>
                            <label>
                                Price:
                                <input type="text" value={this.editPrice} onChange={(e)=>this._itemPriceHandleChange(e)} />
                            </label>

                            <input className="fileInput" 
                            type="file" 
                            onChange={(e)=>this._handleImageChange(e)} />
                            <button className="submitButton" 
                            type="submit" value = {item}
                            onClick={()=>this._handleSubmit(item)}>Change!</button>
                        </form> </div>}
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
        <div>
            <AddNew updateFunc ={this.update}></AddNew>
        </div>
        <div>
            <button onClick={this.back}>Back</button>
        </div>
        </div>
    )
    }
}
      
export default AddingPage;