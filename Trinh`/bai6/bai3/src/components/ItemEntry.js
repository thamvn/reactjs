import React from 'react';
import { CheckoutService } from '../services/index';

class ItemEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item,
            renderButton: this.props.renderButton,
            isExistInCart: this.props.isExistInCart
        }

        this.onClickEdit = this.props.onClickEdit.bind(this);
        this.onClickDelete = this.props.onClickDelete.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
    }

    componentDidMount() {
        CheckoutService.isExistInCart(this.state.item.id).then(rs => {
            this.setState({isExistInCart: rs})
        })
    }

    onClickButton(e) {
        if (this.state.isExistInCart === false) {
            CheckoutService.addToCart(this.state.item).then(rs => {
                this.setState({isExistInCart: true});
            });
        }
        else {
            CheckoutService.removeFromCart(this.state.item.id).then(rs => {
                this.setState({isExistInCart: false});
            });   
        }
    }

    onClickViewImage(e) {
        e.preventDefault();
        window.open('http://localhost:9091/items/image/' + this.state.item.image, "_blank")
    }
    
    render() {
        return(
            <div>
                {this.state.item.name} - Price: {this.state.item.price} USD
                <img margin="5px" src={'http://localhost:9091/items/image/thumb-' + this.state.item.image} alt={this.state.item.name} /> 
                {(this.state.renderButton) ? 
                    (<button classname="btn btn-default" onClick={e => this.onClickButton(this.state.item.id, e)}>
                        {(this.state.isExistInCart === false) ? 'Add To Cart' : 'Remove From Cart'}</button>) :
                    (<span>
                        <button className="btn btn-default" value={this.state.item.id} onClick={e => this.onClickEdit(e)}>Edit</button>
                        <button className="btn btn-default" value={this.state.item.id} onClick={e => this.onClickDelete(e)}>Delete</button>
                        <button className="btn btn-default" onClick={e => this.onClickViewImage(e)}>View original image</button>
                    </span>)
                }
                <div></div>
            </div>
        )
    }
}

export default ItemEntry;
