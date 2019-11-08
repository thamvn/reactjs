import React, { Component } from 'react'


export default class Product extends Component {

    render() {
        return (
            <div className="Wrap">
            <div className="Product-wrap">
                <h3>Name: {this.props.name}</h3>
                <p>Price: {this.props.price}</p>
                <img className="img-default" src="https://miro.medium.com/max/785/1*H-25KB7EbSHjv70HXrdl6w.png" alt=""/>
                <div><button onClick={this.props.handleClick} className="Buy" type="button">{this.props.isClicked ? "remove from cart" : "add to cart"}</button>
                <button onClick={this.props.delProduct} >Delete </button>
                <button onClick={this.props.goToEdit}>Edit</button>
                </div>
            </div>
            </div>
        )
    }
}
