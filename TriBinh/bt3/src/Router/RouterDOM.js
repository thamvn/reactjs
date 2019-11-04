import { BrowserRouter as Switch, Route} from "react-router-dom";
import React, {Component} from 'react';
import ShopProducts from '../Products/Home';
import AddItem from '../Products/AddProduct';
import EditItem from '../Products/EditProduct';
  
class RouterURL extends Component{
    render(){
        return(
            <Switch>
                    <Route exact path="/" component={ShopProducts} />
                    <Route path="/add-product" component={AddItem} />
                    <Route path="/edit-product" component={EditItem} />
            </Switch>
        );
    }
}

export default RouterURL;
