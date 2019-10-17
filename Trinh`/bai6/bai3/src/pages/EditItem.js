import React from 'react';
import Home from './Home';
import axios from 'axios';

import {stringToWords, validateName, validatePrice} from '../helpers/index';
import { ItemService } from '../services/index';


class EditItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            name: '',
            price: '',
            image: null,
            preview: null,
            imageName: '',
            isNameValidated: true,
            isPriceValidated: true
        }

        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.itemId;
        ItemService.getItemById(id).then(rs => {
            this.setState({ price: rs[0].price, item: rs[0], name: rs[0].name, imageName: rs[0].image});
        });
    }
    
    onNameChange(e) {
        let tmp = validateName(e.target.value);
        this.setState({name : tmp.data, isNameValidated: tmp.result});
    }

    onPriceChange(e) {
        let tmp = validatePrice(e.target.value.toString());
        this.setState({price: tmp.data, isPriceValidated: tmp.result});
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

        axios.post('/items/image/add', data).then((response) => {
            if (response.data.status === false)
                alert('Upload image failed');
            else {
                this.setState({
                    imageName: response.data.data.name
                })
            }
        })
    }

    onClickCancel(e) {
        this.props.history.push('/add');
    }

    onClickSave(e) {
        let tempItem = {
            name: this.state.name,
            price: this.state.price,
            image: this.state.imageName
        };
        ItemService.editItem(e.target.value, tempItem).then(rs => {
            this.props.history.push('/add');
        });
    }

    render() {
        return(
            <div>
                <Home />
                <h2>Edit item {(!this.state.item) ? (null) : (this.state.item.name)}</h2>
                <div className='label'>Name</div>

                <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange} />
                {(!this.state.isNameValidated) ? 
                    (
                        (this.state.name) ?
                            (<div className='label' style={{ color: 'red', fontSize: '10px' }}>Length of name must be in range of [8, 20], the first character must be in uppercase</div>)
                            : (<div></div>)
                    ) : (<div></div>)}
                <div className='label'>Price (in USD)</div>
                <input type="text" className="form-control" value={this.state.price} onChange={this.onPriceChange} />
                <span>$</span>
                {(!this.state.isPriceValidated) ? 
                    (
                        (this.state.price) ?
                            (<div className='label' style={{ color: 'red', fontSize: '10px' }}>Price must be a valid decimal in range of (0, 1000]</div>)
                            : (<div></div>)
                    ) : 
                    (<div className='label' style={{ color: 'green', fontSize: '10px' }}>{stringToWords(this.state.price.toString())} dollars</div>)}

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
                        (<div><img margin="5px" src={'http://localhost:9091/items/image/thumb-' + this.state.item.image} alt={this.state.item.name} /></div>)
                    }
                </div>

                <div>
                    <span>
                        <button value={this.state.item.id}
                            disabled={!this.state.isNameValidated || !this.state.isPriceValidated} 
                            onClick={this.onClickSave}>Save changes</button>
                        <button type="button" className="btn btn-default" onClick={this.onClickCancel}>Cancel</button>
                    </span>
                </div>
            </div>
        )
    }
}

export default EditItem;
