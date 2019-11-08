import React, { Component } from 'react';
import './App.css';
import Home from './Products/Home/ShopProducts'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[{ id: 1, name: "IPhone 7", price: 900, status:false},
                { id: 2, name: "Iphone 7 plus", price: 1100,status:false},
                { id: 3, name: "Iphone 8", price: 1150,status:false},
                { id: 4, name: "Iphone 8 plus", price: 1200,status:false},
                { id: 5, name: "Iphone X", price: 1800,status:false},
                { id: 6, name: "Samsung Note 8", price: 1250,status:false},
                { id: 7, name: "Samsung Note 9", price: 1300,status:false},
                { id: 8, name: "Samsung Note 10", price: 1800,status:false},
                { id: 9, name: "Oppo F11", price: 650,status:false},
                { id: 10, name: "Oppo Neo X", price: 900,status:false},
                { id: 11, name: "Nokia 7", price: 800,status:false},
                { id: 12, name: "Nokia 8", price: 650,status:false}
        ]};
    localStorage.setItem("AllProducts",JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        {
          this.state.list.map((e,item) => <Home key={e.id} info={e}  />)
        }
      </div>
    );
  }
}

export default App;
