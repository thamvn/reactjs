import React, { Component, Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import './notfound.css';
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList'
import { Provider } from 'react-redux'
import store from './store';
import { connect } from 'react-redux'
import ProductModal from './components/ProductModal'
import { Container } from 'reactstrap'
import { loadUser } from './actions/authActions'
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
    
  }

  handleEditClick = (id) => {
    this.props.history.push(`./edit/${id}`)
  }
  render() {
    const { isAuthenticated } = this.props.auth
   
    const viewTrue = <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <ProductModal />
          <ShoppingList
            onEditClick={(id) => this.handleEditClick(id)}
          />
        </Container>

      </div>
    </Provider>
    
    return (
      <Fragment>
        {isAuthenticated ? viewTrue :<AppNavBar/>}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(App);
