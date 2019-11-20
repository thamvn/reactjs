import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { userService } from '../../services/userservices';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:'',
      password:'',
      message:''
    }
  }

  onUserHandler=(e)=>{
    let input = e.target.value;
    if(!input){
      this.setState({message:"Username is required!!"})
    }
    else{
      this.setState({email:input,message:""});
    }
  }

  onPasswordHandler=(e)=>{
    let input = e.target.value;
    if(!input){
      this.setState({message:"Password is required!!"})
    }
    this.setState({password:input,message:""});
  }

  onSubmit = (e) => {
      e.preventDefault();
      let users = {
        email: this.state.email,
        password: this.state.password
      }
      userService.loginUser(users)
                .then(res=>{
                  this.setState({
                    message:res.message
                  });
                  if(res.token){
                    localStorage.setItem('token',res.token)
                    localStorage.setItem('user',JSON.stringify(res.user))
                    this.props.history.push('/dashboard');

                  }
                })
                .catch(err=>console.log(err))

    //   let account = JSON.parse(localStorage.getItem('users'));
    //   console.log("1: ", account)
    // const credentials = {username: this.state.username, password: this.state.password};
    // console.log("2: ", credentials);
    //     if(account.username === credentials.username && account.password === credentials.password){
    //       console.log(account.username===credentials.username)
    //         this.props.history.push('/dashboard');
    //       this.setState({message: ""});
    //       localStorage.setItem("userInfo", JSON.stringify(credentials));
    //     }
    //     else{
    //       console.log(account.username===credentials.username)
    //       this.setState({message: "Wrong name or password!!"});
    //     }

    };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form >
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {this.state.message===""?
                          <hr></hr>  :
                          <b className="text-danger">{this.state.message}</b>
                      }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(e)=>this.onUserHandler(e)} type="email" placeholder="Email" autoComplete="username" required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(e)=>this.onPasswordHandler(e)} type="password" placeholder="Password" autoComplete="current-password" required />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" onClick={this.onSubmit}  color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
