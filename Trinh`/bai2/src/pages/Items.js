import React from 'react';
import ItemEntry from '../components/ItemEntry'

class Items extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            checkoutList: [],
            totalPrice: 0
        }
        
        this.onClickButton = this.props.onClickButton.bind(this);
        this.updateCheckoutList = this.props.updateCheckoutList.bind(this);
        this.onClickCheckout = this.onClickCheckout.bind(this);
    }

    componentDidMount() {
        this.setState({
            itemList: this.props.itemList,
            checkoutList: this.props.checkoutList,
            totalPrice: this.props.totalPrice
        })
    }

    onClickCheckout(e){
        e.preventDefault();
        this.props.history.push('/checkout');
    }

    render() {
        return (
            <div>
                {this.state.itemList.map((el) => {
                    return(
                        <ItemEntry item={el} onClickButton={this.onClickButton} />
                    )
                })}
                <button classname="btn btn-default" onClick={this.onClickCheckout}>Checkout</button>           
            </div>

            // <div>
            //     <div classname="container">
            //         <table classname="table-bordered" table-layout="fixed">
            //             <tbody>
            //                 <tr>
            //                     <td>sdsds</td>
            //                     <td>sdsds</td>
            //                     <td>sdsds</td>
            //                     <td>sdsds</td>
            //                 </tr>
            //             </tbody>
            //         </table>
            //     </div>
            // </div>
        )
    }
}

export default Items;