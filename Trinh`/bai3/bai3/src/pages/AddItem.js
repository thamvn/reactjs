import React from 'react';
import axios from 'axios';
import ItemEntry from '../components/ItemEntry'

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: this.props.itemList,
            name: '',
            price: '',
            image: null,
            preview: null,
            imageName: ''
        }
        
        this.onAddItem = this.props.onAddItem.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onUploadProgress = this.onUploadProgress.bind(this);
        this.onClickButton = this.props.onClickButton.bind(this);
    }

    onClickCheckout(e){
        e.preventDefault();
        this.props.history.push('/checkout');
    }

    onNameChange(e) {
        this.setState({name : e.target.value});
    }

    onPriceChange(e) {
        this.setState({price : e.target.value});
    }

    clearInput() {
        this.setState({price : '', name: '', preview: null});
    }

    onImageChange(e) {
        e.preventDefault();
        console.log(e.target.files[0]);

        let reader = new FileReader();
        let tmpImage = e.target.files[0];
 
        reader.readAsDataURL(tmpImage);

        reader.onloadstart = () => {
            return (
                <div>Loading image preview...</div>
            )
        }

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
                console.log(response);
                this.setState({
                    imageName: response.data.data.name
                })
            }
        })
    }

    onUploadProgress(e) {

    }

    render() {
        return (
            <div>
                <div>
                    {this.state.itemList.map((el) => {
                        return(
                            <ItemEntry item={el} onClickButton={this.onClickButton} />
                        )
                    })}
                </div>
                <div className='label'>Name</div>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange} />
                <div className='label'>Price (in USD)</div>
                <input type="text" className="form-control" value={this.state.price} onChange={this.onPriceChange} />
                <div className='label'>Image</div>

                <div className="previewComponent">
                    <input className="fileInput" 
                        type="file" 
                        onChange={(e)=>this.onImageChange(e)} onLoadStart={<div>Loading preview...</div>}/>
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
                    <button type="button" className="btn btn-default" onClick={e => {
                        this.onAddItem(this.state.name, parseFloat(this.state.price), this.state.image, this.state.imageName, e); 
                        if (!isNaN(this.state.price)) this.clearInput();
                    }}>Add</button>
                </div>
            </div>
        )
    }
}

export default AddItem;
