import React, { Component } from 'react';
class Items extends Component {
    render() {
        return (
            <div className="card align-left col-12">
                <div className="card-body"><h5 className="text-center">{this.props.infor.name} {this.props.infor.model} <p></p>${this.props.infor.price}</h5>
                <img src={this.props.infor.thumbnailFile} alt={this.props.infor.name} />
                </div>
            </div>
        );
    }
}
class Cart extends Component {
    constructor(props){
        let itemGetInLocal= JSON.parse(localStorage.getItem("ItemsAdded"))
        super(props);
            this.state={
                itemsAdded: itemGetInLocal.listItem,
                totalPrice: itemGetInLocal.totalPrice
            }
    }
    
   
    render(){
        return (
            <div className="row">
                <div className="text-center col-12">{this.state.itemsAdded.map((ele,index) => <Items key={ele.name} infor={ele}
             />)}</div>
             <div><p className="text-danger align-center col-12">Total: ${this.state.totalPrice}<br /><a href="/">Back to store</a></p></div>
             
            </div>
        )
    }
}

export default Cart;