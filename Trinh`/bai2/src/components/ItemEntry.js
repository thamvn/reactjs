import React from 'react';

class ItemEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item
        }

        this.onClickButton = this.props.onClickButton.bind(this);
    }
    
    render() {
        return(
            <div>
                {this.state.item.name} - Price: {this.state.item.price} USD
                <button classname="btn btn-default" value={this.state.item.selected} onClick={e => this.onClickButton(this.state.item.id, e)}>
                    {(this.state.item.selected === false) ? 'Add To Cart' : 'Remove From Cart'}</button>
                <h7>{' '}</h7>
            </div>
        )
    }
}

export default ItemEntry;
