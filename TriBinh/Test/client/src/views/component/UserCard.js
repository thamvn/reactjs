import React,{Component} from 'react';
import { Badge } from 'reactstrap';

export default class UserCard extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>
                    {this.props.user.status?
                    <Badge color="success">Active</Badge>:<Badge color="danger">DeActive</Badge>}
                </td>
                <td>
                    {this.props.user.roleAdmin?<Badge color="warning">Admin</Badge>:<Badge color="info">User</Badge>}
                </td>
            </tr>
        )
    }
} 