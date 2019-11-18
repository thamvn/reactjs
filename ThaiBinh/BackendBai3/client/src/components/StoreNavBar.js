import React,{Component} from 'react';
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
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">NguyenThaiBinh</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                
                                <NavItem>
                                    <NavLink href="/cart">
                                        Cart
                                    </NavLink>
                                   
                                </NavItem>
                                <NavItem>
                                    
                                    <NavLink href="/dashboard">
                                        Dashboard
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
export default StoreNavBar
