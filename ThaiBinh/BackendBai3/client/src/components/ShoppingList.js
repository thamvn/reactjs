import React, { Component } from 'react'
import { Container, Button, Table } from 'reactstrap'


import { connect } from 'react-redux'
import { getProducts, deleteProduct, getProductsByPage, countProducts } from '../actions/productActions'
// import PropTypes from 'prop-types',

class ShoppingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            currentPage: 1,
            productsPerPages: 5,
            totalPages: '',
            disable:false,
        }
    }
    componentDidMount() {
        console.log('didmount')
        let { currentPage, productsPerPages } = this.state
        this.props.getProductsByPage(currentPage, productsPerPages)
            .then(items => this.props.countProducts()
                .then(
                    num =>this.setState({
                        products:items.payload,
                        totalPages:Math.ceil(num.payload/productsPerPages)
                    })
                )
            )

    }
    componentDidUpdate(prevProps,prevState){
        let {currentPage,productsPerPages,totalPages}=this.state;
        
        let newProducts=[...this.state.products]
        
        if(prevState.currentPage!==this.state.currentPage){
            
            this.props.getProductsByPage(currentPage,productsPerPages).then(items=>{
                for(let i=0;i<items.payload.length;i++){
                    newProducts.push(items.payload[i])
                }
                if(currentPage===totalPages){
                    this.setState({
                        products:newProducts,
                        disable:true,
                    })
                }
                this.setState({
                    products:newProducts
                })
                console.log(newProducts)
            })
            
        }
    }
    onDeleteClick = (id) => {
        this.props.deleteProduct(id)

    }
    onLoadMoreClick = () => {
        let {currentPage}=this.state
        if(currentPage<this.state.totalPages)
        {
            this.setState({
                currentPage:this.state.currentPage+1
            })
        }
        
    }
    render() {
        const { products } = this.state
        
        return (
            <div>

                <Container style={{ marginTop: "5%" }}>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Product image</th>
                                <th colSpan="2" style={{ textAlign: "center" }} >Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {products !== null && products.length > 0 ? products.map(({ _id, name, productImg, price }) => (
                                <tr key={_id}>
                                    <th scope="row">{_id}</th>

                                    <td>{name}</td>
                                    <td>{price}</td>
                                    <td><img src={`../../../${productImg}`} alt="" style={{ width: "100px", height: "70px" }} /></td>
                                    <td>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="md"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >Delete
                                </Button>

                                    </td>
                                    <td>

                                        <Button
                                            className="edit-btn"
                                            color="primary"
                                            size="md"
                                            onClick={this.props.onEditClick.bind(this, _id)}
                                        >Edit
                              </Button>


                                    </td>

                                </tr>
                            )) : null}



                        </tbody>


                    </Table>
                    <Button disabled={this.state.disable} onClick={() => this.onLoadMoreClick()} size="lg" color="secondary">Load More</Button>

                </Container>


            </div>
        )
    }
}

// ShoppingList.propTypes={
//     getProducts:PropTypes.func.isRequired,
//     product:PropTypes.object.isRequired
// }

const mapStatetoProps = (state) => ({
    products: state.products
})

export default connect(mapStatetoProps,
    {
        getProducts, getProductsByPage,
        deleteProduct, countProducts
    })(ShoppingList)
