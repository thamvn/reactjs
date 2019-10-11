import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './routes'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null    ,
          thumbnail:null      
        }
      ],
      pickedItems: [],
      products:[
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null     ,
          thumbnail:null     
        },
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null     ,
          thumbnail:null     
        },
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null,
          thumbnail:null          
        },
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null,
          thumbnail:null          
        },
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null,
          thumbnail:null          
        },
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null,
          thumbnail:null          
        },
        {
          name: "item 1",
          price: "5",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 2",
          price: "2",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 3",
          price: "1",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 4",
          price: "4",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 5",
          price: "3",
          imagePreviewUrl:null,
          thumbnail:null
        },
        {
          name: "item 6",
          price: "7",
          imagePreviewUrl:null,
          thumbnail:null          
        }
      ]
    }
    this.refreshList = this.refreshList.bind(this);
    this.pickedItem = this.pickedItem.bind(this);
    this.addProduct=this.addProduct.bind(this);
  }

  addProduct(newProList){
    this.setState({products:newProList})
  }

  refreshList(newList) {
    this.setState({ items: newList })
  }

  pickedItem(pickedList) {
    this.setState({ pickedItems: pickedList })
  }

  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/" exact render={(props) => <Home listItems={this.state.items} picked={this.state.pickedItems} newList={this.refreshList} pickedList={this.pickedItem} {...props}  />}/> */}
          {/* <Route path="/items" exact render={(props) => <ListItems listItems={this.state.items} picked={this.state.pickedItems} newList={this.refreshList} pickedList={this.pickedItem} {...props} />} /> */}
          {/* <Route path="/checkout" exact render={(props) => <Checkout listItems={this.state.items} picked={this.state.pickedItems} newList={this.refreshList} pickedList={this.pickedItem} {...props} />} /> */}
          {routes.map((route, idx) =>
            <Route
              key={idx}
              exact={route.exact}
              path={route.path}
              name={route.name}
              render={(props) =>
                <route.component
                  listItems={this.state.items}
                  picked={this.state.pickedItems}
                  newList={this.refreshList}
                  pickedList={this.pickedItem}
                  listProd={this.state.products}
                  newProd={this.addProduct}
                  {...props} />} />)}
        </Switch>
      </Router >
    );
  }
}

export default App;
