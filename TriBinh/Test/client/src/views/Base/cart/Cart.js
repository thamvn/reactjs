import {Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import React,{Component} from 'react';
import { cartService } from '../../services/cartservices';

export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state={
            cart:[]
        }
    }

    componentDidMount() {
        cartService.getCart().then(
            (list)=>this.setState({
              cart:list 
            })
          ).catch(function(err){
            console.log(err);
          })
    }

    onStore = () => {
        this.props.history.push('/base/tables');
      }

    render(){
        return(
            <div className="animated fadeIn">
                <Row>
                <Col>
                    <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Cart Details
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>ItemName</th>
                                <th>ItemPrice</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.cart.length===0?
                            <tr>
                                <td colSpan="3">No item in cart</td>
                            </tr>:
                            this.state.cart.map((item, Num) => 
                                <tr>
                                    <td>{Num+1}</td>
                                    <td>{item.name}</td>
                                    <td>$ {item.price}</td>                                
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">
                                    <b>Total</b>
                                </td>
                                <td>$ {this.state.cart.map(item => {return item.price}).reduce((a,b) => a + b, 0 )}</td>
                            </tr>
                        </tfoot>        
                        </Table>
                        <div className="text-center">
                        <Button className="btn-info" onClick={this.onStore}>Continue Shopping?</Button>
                        </div>
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
        )
    }
}
