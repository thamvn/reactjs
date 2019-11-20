import React, { Component } from 'react';
import Products from '../context/Products';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { IconButton, Badge } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { resolveNaptr } from 'dns';
class MainHome extends Component {
    constructor(props){
        super(props)
        this.state={
            listItem: [],
            totalPrice: 0,
            count: 0
        }
    }
    componentDidMount() {
        var self = this
        axios.get('http://localhost:5000/product')
        .then(function (res) {
            for(var i in res.data){
                res.data[i].status="Add to cart"
            }
            self.setState({
                listItem: [...res.data]
            })
        })
        .catch(function (err) {
            console.log(err);
        })
    }
    
    clickBuy(index){
        let tmpStatus=""
        let data = {token: JSON.parse(sessionStorage.getItem("Auth")),item: this.state.listItem[index]}
        if(this.state.listItem[index].status==="Add to cart"){
            tmpStatus="Remove";
            this.setState({totalPrice: this.state.totalPrice + this.state.listItem[index].price,count : this.state.count+1})
            axios.post('http://localhost:5000/cart/add',data
              )
              .then(function (response) {
                if(!response.data.success){
                    alert("Invalid add to cart")
                }
                else console.log("Add Success")
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else { 
            tmpStatus="Add to cart"
            this.setState({totalPrice: this.state.totalPrice - this.state.listItem[index].price,count : this.state.count-1})
            axios.post('http://localhost:5000/cart/remove',data)//Delete with post method
            .then(function (response) {
              if(!response.data.success){
                  alert("Invalid add to remove")
              }
              else console.log("Removed Success")
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        let newState = Object.assign({},this.state)
        newState.listItem[index].status=tmpStatus;
        this.setState({listItem:newState.listItem})
    }
    render() {
        return (
            <div>
                <Typography variant="h5" style={{float: "left"}}>Home</Typography><IconButton style={{float:"right"}} href='/cart' color='inherit' ><Badge badgeContent={this.state.count} color='secondary'><ShoppingCartIcon /></Badge></IconButton>
                <Grid container spacing={3}>
                {   
                this.state.listItem.map((ele,index) => <Products key={ele.name} Products={ele} handleClick={()=>{
                this.clickBuy(index) 
                }} />)
                }
                </Grid>
            </div>
        );
    }
}

export default MainHome;