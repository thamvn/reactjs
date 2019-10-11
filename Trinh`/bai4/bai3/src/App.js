import React from 'react';
import { HashRouter as Router, Switch, Route} from "react-router-dom"
import routes from './routes'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, idx) =>
            <Route
              key={idx}
              exact={route.exact}
              path={route.path}
              name={route.name}
              render={(props) =>
                <route.component
                  {...props} />} />)}
        </Switch>
      </Router>
    );
  }
}

export default App;
