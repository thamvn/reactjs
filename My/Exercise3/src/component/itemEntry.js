import React, { Component } from 'react';
class ItemDetail extends Component {
    render() {
        return (
            <div className="col col-3">
                <div className="card align-left">
                    <div className="card-body"><h5 className="text-center">{this.props.infor.name} {this.props.infor.model} <p></p>${this.props.infor.price}</h5>
                        <div className="text-center">
                            <button className="btn btn-center btn-primary" onClick={this.props.handleClick}>{this.props.infor.status}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class ListItem extends React.Component{
    constructor(props){
        let localItem=JSON.parse(localStorage.getItem("State"))
        super(props);
        if(localItem){
            this.state={
                listItem: localItem["listItem"],
                totalPrice: localItem["totalPrice"]
            }
        }
        else{
            this.state={
                listItem: [{name:"Audi" ,model:"R8" ,price:50000,status:"Add to cart"},
                {name:"Ford",model:"Mustang",price:34000,status:"Add to cart"},
                {name:"Cherolet",model:"Camaro",price:56000,status:"Add to cart"},
                {name:"Honda",model:"Civic",price:46000,status:"Add to cart"}],
                totalPrice: 0
            }
        }
        
    }
    clickBuy(index){
        let tmpStatus=""
        if(this.state.listItem[index].status==="Add to cart"){
            tmpStatus="Remove from cart";
            this.setState({totalPrice: this.state.totalPrice + this.state.listItem[index].price})
        }
        else {
            tmpStatus="Add to cart"
            this.setState({totalPrice: this.state.totalPrice - this.state.listItem[index].price})
        }
        let newState = Object.assign({},this.state)
        newState.listItem[index].status=tmpStatus;
        this.setState({listItem:newState.listItem})
    }
    render() {
        let itemsAdded={
            listItem:this.state.listItem,
            totalPrice:this.state.totalPrice
        }
        var itemSetToLocal= {listItem:[],totalPrice:this.state.totalPrice}
        for(var i in itemsAdded.listItem){
            if(itemsAdded.listItem[i].status==="Remove from cart"){
                itemSetToLocal.listItem.push(itemsAdded.listItem[i])
            }
        }
        itemSetToLocal["totalPrice"]=this.state.totalPrice
        localStorage.setItem("ItemsAdded",JSON.stringify(itemSetToLocal))
        localStorage.setItem("State",JSON.stringify(this.state))
        return (
            <div className="row">
            {   
                this.state.listItem.map((ele,index) => <ItemDetail key={ele.name} infor={ele} handleClick={()=>{
                this.clickBuy(index)
                }} />)
                }
                <p className="col-4"><a href="/cart">Checkout</a></p>
                <p className="col-4"><a href="/add">Add new Item</a></p>
            </div>
        )
    }
}
export default ListItem;