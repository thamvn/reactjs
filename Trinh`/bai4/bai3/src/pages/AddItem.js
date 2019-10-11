import axios from 'axios';
import React from 'react';
import { stringToWords, validateName, validatePrice } from '../helpers/index';
import { ItemService } from '../services/index';
import Home from './Home';
import Paging from '../components/Paging'

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            name: '',
            price: '',
            image: null,
            preview: null,
            imageName: '',
            isNameValidated: false,
            isPriceValidated: false,
            notInputYet: true,
            nameSortState: 'asc',
            priceSortState: 'asc',
            key: 0
        }
        
        this.onAddItem = this.onAddItem.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onSortName = this.onSortName.bind(this);
        this.onSortPrice = this.onSortPrice.bind(this);
    }

    componentDidMount() {
        this.setState({itemList: ItemService.getListItems()})
    }

    onNameChange(e) {
        let tmp = validateName(e.target.value);
        this.setState({itemList: ItemService.getListItems(), name : tmp.data, notInputYet: false, isNameValidated: tmp.result});
    }

    onPriceChange(e) {
        let tmp = validatePrice(e.target.value);
        this.setState({itemList: ItemService.getListItems(), price: tmp.data, notInputYet: false, isPriceValidated: tmp.result});
    }

    clearInput() {
        this.setState({price : '', name: '', preview: null, image: null});
    }

    onImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let tmpImage = e.target.files[0];
 
        reader.readAsDataURL(tmpImage);

        reader.onloadend = () => {
            this.setState({
                image: tmpImage,
                preview: reader.result,
                imageName: tmpImage.name
            });
        }

        const data = new FormData();
        data.append('image', tmpImage)

        axios.post('/addItem', data).then((response) => {
            if (response.data.status === false)
                alert('Upload image failed');
            else {
                this.setState({
                    imageName: response.data.data.name
                })
            }
        })
    }

    onAddItem(name, price, imageName, e) {
        let item = {name: name, price: price};
        item.selected = false;
        item.image = imageName;
        ItemService.addNewItem(item);
        this.setState({itemList: ItemService.getListItems()});
      }

    onClickDelete(e) {
        e.preventDefault();
        ItemService.deleteItem(e.target.value);
        this.setState({itemList: ItemService.getListItems(), key: Math.random()});
    }

    onClickEdit(e) {
        this.props.history.push(`/edit/${e.target.value}`);
    }

    onSortName(e) {
        let tmpList = ItemService.getListItems();
        tmpList = (this.state.nameSortState === 'asc') ? 
            (tmpList.sort((a,b) => { return (a.name == b.name) ? 0 : ((a.name > b.name) ? 1 : -1 )})) :
            (tmpList.sort((a,b) => { return (a.name == b.name) ? 0 : ((a.name < b.name) ? 1 : -1 )}));
        this.setState({itemList: tmpList, nameSortState: (this.state.nameSortState === 'asc') ? ('desc') : ('asc')})
    }

    onSortPrice(e) {
        let tmpList = ItemService.getListItems();
        tmpList = (this.state.priceSortState === 'asc') ? 
            (tmpList.sort((a,b) => { return (a.price == b.price) ? 0 : ((a.price > b.price) ? 1 : -1 )})) :
            (tmpList.sort((a,b) => { return (a.price == b.price) ? 0 : ((a.price < b.price) ? 1 : -1 )}));
        this.setState({itemList: tmpList, priceSortState: (this.state.priceSortState === 'asc') ? ('desc') : ('asc')})
    }

    render() {
        return (
            <div>
                <Home />
                <h2>List Items</h2>
                <div>
                    <span>
                        <button classname="btn btn-default" onClick={this.onSortName}>Sort by name</button>  
                        <button classname="btn btn-default" onClick={this.onSortPrice}>Sort by Price</button>  
                    </span>
                </div>
                <Paging itemList={this.state.itemList} renderButton={false} onClickDelete={this.onClickDelete} onClickEdit={this.onClickEdit} key={Math.random()} />
                <div>-------------------------------------------------------------------------------------------------------------------------</div>
                <h2>Add new item</h2>
                <div className='label'>Name</div>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange} />
                {(!this.state.isNameValidated && !this.state.notInputYet) ? 
                    (<div className='label' style={{ color: 'red', fontSize: '10px' }}>Length of name must be in range of [8, 20], the first character must be in uppercase</div>) : (<div></div>)}
                <div className='label'>Price (in USD)</div>
                <input type="text" className="form-control" value={this.state.price} onChange={this.onPriceChange} />
                <span>$</span>
                {(!this.state.isPriceValidated && !this.state.notInputYet) ? 
                    (<div className='label' style={{ color: 'red', fontSize: '10px' }}>Price must be a valid decimal in range of (0, 1000]</div>) : 
                    (<div className='label' style={{ color: 'green', fontSize: '10px' }}>{stringToWords(this.state.price)} dollars</div>)}
                <div className='label'>Image</div>

                <div className="previewComponent">
                    <input className="fileInput" 
                        type="file" 
                        onChange={(e)=>this.onImageChange(e)} />
                    {(this.state.preview) ? 
                        (<div className="imgPreview">
                            <img src={this.state.preview} alt="Preview" style={{
                                minWidth: '10%',
                                maxWidth: 200,
                                minHeight: '10%',
                                maxHeight: 100,
                            }}/>
                        </div>) :
                        (<div></div>)
                    }
                </div>

                <div>
                    <button type="button" className="btn btn-default" disabled={!this.state.isNameValidated || !this.state.isPriceValidated} onClick={e => {
                        this.onAddItem(this.state.name, parseFloat(this.state.price), this.state.imageName, e); 
                        if (!isNaN(this.state.price)) this.clearInput();
                    }}>Add</button>
                </div>
            </div>
        )
    }
}

export default AddItem;
