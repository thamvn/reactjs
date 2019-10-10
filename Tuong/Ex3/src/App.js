import React from 'react';
// import logo from './logo.svg';
import { HashRouter as Router, Route ,Switch} from 'react-router-dom'
import CheckOutPage from './CheckOutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './Products';
import AddingPage from './AddingPage';
class App extends React.Component {

 
  render(){
    return (
      <Router>
        <Switch>
        <Route path="/" component = {Products} exact></Route> 
        <Route path="/checkout" component = {CheckOutPage} exact></Route> 
        <Route path="/add" component = {AddingPage} exact></Route> 
        </Switch>
      
      </Router>
    );
  }
}

export default App;
