import React, { Component } from 'react';
import '../../App.css';
import Phone from '../Phone';

export default class Home extends Component {
  constructor(props){
    super(props);
    var Session = JSON.parse(localStorage.getItem("Products"));
    if(Session != null){
        this.state={
          amount: Session.amount,
          list: Session.list,
          cart: Session.cart,
      };
    }
    else{
    this.state={
      cart:[],
      amount: 0, 
      list:[{ id: 1, name: "IPhone 7", price: 900, status:false,ThumbnailPicture:""},
                { id: 2, name: "Iphone 7 plus", price: 1100,status:false,ThumbnailPicture:"",},
                { id: 3, name: "Iphone 8", price: 1150,status:false,ThumbnailPicture:""},
                { id: 4, name: "Iphone 8 plus", price: 1200,status:false,ThumbnailPicture:""},
                { id: 5, name: "Iphone X", price: 1800,status:false,ThumbnailPicture:""},
                { id: 6, name: "Samsung Note 8", price: 1250,status:false,ThumbnailPicture:""},
                { id: 7, name: "Samsung Note 9", price: 1300,status:false,ThumbnailPicture:""},
                { id: 8, name: "Samsung Note 10", price: 1800,status:false,ThumbnailPicture:""},
                { id: 9, name: "Oppo F11", price: 650,status:false,ThumbnailPicture:""},
                { id: 10, name: "Oppo Neo X", price: 900,status:false,ThumbnailPicture:""},
                { id: 11, name: "Nokia 7", price: 800,status:false,ThumbnailPicture:""},
                { id: 12, name: "Nokia 8", price: 650,status:false,ThumbnailPicture:""}
        ],
        sort: {
          column: null,
          direction: "desc",
        },
      };
    }
  }

  ClicktoAdd(item){
    if(this.state.list[item].status === false){
      let amount = this.state.amount + this.state.list[item].price;
      let status = this.state.list[item].status = true;
      this.setState({
          amount:amount,
          status: status
        });
    }

    else{
        this.setState((prevState)=>{
          let amount = prevState.amount - prevState.list[item].price;
            let status = this.state.list[item].status = false;
            return {
            amount:amount,
            status: status
          }});
    }
  }

  onSort = (column) => (e) => {
    const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
    const sortedData = this.state.data.sort((a, b) => {
      if (column === 'name') {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.price.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        // names must be equal
        return 0;
      } else {
        return a.price - b.price;
      }
    });
  
    if (direction === 'desc') {
      sortedData.reverse();
    }
  
    this.setState({
      list: sortedData,
      sort: {
        column,
        direction,
      }
    });
  };

  render() {
    localStorage.setItem("Products",JSON.stringify(this.state));
    return (
      <div className="container">
        <h1 className="text-center">STORE</h1>
          
        <h4><a href="/add-product">Add an Item</a></h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th onClick={this.onSort('name')}>Ten san pham</th>
                <th onClick={this.onSort('price')}>Gia san pham</th>
                <th>Hinh anh</th>
              </tr>
            </thead>
            {
              this.state.list.map((e,item) => <Phone key={e.id} info={e} btnUpdate={() => this.ClicktoAdd(item)} />)
            }
            </table>
        </div>
          <a href="/check-out">Move to Check Out</a>
        <h2 className="text-right m-5 text-danger ">  Total : {this.state.amount} </h2>
      </div>
    );
  }
}
