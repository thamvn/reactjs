import React, { Component,Fragment } from 'react'
import {logout} from '../../actions/authActions'
import {connect} from 'react-redux'
import {NavLink } from 'reactstrap'
class Logout extends Component {
    render() {
        return (
            <Fragment>
                <NavLink href="#" onClick={this.props.logout}>Logout</NavLink>
            </Fragment>
        )
    }
}
export default connect(null,{logout})(Logout);
