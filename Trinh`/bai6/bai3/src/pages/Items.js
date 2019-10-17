import React from 'react';
import Home from './Home';
import {ItemService, CheckoutService} from '../services/index';
import Paging from '../components/Paging'

class Items extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            checkoutList: [],
            totalPrice: 0,
            nameSortState: 'desc',
            priceSortState: 'desc'
        }
        
        this.onClickCheckout = this.onClickCheckout.bind(this);
        this.onSortName = this.onSortName.bind(this);
        this.onSortPrice = this.onSortPrice.bind(this);
    }

    componentDidMount() {
        ItemService.getListItems().then(rs1 => {
            CheckoutService.getCart().then(rs2 => {
                CheckoutService.getTotalPrice().then(rs3 => {
                    this.setState({
                        itemList: rs1,
                        checkoutList: rs2,
                        totalPrice: rs3
                    })
                })
            })
        })
    }

    onClickCheckout(e){
        e.preventDefault();
        this.props.history.push('/checkout');
    }

    onSortName(e) {
        ItemService.getListItems().then(tmpList => {
            tmpList = (this.state.nameSortState === 'asc') ? 
                (tmpList.sort((a,b) => { return (a.name == b.name) ? 0 : ((a.name > b.name) ? 1 : -1 )})) :
                (tmpList.sort((a,b) => { return (a.name == b.name) ? 0 : ((a.name < b.name) ? 1 : -1 )}));
            this.setState({itemList: tmpList, nameSortState: (this.state.nameSortState === 'asc') ? ('desc') : ('asc')})
        });
    }

    onSortPrice(e) {
        ItemService.getListItems().then(tmpList => {
            tmpList = (this.state.priceSortState === 'asc') ? 
                (tmpList.sort((a,b) => { return (a.price == b.price) ? 0 : ((a.price > b.price) ? 1 : -1 )})) :
                (tmpList.sort((a,b) => { return (a.price == b.price) ? 0 : ((a.price < b.price) ? 1 : -1 )}));
            this.setState({itemList: tmpList, priceSortState: (this.state.priceSortState === 'asc') ? ('desc') : ('asc')})
        });
    }

    render() {
        return (
            <div>
                <Home />
                <h2>List Items</h2>
                <div>
                    <span>
                        <button classname="btn btn-default" onClick={this.onSortName}>Sort by name</button>  
                        <button classname="btn btn-default" onClick={this.onSortPrice}>Sort by Price</button>  
                    </span>
                </div>
                <Paging itemList={this.state.itemList} renderButton={true} onClickDelete={() => {}} onClickEdit={() => {}} key={Math.random()} />
                <button classname="btn btn-default" onClick={this.onClickCheckout}>Checkout</button>           
            </div>
        )
    }
}

export default Items;
