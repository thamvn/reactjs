import React from 'react'
class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItem: this.props.picked
        }
        this.totalAmount = this.totalAmount.bind(this);
        this.back = this.back.bind(this);
        this.remove = this.remove.bind(this);
    }



    totalAmount() {
        var list = this.state.listItem;
        var total = 0;
        if (list.length === 0) {
            alert("Please pick some items");
            this.props.history.push('/items')
        }
        else for (var i = 0; i < list.length; i++) {
            total += parseInt(list[i].price);
            console.log("total: " + total);
        }
        return total;
    }

    remove(item, e) {
        var newList = this.props.listItems;
        newList.push(item);
        this.props.newList(newList);
        var newPickList = this.props.picked;
        var index = newPickList.indexOf(item);
        if (index !== -1) {
            newPickList.splice(index, 1);
            this.props.pickedList(newPickList)
        }
        this.setState({ listItem: newPickList })
    }

    back() {
        this.props.history.push({
            pathname: '/items'
        })
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    {this.state.listItem.map(item =>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Item: {item.name}</h3>
                                    <h3 className="card-text">Price: {item.price}</h3>
                                    <img src={item.imagePreviewUrl} style={{ height: "300px", width: "500px" }}/>
                                    <button onClick={e => this.remove(item, e)} >Remove</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-12">
                    <h3>Total: {this.totalAmount()}</h3>
                </div>
                <div className="col-md-12">
                    <button onClick={this.back}>Back</button>
                </div>
            </div>
        )
    }
}
export default Checkout