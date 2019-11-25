import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { userService } from '../../services/userservices';
import UserAdmin from '../../component/UserAdmin';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state={
      users:[]
    }
  }

  componentDidMount() {
      userService.getUsers().then(
        (list)=>{
          return this.setState({
            users:list
          })
        }
      ).catch(function(err){
        console.log(err);
      })
  }

  render() {
    const mapUsers = this.state.users.map((e,Num)=>
    <UserAdmin key={e._id} accounts={e} num={Num} />)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
              {mapUsers}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Admin;
