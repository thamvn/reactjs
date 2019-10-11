import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import Product from './pages/Product';
import Products from './pages/Products';
import Cart from './pages/Cart';

(function seedData(){
  let products = [];
  const basePrice = 9;
  for(var i = 0; i < 10; i++){
      products.push({id: i+1, 
                      name: `Lesson ${i+1}`, 
                      isAdded: false, 
                      price: basePrice*i
                  });
  }
  window.localStorage.setItem('products', JSON.stringify(products));
})()

class App extends Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route name='Product List' path='/' component={Products} exact/>
          <Route name='New Product' path='/product' component={Product} exact />
          <Route name='Cart' path='/cart' component={Cart} exact/>
        </Switch>
      </Router>)
      
  }
}

export default App;
