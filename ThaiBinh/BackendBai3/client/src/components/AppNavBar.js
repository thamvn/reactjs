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
import Logout from './auth/Logout';
import {connect} from 'react-redux';
class AppNavBar extends Component {
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

            </Fragment>)
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/dashboard">NTB</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            {isAuthenticated?authLinks:''}
                                <NavItem>
                                    <NavLink href="/">
                                        Store
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
export default connect(mapStateToProps,null)(AppNavBar)
