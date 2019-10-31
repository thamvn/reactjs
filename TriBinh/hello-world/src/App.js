import React,{Component} from 'react';
import './App.css';
// import ReactDOM from 'react-dom';

class Phone extends Component {

  render() {
    return (
      <div className="order-detail">
        <h4>{this.props.take.name}</h4>
        <p>Price: {this.props.take.price} USD</p>
        <p>
          <button disabled={this.props.take.disable} onClick={this.props.buttonUpdate}>Buy!</button>
        </p>
      </div>
    );
  }
}
 
class Order extends Component{
  constructor(props){
    super(props);
    this.buttonUpdate = this.buttonUpdate.bind(this);
    this.state = {
      amount: 0,
      list:[{ id: 1, name: "IPhone 7", price: 900,disable:false},
            { id: 2, name: "Iphone 7 plus", price: 1100,disable:false},
            { id: 3, name: "Iphone 8", price: 1150,disable:false},
            { id: 4, name: "Iphone 8 plus", price: 1200,disable:false},
            { id: 5, name: "Iphone X", price: 1800,disable:false},
            { id: 6, name: "Samsung Note 8", price: 1250,disable:false},
            { id: 7, name: "Samsung Note 9", price: 1300,disable:false},
            { id: 8, name: "Samsung Note 10", price: 1800,disable:false},
            { id: 9, name: "Oppo F11", price: 650,disable:false},
            { id: 10, name: "Oppo Neo X", price: 900,disable:false},
            { id: 11, name: "Nokia 7", price: 800,disable:false},
            { id: 12, name: "Nokia 8", price: 650,disable:false}
    ]};
  }

  buttonUpdate(item){
    this.setState((prevState)=>{
        this.state.amount = prevState.amount + this.state.list[item].price;
        this.state.list[item].disable = true;
        console.log(this.state.list[item].disable);
      localStorage.setItem('mylocalStorage',this.state.amount);
      localStorage.getItem('mylocalStorage');

        return{
          amount: this.state.amount,
          list: this.state.list,
        }
    });
  }

  render() 
  {
    return(
      <div>
        {
        this.state.list.map((e,item) =>  <Phone key={e.id} take={e} buttonUpdate={() => this.buttonUpdate(item)}
          />)}
       
       <p className="Total">Total: <b>{this.state.amount} USD</b></p>
      </div>
    );
  }
}

export default Order;

// class OrderDetail extends Component {
//   render() {
//     return (
//       <div className="order-detail">
//         <h4>{this.props.name}</h4>
//         <p>Price: {this.props.price} USD</p>
//         <p>
//           <button disabled={this.props.disable} onClick={this.props.addHandler}>Buy!</button>
//         </p>
//       </div>
//     );
//   }
// }

// class Order1 extends Component {
//   constructor(props) {
//     super(props);
 
//     this.state = {
//       amount: 0,
//       disable: false,
//       details: [
//         { id: 1, productName: "IPhone 7", price: 900},
//         { id: 2, productName: "Iphone 7 plus", price: 1100},
//         { id: 3, productName: "Iphone 8", price: 1150},
//         { id: 4, productName: "Iphone 8 plus", price: 1200},
//         { id: 5, productName: "Iphone X", price: 1800},
//         { id: 6, productName: "Samsung Note 8", price: 1250},
//         { id: 7, productName: "Samsung Note 9", price: 1300},
//         { id: 8, productName: "Samsung Note 10", price: 1800},
//         { id: 9, productName: "Oppo F11", price: 650},
//         { id: 10, productName: "Oppo Neo X", price: 900},
//         { id: 11, productName: "Nokia 7", price: 800},
//         { id: 12, productName: "Nokia 8", price: 650}
//       ]
//     };
//   }
 
//   updateOrder(index) {
//     // let tmpList = this.state.details;
//     // tmpList[1].disable = true;
//     // this.setState({details: tmpList});
//         this.setState((prevState, props) => { 
//             this.state.amount = prevState.amount + 1 * prevState.details[index].price;
//             this.state.disable = true;
//             let btn = this.state.disable;
//             return {
//               amount: this.state.amount,
//               details: this.state.details,
//               disable: btn
//               };
//       });
//   }
 
//   render() {
//     var detailTags = this.state.details.map((e, index) => (
//       <OrderDetail
//         key={e.id}
//         addHandler={() => this.updateOrder(index)}
//         productName={e.productName}
//         price={e.price}
//       />
//     ));
//     return (
//       <div>
//         {detailTags}
//         <div />
//         <p className="Total">Total: <b>{this.state.amount} USD</b></p>
//       </div>
//     );
//   }
// }
 
// export default Order1;




// class Phone1 extends Component {
//   constructor(props){
//     super(props);
//     this.buttonUpdate = this.buttonUpdate.bind(this);
//     this.state = {amount:0 ,name:"Iphone 7" , price: 500, disable: false};
//   }

//   buttonUpdate(){
//     let order = this.state.amount + 1 * this.state.price;
//     let btn = true;
//     console.log(this.state.name);
//     this.setState({amount: order, disable: btn});
//   }

//   render() {
//     return (
//       <div className="order-detail">
//         <h4>{this.state.name}</h4>
//         <p>Price: {this.state.price} USD</p>
//         <p>
//           <button disabled={this.state.disable} onClick={this.buttonUpdate}>Buy!</button>
//         </p>
//       </div>
//     );
//   }
// }

// class Phone2 extends Component {
//   constructor(props){
//     super(props);
//     this.buttonUpdate = this.buttonUpdate.bind(this);
//     this.state = {amount:0 ,name:"Iphone 8" , price: 700, disable: false};
//   }

//   buttonUpdate(){
//     let order = this.state.amount + 1 * this.state.price;
//     let btn = true;
//     console.log(this.state.name);
//     this.setState({amount: order, disable: btn});
//   }

//   render() {
//     return (
//       <div className="order-detail">
//         <h4>{this.state.name}</h4>
//         <p>Price: {this.state.price} USD</p>
//         <p>
//           <button disabled={this.state.disable} onClick={this.buttonUpdate}>Buy!</button>
//         </p>
//       </div>
//     );
//   }
// }

// class Phone3 extends Component {
//   constructor(props){
//     super(props);
//     this.buttonUpdate = this.buttonUpdate.bind(this);
//     this.state = {amount:0 ,name:"Iphone 7 Plus" , price: 700, disable: false};
//   }

//   buttonUpdate(){
//     let order = this.state.amount + 1 * this.state.price;
//     let btn = true;
//     console.log(this.state.name);
//     this.setState({amount: order, disable: btn});
//   }

//   render() {
//     return (
//       <div className="order-detail">
//         <h4>{this.state.name}</h4>
//         <p>Price: {this.state.price} USD</p>
//         <p>
//           <button disabled={this.state.disable} onClick={this.buttonUpdate}>Buy!</button>
//         </p>
//       </div>
//     );
//   }
// }

// class Phone4 extends Component {
//   constructor(props){
//     super(props);
//     this.buttonUpdate = this.buttonUpdate.bind(this);
//     this.state = {amount:0 ,name:"Iphone 8 Plus" , price: 800, disable: false};
//   }

//   buttonUpdate(){
//     let order = this.state.amount + 1 * this.state.price;
//     let btn = true;
//     console.log(this.state.name);
//     this.setState({amount: order, disable: btn});
//   }

//   render() {
//     return (
//       <div className="order-detail">
//         <h4>{this.state.name}</h4>
//         <p>Price: {this.state.price} USD</p>
//         <p>
//           <button disabled={this.state.disable} onClick={this.buttonUpdate}>Buy!</button>
//         </p>
//       </div>
//     );
//   }
// }

// class Phone5 extends Component {
//   constructor(props){
//     super(props);
//     this.buttonUpdate = this.buttonUpdate.bind(this);
//     this.state = {amount:0 ,name:"Iphone X" , price: 1000, disable: false};
//   }

//   buttonUpdate(){
//     let order = this.state.amount + 1 * this.state.price;
//     let btn = true;
//     console.log(this.state.name);
//     this.setState({amount: order, disable: btn});
//   }

//   render() {
//     return (
//       <div className="order-detail">
//         <h4>{this.state.name}</h4>
//         <p>Price: {this.state.price} USD</p>
//         <p>
//           <button disabled={this.state.disable} onClick={this.buttonUpdate}>Buy!</button>
//         </p>
//       </div>
//     );
//   }
// }

// class Phone6 extends Component {
//   constructor(props){
//     super(props);
//     this.buttonUpdate = this.buttonUpdate.bind(this);
//     this.state = {amount:0 ,name:"Iphone 11" , price: 1300, disable: false};
//   }

//   buttonUpdate(){
//     let order = this.state.amount + 1 * this.state.price;
//     let btn = true;
//     console.log(this.state.name);
//     this.setState({amount: order, disable: btn});
//   }
  
//   render() {
//     return (
//       <div className="order-detail">
//         <h4>{this.state.name}</h4>
//         <p>Price: {this.state.price} USD</p>
//        <p className="Total">Buy this : <b>{this.state.amount} USD</b></p>

//         <p>
//           <button disabled={this.state.disable} onClick={this.buttonUpdate}>Buy!</button>
//         </p>
//       </div>
//     );
//   }
// }
 
// class Order extends Component{
//   render() 
//   {
//     return(
//       <div>
//         <Phone1 />
//         <Phone2 />
//         <Phone3 />
//         <Phone4 />
//         <Phone5 />
//         <Phone6 />
//        <p className="Total">Total: <b>{this.props.amount} USD</b></p>
//       </div>
//     );
//   }
// }

// export default Order;