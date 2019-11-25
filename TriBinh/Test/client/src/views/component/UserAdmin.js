import React,{Component} from 'react';
import { CardBody,CardHeader,Table,Card } from 'reactstrap';

export default class UserAdmin extends Component{
    render(){
        return(
            <Card>
                <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
                </CardHeader>
                <CardBody>
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.num +1}</td>
                            <td>{this.props.accounts.name}</td>
                            <td>{this.props.accounts.email}</td>
                            <td>{this.props.accounts.status}</td>
                            <td>{this.props.accounts.roleAdmin}</td>
                        </tr>
                    </tbody>
                </Table>
                </CardBody>
            </Card>
        )
    }
} 