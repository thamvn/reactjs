import React from 'react';
import {Link} from "react-router-dom";

class Home extends React.Component {
    render() {
        return(
            <div>
                <ul>
                    <li>
                        <Link to="/" >Home</Link>
                    </li>
                    <li>
                        <Link to="/add" >Add Items</Link>
                    </li>
                    <li>
                        <Link to="/items" >Items</Link>
                    </li>
                    <li>
                        <Link to="/checkout" >Checkout</Link>
                    </li>
                </ul> 
                <div>-------------------------------------------------------------------------------------------------------------------------</div>
            </div>
        )  
    }
}

export default Home;