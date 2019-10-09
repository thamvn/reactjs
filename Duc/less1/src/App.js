import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './search';
import Add from './add';

class App extends React.Component {
  state = {
    Users: []
  }
  addUser = (user) => {
    var list = this.state.Users;
    list.push(user);
    console.log("user list:" + JSON.stringify(list))
    this.setState({ Users: list })

  }
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-12">
            <div className="col-md-6">
              <Search list={this.state.Users}></Search>
            </div>
            <div className="col-md-6">
              <Add add={this.addUser}></Add>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
