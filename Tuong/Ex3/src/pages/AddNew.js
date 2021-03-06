import React from 'react';
import {productService} from '../services/index';
// import axios from 'axios';
class AddNew extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            itemName: '',
            itemPrice: '',
            file: '',
            imagePreviewUrl: ''
        };
        this._handleSubmit= this._handleSubmit.bind(this);
        this._handleImageChange= this._handleImageChange.bind(this);
        this._itemNameHandleChange= this._itemNameHandleChange.bind(this);
        this._itemPriceHandleChange= this._itemPriceHandleChange.bind(this);
        this.fatherUpdate = this.props.updateFunc.bind(this);
      }
    componentDidMount(){
    let newItems = productService.getProducts();
    // let newCart = cartService.getCart();
    this.setState({items: newItems});
    console.log("items" + this.state.items);
    // this.setState({cart: newCart});
    // console.log("cart" + this.state.cart);
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        let newItems = this.state.items;

        newItems.push(
            {
                name: this.state.itemName,
                price: this.state.itemPrice,
                file: this.state.file,
                imagePreviewUrl: this.state.imagePreviewUrl
              }
        );
        window.localStorage.setItem('items', JSON.stringify(newItems));
        console.log('handle uploading-', this.state.file);
        this.fatherUpdate(newItems);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
            file: file,
            imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    _itemNameHandleChange(e){
        e.preventDefault();

        this.setState({itemName: e.target.value})
    }
    _itemPriceHandleChange(e){
        e.preventDefault();
        this.setState({itemPrice: e.target.value})
    }
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Name:
                    <input type="text" value={this.state.itemName} onChange={(e) => this._itemNameHandleChange(e)}  />
                    </label>
                    <label>
                        Price:
                        <input type="text" value={this.state.itemPrice} onChange={(e)=>this._itemPriceHandleChange(e)} />
                    </label>
                    
                </form>
            <form onSubmit={(e)=>this._handleSubmit(e)}>
                <input className="fileInput" 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
                <button className="submitButton" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
            </form>
            <div className="imgPreview">
                {$imagePreview}
            </div>
            </div>
            
        )
    }
}
      
export default AddNew;