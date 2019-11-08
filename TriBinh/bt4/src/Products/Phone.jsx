import React,{Component} from 'react';

export default class Phone extends Component{
    render(){
        return(
            <tbody>
                <tr>
                    <td>{this.props.info.name}</td>
                    <td>{this.props.info.price}</td>
                    <td>
                    {
                      this.props.info.ThumbnailPicture ===null ?
                      <img src="https://www.gstatic.com/webp/gallery/1.jpg" height="200"></img>:
                    <img className="img-top" src={this.props.info.ThumbnailPicture} alt="" ></img>
                    }
                    </td>
                    <td>
                {
                    this.props.info.status === false ? 
                <button onClick={this.props.btnUpdate}>Add to Cart</button>:
                <button onClick={this.props.btnUpdate}>Remove to Cart</button>
                }
                    </td>
                </tr>
            </tbody>
        )
    }
}