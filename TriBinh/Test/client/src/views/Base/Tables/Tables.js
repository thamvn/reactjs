import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { cartService } from '../../services/cartservices';
import { itemService } from '../../services/itemservices';
import { userService } from '../../services/userservices';
import ProductCard from '../../component/ProductCard';
import UserCard from '../../component/UserCard';
// import axios from 'axios';

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
    //   itemService.getProducts().then(productFromStore=>{
    //     let products = JSON.parse(localStorage.getItem("products"));
    //     if(!products){
    //       let cart = JSON.parse(window.localStorage.getItem('cart'))||[];
    //         cart.forEach(element => {
    //             try{
    //                 productFromStore.find(p => {return p.id === element.id}).isAdded = true;
    //             }finally{ }
    //         });
    //         this.setState({products: productFromStore});
    //     }
    //     //Get data from Cart
    //     else{
    //         let cart = JSON.parse(window.localStorage.getItem('cart'))||[];
    //       console.log(products)
    //       cart.forEach(element => {
    //           try{
    //             products.find(p => {return p.id === element.id}).isAdded = true;
    //           }finally{ }
    //       });
    //       this.setState({products: products});
    //     }
    // });

    itemService.getProducts().then(
      (list)=>{
        this.setState({
          products:list 
        })
        console.log("1:",list)
      }
    ).catch(function(err){
      console.log(err);
    })

    userService.getUsers().then(
      (list)=>{
        this.setState({
          users:list 
        })
        console.log("2:",list)
      }
    ).catch(function(err){
      console.log(err);
    })
  }

  btnAddorRemove = (id) => {
    console.log(id)
    let list = [...this.state.products];
    for(var i in list){
      if(list[i]._id===id){
        if(!list[i].isAdded){
          list[i].isAdded=true;
          this.setState({
            products: list
          })
          cartService.addToCart(list[i]);
         }

        else {
          list[i].isAdded = false;
          this.setState({
            products: list
          });
          cartService.removeFromCart(id);
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

  clearSession = () => {
    this.props.history.push('/');
    localStorage.removeItem("userInfo");
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
        this.setState({
        products : this.state.products,
      })
      itemService.deleteItem(id);
  }

  render() {
    const mapProducts = this.state.products.map((e,id)=>
    <ProductCard key={e.id} item={e} btnDelete={this.deleteItem} btnUpdate={()=>this.btnAddorRemove(e._id)}/>)
    const mapUsers = this.state.users.map((e)=>
    <UserCard key={e.id} user={e} />)

    // const mapProducts =this.state.products.map((e,index)=>{
    //     return(
    //       <tr>
    //         <td>{e.id}</td>
    //         <td>{e.name}</td>
    //         <td>{e.price}</td>
    //         <td>{e.isAdded}</td>
    //       </tr>
    //     )
    // })

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
                      <th>ID</th>
                      <th>Username</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                   {mapUsers}
                  </tbody>
                </Table>
                <nav>
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
                </nav>
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
                  <tfoot>
                    <tr>
                      <td>
                        <a className="btn" onClick={this.onCheckOut}>Move to Check Out</a>
                      </td>  
                      <td>
                        <a className="btn"  onClick={this.onAddNewProduct}>Add new Product</a>
                      </td>
                    </tr> 
                  </tfoot>
                </Table>
                <nav>
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
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Tables;
