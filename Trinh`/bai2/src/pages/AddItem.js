import React from 'react';

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: ''
        }
        
        this.onAddItem = this.props.onAddItem.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
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
        this.setState({price : '', name: ''});
    }

    render() {
        return (
            <div>
                <div className='label'>Name</div>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange} />
                <div className='label'>Price (in USD)</div>
                <input type="text" className="form-control" value={this.state.price} onChange={this.onPriceChange} />
                <div>
                    <button type="button" className="btn btn-default" onClick={e => {
                        this.onAddItem(this.state.name, parseFloat(this.state.price), e); 
                        if (!isNaN(this.state.price)) this.clearInput();
                    }}>Add</button>
                </div>
            </div>
        )
    }
}

export default AddItem;