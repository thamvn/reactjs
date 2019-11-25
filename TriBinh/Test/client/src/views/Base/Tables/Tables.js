import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { cartService } from '../../services/cartservices';
import { itemService } from '../../services/itemservices';
import { userService } from '../../services/userservices';
import ProductCard from '../../component/ProductCard';
import UserCard from '../../component/UserCard';

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      cart: [],
      users: [],
    }
  }

  componentDidMount() {
    itemService.getProducts().then(
      (list)=>{
        this.setState({
          products:list 
        })
      }
    ).catch(function(err){
      console.log(err);
    })

    userService.getUsers().then(
      (list)=>{
        this.setState({
          users:list 
        })
      }
    ).catch(function(err){
      console.log(err);
    })

    cartService.getCart().then(
      (list)=>{
          this.props.newList(list);
          this.setState({
          cart:list 
      });
    }
    ).catch(function(err){
      console.log(err);
    })
  }

  btnAddorRemove = (id) => {
    let list = [...this.state.products];
    for(var i in list){
      if(list[i]._id===id){
        if(!list[i].isAdded){
          list[i].isAdded=true;
          this.setState({
            products: list
          })
          cartService.addToCart(list[i]);
          cartService.getCart().then(res => {
            this.props.newList(res);
            this.setState({cart:res});
          });
          itemService.changeStyleStatus(id);
         }

        else {
          list[i].isAdded = false;
          this.setState({
            products: list
          });
          cartService.removeFromCart(id);
          cartService.getCart().then(res => {
            this.props.newList(res);
            this.setState({cart:res});
          });
          itemService.changeStyleStatus(id);

        }
      }
    }
  }

  onCheckOut = () => {
    this.props.history.push('/cart');
  }

  onAddNewProduct = () => {
    this.props.history.push('/base/products');
  }
  
  onCheckOut=()=>{
    this.props.history.push('/base/cart');
  }

  deleteItem = (id) => {
  //   let products = [...this.state.products];
  //   let item = products.findIndex(item => item.id === id);
  //   console.log(id)
  //   console.log(products[id-1].isAdded)
  //   if(products[id-1].isAdded){
  //    alert(`Sorry!! This ${products[id-1].name} is existed in cart, you can't delete it!!`);
  //   }
  //  else{
  //   products.splice(item,1);
  //   localStorage.setItem("products", JSON.stringify(products));
  //     this.setState({
  //       products : products,
  //     })
  //  }
      itemService.deleteItem(id).then((res)=>{
        let products = [...this.state.products];
        let list = products.filter(item => item._id !== id)
        this.setState({products:list});
        // if(res._id){
        //   let products = [...this.state.products]
        //   for(var i in products){
        //     if(products[i]._id===res._id){
        //       products.splice(i,1)
        //     }
        //   }
        //   this.setState({products:products})
        // }
      });
  }

  render() {
    const mapProducts = this.state.products.map((e)=>
    <ProductCard key={e._id} item={e} btnDelete={this.deleteItem} btnUpdate={()=>this.btnAddorRemove(e._id)}/>)
    const mapUsers = this.state.users.map((e)=>
    <UserCard key={e._id} user={e} />)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> User Management Data Table
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>DisplayName</th>
                      <th>Username</th>
                      <th>Status</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                   {mapUsers}
                  </tbody>
                </Table>
                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Products Management Data Table
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                      {mapProducts}
                  </tbody>
                </Table>
                <div className="text-center">
                  <button className="btn-warning" onClick={this.onCheckOut}>Move to Check Out</button>
                  <button className="btn-secondary" onClick={this.onAddNewProduct}>Add new Product</button>
                </div>
                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Tables;
