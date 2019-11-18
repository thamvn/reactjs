import React, { Component } from 'react'
import {Container,Button,Table} from 'reactstrap'


import {connect} from 'react-redux'
import {getProducts,deleteProduct   } from '../actions/productActions'
// import PropTypes from 'prop-types'

class ShoppingList extends Component {
   
    componentDidMount(){
        this.props.getProducts();
    }
    onDeleteClick=(id)=>{
        this.props.deleteProduct(id) 
        
    }
    // onChangeEditPrice=(id)=>{
    //     console.log(id)
    // }
    // onChangeEditName=(id)=>{
    //     console.log(id)
    // }
    // onEditClick=(id)=>{
    //     console.log(id)
    // }
    render() {
        
        const {products}=this.props.products;
        
        return (
            <div>
                
                <Container style={{ marginTop: "5%" }}>
                   
                   <Table striped>
                       <thead>
                           <tr>
                               <th>#</th>
                               <th>Product Name</th>
                               <th>Price</th>
                               <th colSpan="2" style={{textAlign:"center"}} >Actions</th>
                               
                           </tr>
                       </thead>
                       <tbody>
                       {products.map(({_id,name,price})=>(
                            <tr key={_id}>
                            <th scope="row">{_id}</th>
                            
                            <td>{name}</td>
                            <td>{price}</td>
                            <td>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="md"
                                    onClick={this.onDeleteClick.bind(this,_id)}
                                    >Delete
                                </Button>
                               
                            </td>
                            <td>
                               {/* <EditProductModal
                               name={name}
                               price={price}
                               onChangeName={this.onChangeEditName}
                               onChangePrice={this.onChangeEditPrice}
                                
                               /> */}
                                <Button
                                    className="edit-btn"
                                    color="primary"
                                    size="md"
                                    onClick={this.props.onEditClick.bind(this,_id)}
                                    >Edit
                                </Button>
                               
                               
                            </td>
                           
                        </tr>
                       ))}
                          
                           
                          
                       </tbody>
                       
                      
                   </Table>
                   
               </Container>
                   
               
            </div>
        )
    }
}

// ShoppingList.propTypes={
//     getProducts:PropTypes.func.isRequired,
//     product:PropTypes.object.isRequired
// }

const mapStatetoProps=(state)=>({
    products:state.products
})

export default connect(mapStatetoProps,
    {getProducts,
    deleteProduct
    })(ShoppingList)
