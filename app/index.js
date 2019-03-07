import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css');
import { HashRouter as Router, Route, Link } from "react-router-dom";
import App from './components/App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();


