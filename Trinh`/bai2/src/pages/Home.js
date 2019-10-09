import React from 'react';
import {Link} from "react-router-dom";

class Home extends React.Component {
    render() {
        return(
            <ul>
                <li>
                    <Link to="/" >Home</Link>
                </li>
                <li>
                    <Link to="/items" >Items</Link>
                </li>
                <li>
                    <Link to="/checkout" >Checkout</Link>
                </li>
            </ul> 
        )  
    }
}

export default Home;