import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recent from '../Pages/RecentPage';
import Login from '../Pages/LoginPage';
import Home from '../Pages/HomePage';
import Popular from '../Pages/PopularPage';
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
