import React from 'react';
import { HashRouter as Router, Route} from "react-router-dom"
import Items from './pages/Items';
import Checkout from './pages/Checkout';
import Home from './pages/Home'
import AddItem from './pages/AddItem'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemList : [
        {id: 0, name: 'Mũ bảo hiểm 1', price: 10, selected: false, image: 'mu1.jpg'},
        {id: 1, name: 'Mũ bảo hiểm 2', price: 20, selected: false, image: 'mu2.jpg'},
        {id: 2, name: 'Mũ bảo hiểm 3', price: 30, selected: false, image: 'mu3.png'}
      ],
      checkoutList: [],
      totalPrice: 0
    }

    this.onClickButton = this.onClickButton.bind(this);
    this.updateCheckoutList = this.updateCheckoutList.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  onAddItem(name, price, image, imageName, e) {
    console.log(image);
    if (!isNaN(price)) {
      let tmpItemList = this.state.itemList;
      let item = {name: name, price: price};
      item.id = tmpItemList[tmpItemList.length - 1].id + 1;
      item.selected = false;
      item.image = imageName;
      console.log(item);
      tmpItemList.push(item);
      this.setState({itemList: tmpItemList});
      alert('Add new item successfully')
    }
    else alert('Price must be a number!');
  }

  updateCheckoutList(modifiedItem) {
    let tmpCheckoutList = this.state.checkoutList, price = this.state.totalPrice;

    if (modifiedItem.selected) { 
      price += modifiedItem.price;
      tmpCheckoutList.push(modifiedItem);
      alert(`Added item ${modifiedItem.name} to cart`);
    }
    else for (var item in tmpCheckoutList) 
        if (tmpCheckoutList[item].id === modifiedItem.id) {
          price -= modifiedItem.price;
            let index = tmpCheckoutList.indexOf(modifiedItem);
            if (index > -1)
              tmpCheckoutList.splice(index, 1);
            alert(`Removed item ${modifiedItem.name} from cart`);
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
    return (
      <Router>
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
        <Route name="Add Item" path="/add" render={(props) => <AddItem {...props} 
          onAddItem={this.onAddItem}
          randomKey={Math.random()}
          itemList={this.state.itemList}
          onClickButton={this.onClickButton}
          renderButton={false}
          />} />
      </Router>
    );
  }
}

export default App;
