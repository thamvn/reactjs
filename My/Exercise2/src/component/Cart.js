import React, { Component } from 'react';
class Cart extends Component {
    render() {
        let localItem= JSON.parse(localStorage.getItem("List"))
        return (
            <div>
                <h5>Total: ${localItem["total"]}</h5>
                <a href="/">Back to store</a>
            </div>
        );
    }
}

export default Cart;