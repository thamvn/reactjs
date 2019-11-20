import React, { Component } from 'react';
import CartDetail from './../context/CartDetail';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
class MainCart extends Component {
    constructor(){
        super()
        this.state={
            listItem:[],
            totalPrice: 0
        }
    }
    componentDidMount() {
        var self = this
        var totalPrice = 0;
        axios.get('http://localhost:5000/cart')
        .then(function (res) {
            for(var i in res.data){
                totalPrice= totalPrice + parseFloat(res.data[i].price)
            }
            self.setState({
                listItem: [...res.data],
                totalPrice: totalPrice
            })
        })
        .catch(function (err) {
            console.log(err);
        })
    }
    
    render() {
        return (
            <div>
                <Typography variant="h5">Cart</Typography>
                <List style={{marginLeft:300,width:800}}><Typography variant="h6" style={{float:"right"}}>Total: ${this.state.totalPrice}</Typography>
                    {this.state.listItem.map((ele,index) => <CartDetail key={ele.name} Products={ele}/>)}
                </List>
            </div>
        );
    }
}
export default MainCart;