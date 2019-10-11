import React from 'react'
class ListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedItem: [],
            items: this.props.listItems
        }
        this.addItem = this.addItem.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.checkout = this.checkout.bind(this)
    }

    addItem(item, e) {
        console.log("props: " + JSON.stringify(this.props.listItems))
        var pick = this.state.pickedItem;
        var newList = this.state.items;
        var pickedList = this.props.picked;
        pick.push(item)
        pickedList.push(item)
        this.props.pickedList(pickedList);
        console.log("pick: " + JSON.stringify(item));
        var index = newList.indexOf(item);
        console.log("index: " + index);
        if (index !== -1) {
            newList.splice(index, 1);
            this.props.newList(newList);
        }
        this.setState({ pickedItem: pick })
    }

    addProduct() {
        this.props.history.push({
            pathname: '/add'
        })
    }

    checkout() {
        this.props.history.push({
            pathname: '/checkout',
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.items.map(item =>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Item: {item.name}</h3>
                                    <h3 className="card-text">Price: {item.price}</h3>
                                    <img src={item.thumbnail} style={{ height: "300px", width: "500px" }}/>
                                    <button onClick={e => this.addItem(item, e)} >Add</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={this.checkout}>Checkout</button>
                <button onClick={this.addProduct}>Add new product</button>
            </div>
        )
    }
}
export default ListItems