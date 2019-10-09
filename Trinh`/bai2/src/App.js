import React from 'react';
import { HashRouter as Router, Redirect, Route , Switch} from "react-router-dom"
import Items from './pages/Items';
import Checkout from './pages/Checkout';
import Home from './pages/Home'
import AddItem from './pages/AddItem'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemList : [
        {id: 0, name: 'Mũ bảo hiểm 1', price: 10, selected: false},
        {id: 1, name: 'Mũ bảo hiểm 2', price: 20, selected: false},
        {id: 2, name: 'Mũ bảo hiểm 3', price: 30, selected: false},
        {id: 3, name: 'Mũ bảo hiểm 4', price: 40, selected: false},
        {id: 4, name: 'Mũ bảo hiểm 5', price: 50, selected: false},
        {id: 5, name: 'Mũ bảo hiểm 6', price: 60, selected: false},
        {id: 6, name: 'Mũ bảo hiểm 7', price: 70, selected: false},
      ],
      checkoutList: [],
      totalPrice: 0
    }

    this.onClickButton = this.onClickButton.bind(this);
    this.updateCheckoutList = this.updateCheckoutList.bind(this);
  }

  updateCheckoutList(modifiedItem) {
    let tmpCheckoutList = this.state.checkoutList, price = this.state.totalPrice;

    if (modifiedItem.selected) { 
      price += modifiedItem.price;
        tmpCheckoutList.push(modifiedItem);
    }
    else for (var item in tmpCheckoutList) 
        if (tmpCheckoutList[item].id === modifiedItem.id) {
          price -= modifiedItem.price;
            let index = tmpCheckoutList.indexOf(modifiedItem);
            if (index > -1)
                tmpCheckoutList.splice(index, 1);
            break;
        }

    this.setState({checkoutList: tmpCheckoutList, totalPrice: price});
}

onClickButton(itemId, e) {
    e.preventDefault();
    let tmpItemList = this.state.itemList;
    for (var item in tmpItemList) 
        if (tmpItemList[item].id === itemId) {
            tmpItemList[item].selected = (tmpItemList[item].selected === true) ? false : true;
            this.updateCheckoutList(tmpItemList[item]);
            break;
        }
    this.setState({itemList: tmpItemList});
}

  render() {
    // this.props.itemList = itemList;
    // this.props.checkoutList = checkoutList;
    return (
      <Router>
        {/* <Switch> */}
          <Route path="/" render={(props) => <Home {...props} />} 
            randomKey={Math.random()}
            />
          <Route name="Items" path="/items" render={(props) => <Items {...props} 
            itemList={this.state.itemList} 
            checkoutList={this.state.checkoutList}
            totalPrice={this.state.totalPrice}
            updateCheckoutList={this.updateCheckoutList}
            onClickButton={this.onClickButton}
            randomKey={Math.random()}
            />} />
          <Route name="Checkout" path="/checkout" render={(props) => <Checkout {...props} 
            itemList={this.state.itemList}
            checkoutList={this.state.checkoutList}
            totalPrice={this.state.totalPrice}
            randomKey={Math.random()}
            />}/>
          <Route name="Items" path="/add" render={(props) => <AddItem {...props} 
            itemList={this.state.itemList} 
            checkoutList={this.state.checkoutList}
            totalPrice={this.state.totalPrice}
            updateCheckoutList={this.updateCheckoutList}
            onClickButton={this.onClickButton}
            randomKey={Math.random()}
            />} />
        {/* </Switch> */}
      </Router>
    );
  }
}

export default App;
