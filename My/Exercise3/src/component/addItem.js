import React, { Component } from 'react';

class Items extends Component {
    render() {
        return (
                <div className="card align-left">
                    <div className="card-body row col-6">
                        <div className="col-4">
                            <h5 className="text-left">{this.props.infor.name} {this.props.infor.model} ${this.props.infor.price}</h5>
                        </div>
                        <div className="col-4">
                            <a className="btn btn-center btn-primary" href="/edit-item" onClick={this.props.editItem}>Edit</a> 
                            <button className="btn btn-center btn-danger" onClick={this.props.deleteItem}>Delete</button>
                        </div>
                    </div>
                </div>
        );
    }
}


export default Items