import { Col, Card } from 'react-bootstrap';
import React, {Component} from 'react';

class ListProductCheckOut extends Component{
    render(){
      return(
        
            <Col md={3}>
              <Card style={{ width: '14rem' }}>
                <Card.Body>
                  <Card.Title>{this.props.info.name}</Card.Title>
                  <Card.Text>
                        Price: {this.props.info.price} USD
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
      );
    }
  }

class CheckOut extends Component{
    constructor(props){
        super(props);
        let li = JSON.parse(localStorage.getItem('session'));
        
        for (var i in li.list) {
            if(li.list[i].status === "Add to Cart")
            {
                delete li.list[i];
            }
        }
        
        this.state={
            listProduct : li.list,
            amount: li.amount
        };
    };

    render(){
        return(
            <div>
                <a className="btn" href="/">Back to Store</a>
                {
                    this.state.listProduct.map((e) => <ListProductCheckOut key={e.id} info={e} />)
                }
                 <h2 className="text-danger ">  Total : {this.state.amount} </h2>
            </div>
        );
    }
}

export default CheckOut;