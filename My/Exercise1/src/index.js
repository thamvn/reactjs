import React from 'react';
import ReactDOM from 'react-dom';
import Garage from './component/Product';
import './index.css';

localStorage.setItem('product',JSON.stringify([{name:"Audi" ,model:"R8" ,price:50000,disble:false},
{name:"Ford",model:"Mustang",price:34000,disble:false}],))

ReactDOM.render(
  <Garage />,
  document.getElementById('root')
);
