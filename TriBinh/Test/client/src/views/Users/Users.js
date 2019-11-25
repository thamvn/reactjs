import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

// import usersData from './UsersData'
import { userService } from '../services/userservices';

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user._id.toString()}`

  const getBadge = (status) => {
    return status === true ? 'success' : 'danger';
  }

  const getBadgeAdmin = (status) => {
    return status === true ? 'warning' : 'info'
  }

  const setStatus = (status) => {
    return status === true ? "Active" : "DeActive"
  }

  const setRole = (status) => {
    return status === true ? "Admin" : "User"
  }

  return (
    <tr key={user._id.toString()}>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.email}</td>
      <td><Link to={userLink}><Badge color={getBadgeAdmin(user.roleAdmin)}>{setRole(user.roleAdmin)}</Badge></Link></td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{setStatus(user.status)}</Badge></Link></td>
    </tr>
  )
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData:[]
    }
  }
  
  componentWillMount() {
    userService.getUsers().then(
      (list)=>{
        this.setState({
          usersData:list 
        })
      }
    ).catch(function(err){
      console.log(err);
    })
  }

  render() {
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">email</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersData.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
