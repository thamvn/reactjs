import { BrowserRouter as Switch, Route} from "react-router-dom";
import React, {Component} from 'react';
import Home from '../Products/Home/ShopProducts';
import CheckOut from '../Products/CheckOut'
import ListProducts from "../Pages/ListProducts";
import TodoApp from "../DbContext/listDbProducts"
  
class RouterURL extends Component{
    render(){
        return(
            <Switch>
                    {/* <Route component={Home} /> */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/check-out" component={CheckOut} />
                    <Route exact path="/add-product" component={ListProducts} />
                    <Route exact path="/pagination" component={TodoApp} />
            </Switch>
        );
    }
}

export default RouterURL;
