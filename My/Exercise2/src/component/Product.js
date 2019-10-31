import React, { Component } from 'react';
import '../App.css';

class Car extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-8"><h4>{this.props.infor.name} {this.props.infor.model} {this.props.infor.price}</h4> </div>
                <div className="col-4"><button disabled={this.props.infor.disable} onClick={this.props.handleClick} >Buy!</button></div>
            </div>
        )
    }
}

class Gagare extends Component {
    constructor(props){
        super(props);
        this.state={
            list: JSON.parse( localStorage.getItem("product")),
            sum:0
        };
        this.clickToBuy = this.clickToBuy.bind(this);
    }
    clickToBuy(index){
        this.setState({sum: this.state.sum + this.state.list[index].price,  list: this.state.list, disable: !this.state.list[index].disable
        });
            localStorage.setItem('product',JSON.stringify([{name:"Audi" ,model:"R8" ,price:50000,disble:false},
    {name:"Ford",model:"Mustang",price:34000,disble:false}],));
    }
    render() {
        return (
            <div>
                {this.state.list.map((ele,index) => <Car key={ele.name} infor={ele} handleClick={() => {
                    this.clickToBuy(index)
                }} />)}

                <h5>Total:{this.state.sum}</h5>
            </div>
        )
    }
}

export default Gagare;
