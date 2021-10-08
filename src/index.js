import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "bootstrap/scss/bootstrap.scss";

ReactDOM.render(
  <BrowserRouter basename="/uppy">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


