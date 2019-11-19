import React,{Component} from 'react';
import { Badge } from 'reactstrap';

export default class UserCard extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.username}</td>
                <td>
                    {this.props.user.status?
                    <Badge color="success">Active</Badge>:<Badge color="danger">DeActive</Badge>}
                </td>
            </tr>
        )
    }
} 