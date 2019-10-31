import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

class Phone extends Component{
  render(){
    return(
      
          <Col md={3}>
            <Card style={{ width: '14rem' }}>
              <Card.Body>
                <Card.Title>{this.props.info.name}</Card.Title>
                <Card.Text>
                      Price: {this.props.info.price} USD
                </Card.Text>
                <Button onClick={this.props.btnUpdate}>{this.props.info.status}</Button>

              </Card.Body>
            </Card>
          </Col>
    );
  }
}

class Store extends Component{
  constructor(props){
    super(props);

    var li = JSON.parse(localStorage.getItem('session'));
    if(li != null){
      this.state={
          list: li.list,
          amount: li.amount
      };
    }
    else{
      this.state={
        amount: 0, 
        list:[{ id: 1, name: "IPhone 7", price: 900, status:"Add to Cart"},
              { id: 2, name: "Iphone 7 plus", price: 1100,status:"Add to Cart"},
              { id: 3, name: "Iphone 8", price: 1150,status:"Add to Cart"},
              { id: 4, name: "Iphone 8 plus", price: 1200,status:"Add to Cart"},
              { id: 5, name: "Iphone X", price: 1800,status:"Add to Cart"},
              { id: 6, name: "Samsung Note 8", price: 1250,status:"Add to Cart"},
              { id: 7, name: "Samsung Note 9", price: 1300,status:"Add to Cart"},
              { id: 8, name: "Samsung Note 10", price: 1800,status:"Add to Cart"},
              { id: 9, name: "Oppo F11", price: 650,status:"Add to Cart"},
              { id: 10, name: "Oppo Neo X", price: 900,status:"Add to Cart"},
              { id: 11, name: "Nokia 7", price: 800,status:"Add to Cart"},
              { id: 12, name: "Nokia 8", price: 650,status:"Add to Cart"}
      ]};
    }
  }

  ClicktoAdd(item){
      if(this.state.list[item].status === "Add to Cart"){
        this.state.list[item].status = "Remove to Cart";
        let amount =  this.state.amount + this.state.list[item].price;
        this.setState(() => {
          return {
            amount:amount,
            list: this.state.list
          }});
      }

      else{
          this.setState((prevState) => {
          this.state.list[item].status = "Add to Cart";
            let amount =  prevState.amount - prevState.list[item].price;
            return {
              amount:amount,
              list: prevState.list
            }});
      }
  }

  render(){
    localStorage.setItem('session',JSON.stringify(this.state));
    return(
      <Container>
        <h1 className="text-center">STORE</h1>
        <Row>
            {
              this.state.list.map((e,item) => <Phone key={e.id} info={e} btnUpdate={() => this.ClicktoAdd(item)} />)
            }
        </Row>
          <a href="/check-out">Move to Check Out</a>
        <h2 className="text-right m-5 text-danger ">  Total : {this.state.amount} </h2>
      </Container>
    );
  }
}

export default Store;
