import React, { Component } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink,Alert
} from 'reactstrap'
import { connect } from 'react-redux';
import { register } from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,
        emailErr:'',
        confirmPasswordErr:'',
    }
    componentDidUpdate(prevProps){
        const {error,isAuthenticated}=this.props;
        if(error !== prevProps.error){
            //Check to register error
            if (error.id ==="REGISTER_FAIL") {
                this.setState({ msg: error.msg.msg });
               
              }
              else{
                  this.setState({
                      msg:null
                  })
              }
        }
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
        }
    }
    toggle = () => {
        //clear Errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onChangeEmail=e=>{
        let regexEmail=/\S+@\S+\.\S+/;
        let email=e.target.value
        if(!regexEmail.test(email)){
            this.setState({
                email:email,
                emailErr:'Please enter valid email'
            })
        }else{
            this.setState({
                email:email,
                emailErr:''
            })
        }

    }
    onChangeConfirmPassword=e=>{
        let password=this.state.password
       let confirmPassword=e.target.value
       
       if(password!==confirmPassword){
        this.setState({
            confirmPasswordErr:'Please enter the same password and confirm password',
            confirmPassword:e.target.value
        })
       }else{
           this.setState({
            confirmPasswordErr:'',
            confirmPassword:e.target.value
           })
       }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state

        //Create User Object
        const newUser={
            name,
            email,
            password
        };

        //Attempt to register

        this.props.register(newUser)

        
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register User</ModalHeader>
                    <ModalBody>
                        {this.state.msg? <Alert color="danger">{this.state.msg}</Alert>:null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mb-3"
                                    placeholder="Enter name"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    placeholder="Enter Email"
                                    onChange={this.onChangeEmail}
                                />
                                 {this.state.emailErr? <Alert color="danger">{this.state.emailErr}</Alert>:null}
                                <Label for="password">Password</Label>
                                <Input
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-3"
                                    placeholder="Enter Password"
                                    onChange={this.onChange}
                                />
                                <Label for="confirmPassword">Confirm password</Label>
                                <Input
                                    required
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="mb-3"
                                    placeholder="Enter Password"
                                    onChange={this.onChangeConfirmPassword}
                                />
                                 {this.state.confirmPasswordErr? <Alert color="danger">{this.state.confirmPasswordErr}</Alert>:null}
                                <Button
                                    color="dark"
                                    style={{ marginTop: "2rem" }}
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error


})
export default connect(mapStateToProps, { register,clearErrors })(RegisterModal)