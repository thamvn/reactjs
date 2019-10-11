import React from 'react';
import Home from './Home';
import {CheckoutService} from '../services/index';

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkoutList: [],
            totalPrice: 0
        }

        this.onBackButton = this.onBackButton.bind(this);
    }

    componentDidMount(){
        this.setState({
            checkoutList: CheckoutService.getCart(),
            totalPrice: CheckoutService.getTotalPrice()
        })
    }

    onBackButton(e) {
        e.preventDefault();
        this.props.history.push('/items');
    }

    render() {
        return (
            <div>
                <Home />
                <h2>Checkout</h2>
                <div className="container">
                    <table className="table table-hover table-bordered text-center striped bordered hover" style={{"border": "1px solid black"}}>
                        <thead>
                            <tr style={{ "width": '100px', "border": "1px solid black" }}>
                                <th>Item name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>     
                            {this.state.checkoutList.map((el) =>
                                <tr key={el.id}>
                                    <td>{el.name}</td>
                                    <td>{el.price} USD</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h5 margin="10px">Total price: {this.state.totalPrice} USD</h5>
                    <button classname="btn btn-default col-sm-12" onClick={this.onBackButton}>Back To Store</button>
                </div>
            </div>
        )
    }
}

export default Checkout;