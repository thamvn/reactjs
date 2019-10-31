import React, { Component } from 'react';
import '../App.css';
class Car extends Component {
    render() {
        return (
            <div>
                    <div className="carinfor">
                        <h5>{this.props.infor.name} {this.props.infor.model} ${this.props.infor.price}</h5>
                        <div className="buttonbuy"><button onClick={this.props.handleClick}>{this.props.infor.status}</button>
                        </div>
                    </div>
            </div>
        )
    }
}
class Garage extends React.Component{
    constructor(props){
        let localItem=JSON.parse(localStorage.getItem("List"))
        super(props);
        if(localItem!=null){
            this.state={
                list: localItem["list"],
                total: localItem["total"]
            }
        }
        else{
            this.state={
                list: [{name:"Audi" ,model:"R8" ,price:50000,status:"Add to cart"},
                {name:"Ford",model:"Mustang",price:34000,status:"Add to cart"}],
                total: 0
            }
        }
    }
    clickBuy(index){
        let foo=""
        if(this.state.list[index].status==="Add to cart"){
            foo="Remove from cart";
            this.setState({total: this.state.total + this.state.list[index].price})
        }
        else {
            foo="Add to cart"
            this.setState({total: this.state.total - this.state.list[index].price})
        }
        let newState = Object.assign({},this.state)
        newState.list[index].status=foo;
        this.setState({...this.state.list, newState})
        
    }
    render() {
        return (
            <div>
            {   
                this.state.list.map((ele,index) => <Car key={ele.name} infor={ele} handleClick={()=>{
                this.clickBuy(index)
                }} />)
                }
                {localStorage.setItem("List",JSON.stringify(this.state))
                }
                <a href="/cart">Checkout</a>
            </div>
        )
    }
}

export default Garage
