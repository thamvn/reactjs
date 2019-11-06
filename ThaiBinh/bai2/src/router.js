import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import List from './list';
import Cart from './cart';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class AppRouter extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    
                        <Route exact path="/cart" component={Cart} />
                            
                        <Route exact path="/" component={List} />
                       
                        
                       
                    

                </Router>
            </div>
        );
    }
}
export default AppRouter;