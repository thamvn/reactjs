import React,{Component,Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
     } from 'reactstrap';
import {connect} from 'react-redux'
import Logout from './auth/Logout';
import Login from './auth/Login';
import RegisterModal from './auth/RegisterModal';
class StoreNavBar extends Component {
    constructor(props) {
        super(props)
        this.state=({
            isOpen:false
        })
    }
    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    render() {
        const{isAuthenticated,user}=this.props.auth
        console.log(user)
        const authLinks=(
            <Fragment>
                
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user?`Welcome ${user.name}`:''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>

            </Fragment>
        );
        const guestLinks=(
            <Fragment>
                <NavItem>
                    
                       <RegisterModal/>
                    
                </NavItem>

                <NavItem>
                    <Login />
                </NavItem>
                
            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">NguyenThaiBinh</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated?authLinks:guestLinks}
                                <NavItem>
                                    <NavLink href="/cart">
                                        Cart
                                     </NavLink>
                                </NavItem>
                                
                               
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps,null)(StoreNavBar)
