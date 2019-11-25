import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { userService } from '../../services/userservices';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      email:"",
      password:"",
      message:'',
    }
  }

  onUserHandler=(e)=>{
    let input = e.target.value;
      this.setState({name:input,message:""});
  }

  onEmailHandler=(e)=>{
    let input = e.target.value;
      this.setState({email:input,message:""});
  }

  onPasswordHandler=(e)=>{
    let input = e.target.value;
    this.setState({password:input,message:""});
  }

  onSubmit = (e) => {
    e.preventDefault();
    let users = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    userService.registerUser(users)
              .then(res=>{
                this.setState({
                  message:res.message
                });
              })
              .catch(err=>console.log(err))
    }

  onReturnLogin=()=>{
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                      {   this.state.message===""?
                          <hr></hr>  :
                          <b className="text-danger">{this.state.message}</b>
                      }
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e)=>this.onUserHandler(e)} placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-envelope"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" onChange={(e)=>this.onEmailHandler(e)} placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" onChange={(e)=>this.onPasswordHandler(e)} placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    {/* <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup> */}
                    <Button type="submit" onClick={this.onSubmit} color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="4">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="4">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                    <Col xs="12" sm="4">
                      <Button onClick={this.onReturnLogin} className="btn mb-1" block><span>Sign In</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
