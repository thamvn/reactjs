import React, { Component } from 'react';

class ItemDetail extends Component {
    render() {
        return (
            <div className="col col-12">
                <div className="card align-left">
                <h5>{this.props.infor.name} {this.props.infor.model} ${this.props.infor.price}</h5>
                 <img src={this.props.infor.thumbnailFile} alt={this.props.infor.name} width="300"/>
                        <div className="text-center">
                            <button className="btn btn-center btn-primary" onClick={this.props.handleClick}>{this.props.infor.status}</button>
                        </div>
                </div>
            </div>
        )
    }
}
class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listItem: this.props.listItem,
            itemPerPage: this.props.itemPerPage,
            pagecurrent: this.props.currentPage,
            sortNameStatus : this.props.sortNameStatus,
            sortPriceStatus : this.props.sortPriceStatus,
            totalPrice: 0
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.state.itemPerPage!== nextProps.listItem || this.state.listItem!== nextProps.listItem ){
            this.setState({
                listItem: nextProps.listItem,
                itemPerPage: nextProps.itemPerPage,
                pagecurrent: nextProps.currentPage,
                sortNameStatus : nextProps.sortNameStatus,
                sortPriceStatus : nextProps.sortPriceStatus,
            })
        }
    }
    
    clickBuy(index){
        let tmpStatus=""
        console.log(index,this.state.itemPerPage[index])
        if(this.state.itemPerPage[index].status==="Add to cart"){
            tmpStatus="Remove from cart";
            this.setState({totalPrice: this.state.totalPrice + this.state.itemPerPage[index].price})
            alert("Added "+this.state.itemPerPage[index].name+" to cart")
        }
        else {
            tmpStatus="Add to cart"
            this.setState({totalPrice: this.state.totalPrice - this.state.itemPerPage[index].price})
            alert("Remove "+this.state.itemPerPage[index].name+" from cart")
        }
        let newState = [...this.state.itemPerPage]
        newState[index].status=tmpStatus;
        this.setState({itemPerPage:newState})
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
                this.state.itemPerPage.map((ele,index) => <ItemDetail key={ele.name} infor={ele} handleClick={()=>{
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