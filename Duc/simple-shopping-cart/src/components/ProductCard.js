import React from 'react';
import configDefault from '../configDefault'

class ProductCard extends React.Component {

    constructor(props) {
        super(props);

        this.detail = this.detail.bind(this);
    }
    detail() {
        this.props.history.push(`/product/${this.props.product.id}`)
    }
    render() {
        return (
            <div className="product-card">
                <div className="card-header">{this.props.product.prod_name} - $ {this.props.product.price}</div>
                <div className="card-body">
                    <img src={this.props.product.image || configDefault.defaultImage} onClick={this.detail} />
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
export default ProductCard