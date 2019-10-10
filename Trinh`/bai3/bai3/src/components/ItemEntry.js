import React from 'react';

class ItemEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            renderButton: this.props.renderButton
        }

        this.onClickButton = this.props.onClickButton.bind(this);
    }
    
    render() {
        return(
            <div>
                {this.state.item.name} - Price: {this.state.item.price} USD
                <img margin="5px" src={'http://localhost:9091/public/item-images/' + this.state.item.image} alt={this.state.item.name} 
                    style={{
                        minWidth: '10%',
                        maxWidth: 200,
                        minHeight: '10%',
                        maxHeight: 100,
                      }}/> 
                {(this.state.renderButton) ? 
                    (<button classname="btn btn-default" value={this.state.item.selected} onClick={e => this.onClickButton(this.state.item.id, e)}>
                        {(this.state.item.selected === false) ? 'Add To Cart' : 'Remove From Cart'}</button>) :
                    (<div></div>)
                }
                <h7>{' '}</h7>
            </div>
        )
    }
}

export default ItemEntry;
