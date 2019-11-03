import React from 'react';
import ReactDOM from 'react-dom';
import ShopProducts from './Products/Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShopProducts />, div);
});
