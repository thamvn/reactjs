import React, { Component } from 'react';
class Item extends Component {
    render() {
        return (
            <div>
                <h5>{this.props.infor.name} {this.props.infor.model} {this.props.infor.price}</h5>
            </div>
        );
    }
}

class Cart extends Component {
    constructor(props){

        super(props);
        let item = JSON.parse(localStorage.getItem("List"))
        for( var i in item.list){
            if(item.list[i].status==="Add to cart"){
                delete item.list[i]
            }
        }
            this.state={
                added: item.list,
                total: item.total
            }
    }
    render() {
        return (
            <div>
                {   
                this.state.added.map((ele,index) => <Item key={ele.name} infor={ele}  />)
                }
                <p>Total: ${this.state.total}</p>
                <a href="/">Back to store</a>
            </div>
            
        )
    }
}

export default Cart;