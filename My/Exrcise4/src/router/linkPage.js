import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import Cart from './../component/cartDetail';
import FormAdd from '../component/formItem';
import FormEdit from '../component/editItem'
import Paginating from '../component/paging'
class Page extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/add" component={FormAdd} />
                    <Route exact path="/" component={Paginating} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/edit-item" component={FormEdit} />
                </div>
            </Router>
        );
    }
}

export default Page;