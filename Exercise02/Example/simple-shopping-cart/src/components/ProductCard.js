import React, {Component} from 'react';

export default class ProductCard extends Component{

    render(){
        return(
            <div className="product-card">
                <div className="card-header">{this.props.product.name} - $ {this.props.product.price}</div>
                <div className="card-body">
                    <img src='https://www.washingtonpost.com/blogs/answer-sheet/files/2013/07/lesson-300x217.jpg' />
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