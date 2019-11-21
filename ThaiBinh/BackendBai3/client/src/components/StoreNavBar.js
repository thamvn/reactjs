import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Badge,

} from 'reactstrap';
import { connect } from 'react-redux'
import Logout from './auth/Logout';
import Login from './auth/Login';
import RegisterModal from './auth/RegisterModal';
class StoreNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            isOpen: false,
            popoverOpen: true

        })
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    togglepopover = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <Fragment>

                <NavItem>

                    <span className="navbar-text mr-3">
                        <strong>{user ? `${user.name}` : ''}</strong>
                    </span>

                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
                <NavItem>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                </NavItem>

            </Fragment>
        );
        const guestLinks = (
            <Fragment>
                <NavItem>

                    <RegisterModal />

                </NavItem>

                <NavItem>
                    <Login />
                </NavItem>

            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
                    <Container>
                        <NavbarBrand href="/">Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                                <NavItem>
                                    <NavLink  href="/cart">
                                    <i className="fa fa-shopping-cart"> {this.props.cartNum > 0 ? <Badge pill color="danger">
                                        {this.props.cartNum}
                                         </Badge>
                                            : ''}</i> 
                                          

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
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(StoreNavBar)
