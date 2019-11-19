import React,{Component} from 'react';

export default class ProductCard extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.item._id}</td>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price}</td>
                <td>{
                <button onClick={()=>this.props.btnUpdate(this.props.item._id)}>
                {this.props.item.isAdded?"Remove from Cart":"Add to Cart"}
                </button>
                }</td>
                {/* <td><button onClick={()=>this.props.btnRemove(this.props.item._id)}></button></td> */}
                <td><div onClick={()=>this.props.btnDelete(this.props.item._id)} className="btn btn-danger">X</div></td>
            </tr>
        )
    }
} 