import React, { Component, Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import './notfound.css';
import AppNavBar from './components/AppNavBar'
import StoreNavBar from './components/StoreNavBar'
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
  handleLoadMoreClick=()=>{
    
  }
  render() {
    const { isAuthenticated,user } = this.props.auth
   
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
    const viewFalse=<Provider store={store}>
      <StoreNavBar/>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <div></div>
            <h1>401</h1>
          </div>
          <h2>Unauthorized</h2>
          <p>You don't have permission to access this page</p>
          <a href="/">home page</a>
        </div>
      </div>
  </Provider>
    return (
      <Fragment>
        {isAuthenticated ? user?user.role==='admin' ?viewTrue:viewFalse:null :<StoreNavBar/>}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(App);
