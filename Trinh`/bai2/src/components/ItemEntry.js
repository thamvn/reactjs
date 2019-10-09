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
                <div>{this.state.item.name}</div>
                <div>Price: {this.state.item.price} USD</div>
                <div>
                    <button classname="btn btn-default" value={this.state.item.selected} onClick={e => this.onClickButton(this.state.item.id, e)}>
                        {(this.state.item.selected === false) ? 'Add To Cart' : 'Remove From Cart'}</button>
                    </div> 
            </div>
        )
    }
}

export default ItemEntry;
