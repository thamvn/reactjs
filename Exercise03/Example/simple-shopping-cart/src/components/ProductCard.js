import React, {Component} from 'react';
import {commonConstants} from '../common/constants';

export default class ProductCard extends Component{

    render(){
        return(
            <div className="product-card">
                <div className="card-header">{this.props.product.name} - $ {this.props.product.price}</div>
                <div className="card-body">
                    <img src={this.props.product.productImage||commonConstants.defaultProductImg} />
                </div>
                <div className="card-footer">
                    <button className={this.props.product.isAdded ? "remove" : "add"} value={this.props.product.id} onClick={this.props.onProductClick}>
                        {this.props.product.isAdded ? 'Remove' : 'Add To Cart'}
                    </button>
                </div>                
            </div>
        )
    }
}