import { BrowserRouter as Router, Route} from "react-router-dom";
import React, {Component} from 'react';
import Store from '../App';
import CheckOut from '../CheckOut';
  
class RouterURL extends Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Store} />
                    <Route path="/check-out" component={CheckOut} />
                </div>
            </Router>
        );
    }
}

export default RouterURL;
