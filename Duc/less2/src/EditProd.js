import React from 'react'
class EditProd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product
        }
    }
    render() {
        return (
            <div>
                <h4 className="modal-title">Edit product</h4>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Product name</h3>
                        <input type="text" value={this.state.product.name} name="prodName"></input>
                    </div>
                    <div className="col-md-6">
                        <h3>Price</h3>
                        <input type="text" value={this.state.product.price} name="prodPrice"></input>
                    </div>
                    <div className="col-md-6">
                        <input type="button" value="Save"></input>
                        <input type="button" value="Cancel"></input>
                    </div>
                </div>
            </div>
        )
    }
}
export default EditProd