import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { userService } from '../services/userservices';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editStatus:false,
      usersData:[]
    }
  }

  componentDidMount() {
    userService.getUsers().then(
      (list)=>{
        list.find(user => user._id.toString() === this.props.match.params.id);
        for(var i in list){
          if(this.props.match.params.id === list[i]._id){
            console.log(list[i])
            this.setState({
              usersData:list[i] 
            })
          }
        }
      }
    ).catch(function(err){
      console.log(err);
    })
  }

  renderEditStatus =()=>{
    if(!this.state.editStatus){
      return(
        <CardBody>
        <Table responsive striped hover>
        <tbody>
          <tr>
            <td>Name : </td>
            <td>{this.state.usersData.name}</td>
          </tr>
          <tr>
            <td>Email : </td>
            <td>{this.state.usersData.email}</td>
          </tr>
          <tr>
            <td>Status : </td>
            <td>
              {this.state.usersData.status?
              <Badge color="success">Active</Badge>:
              <Badge>DeActive</Badge>}
            </td>
          </tr>
          <tr>
            <td>Role Admin : </td>
            <td>{this.state.usersData.roleAdmin?
              <Badge color="warning"><b>Admin</b></Badge>:
              <Badge color="info">User</Badge>}</td>
          </tr>
        </tbody>
        </Table>
        <button onClick={() => this.setState({ editStatus: !this.state.editStatus})}>Change status</button>
        </CardBody>
      )
    }
      return(
        <CardBody>
        <Table responsive striped hover>
        <tbody>
          <tr>
            <td>Name : </td>
            <td>{this.state.usersData.name}</td>
          </tr>
          <tr>
            <td>Email : </td>
            <td>{this.state.usersData.email}</td>
          </tr>
          <tr>
            <td>Status : </td>
            <td>
              {/* <input type="checkbox" defaultChecked={this.state.usersData.status} /> */}
              {this.state.usersData.status?
              <Badge color="success">Active</Badge>:
              <Badge>DeActive</Badge>}
            </td>
          </tr>
          <tr>
            <td>Role Admin : </td>
            <td>{this.state.usersData.roleAdmin?
              <Badge color="warning"><b>Admin</b></Badge>:
              <Badge color="info">User</Badge>}</td>
          </tr>
        </tbody>
        </Table>
        <button onClick={() => this.setState({ editStatus: !this.state.editStatus})}>Save</button>
        </CardBody>
      )
  }

  render() {
    // const user = this.state.usersData.find( user => user._id.toString() === this.props.match.params.id)
    // console.log(user)
    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
                      {/* {
                        this.state.usersData.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      } */}
                    {this.renderEditStatus()}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
