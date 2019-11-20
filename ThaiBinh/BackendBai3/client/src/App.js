import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList'
import {Provider} from 'react-redux'
import store from './store';
import ProductModal from './components/ProductModal'
import {Container} from 'reactstrap'
import {loadUser} from './actions/authActions'
class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  
  handleEditClick=(id)=>{
    this.props.history.push(`./edit/${id}`)
  }
  render(){
    console.log(this.props)
  return (
    <Provider store={store}>
    <div className="App">
     <AppNavBar />
     <Container>
     <ProductModal />
     <ShoppingList
     onEditClick={(id)=>this.handleEditClick(id)}
     />
     </Container>
     
    </div>
    </Provider>
  );
}
}

export default App;
