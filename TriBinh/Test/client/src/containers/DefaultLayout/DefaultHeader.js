import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Modal,ModalHeader,ModalFooter,ModalBody,Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    const account = JSON.parse(localStorage.getItem("user"));
    if(account==null){
      this.state={
        modal:false,
        username:"",
        roleAdmin:false
      }
    }
    else{
      this.state={
        username:account.name,
        roleAdmin:account.roleAdmin
      }
      console.log(account.roleAdmin)
    }
  }

  onToggle=()=>{
    this.setState({
        modal:!this.state.modal
    })
  }

  render() {
    
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    if(this.state.roleAdmin){
      return (
        <>
        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
  
          <Nav className="d-md-down-none" navbar>
            <NavItem className="px-3">
              <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
            </NavItem>
            <NavItem className="px-3">
              <Link to="/users" className="nav-link">Users</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-md-down-none">
              <NavLink to="/base/cart" className="nav-link">
                <i className="fa fa-shopping-cart"></i>
                <Badge pill color="danger">{this.props.cartNum}</Badge>
              </NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
            </NavItem>
            <b className="text-danger">Hi, <mark>{this.state.username}</mark></b>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
                <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                <DropdownItem onClick={this.onToggle}><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* <AppAsideToggler className="d-md-down-none" />
          <AppAsideToggler className="d-lg-none" mobile /> */}
        </React.Fragment>
  
        <Modal isOpen={this.state.modal} toggle={this.onToggle}>
            <ModalHeader toggle={this.onToggle}>Sign Out</ModalHeader>
            <ModalBody>
                <h4>Admin <mark className="bg-warning">{this.state.username}</mark>, Are you sure you want to log out?</h4>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success" onClick={e => this.props.onLogout(e)}>Sign out</button>
            </ModalFooter>
        </Modal>
        </>
      );
    }
    else{
      return (
        <>
        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
  
          <Nav className="ml-auto" navbar>
            <NavItem className="d-md-down-none">
              <NavLink to="/base/cart" className="nav-link">
                <i className="fa fa-shopping-cart"></i>
                <Badge pill color="danger">{this.props.cartNum}</Badge>
              </NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
            </NavItem>
            <b className="text-danger">Hi, <mark>{this.state.username}</mark></b>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
                <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                <DropdownItem onClick={this.onToggle}><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* <AppAsideToggler className="d-md-down-none" />
          <AppAsideToggler className="d-lg-none" mobile /> */}
        </React.Fragment>
  
        <Modal isOpen={this.state.modal} toggle={this.onToggle}>
            <ModalHeader toggle={this.onToggle}>Sign Out</ModalHeader>
            <ModalBody>
                <h4>Admin <mark className="bg-warning">{this.state.username}</mark>, Are you sure you want to log out?</h4>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success" onClick={e => this.props.onLogout(e)}>Sign out</button>
            </ModalFooter>
        </Modal>
        </>
      );
    }

    
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
