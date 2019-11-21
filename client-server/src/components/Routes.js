import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recent from '../Pages/Recent';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Popular from '../Pages/Popular';
// eslint-disable-next-line import/no-cycle
import Navbar from './Navbar';

export default () => (
  <Router>
    <Navbar />
    <Route path="/Popular" component={Popular} />
    <Route path="/Recent" component={Recent} />
    <Route path="/Login" />
    <Route exact path="/" component={Home} />
  </Router>
);
