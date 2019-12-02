import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recent from '../Pages/Recent';
import Home from '../Pages/Home';
import Popular from '../Pages/Popular';
import Policy from '../Pages/Policy';
// eslint-disable-next-line import/no-cycle
import Navbar from './Navbar';

export default () => (
  <Router>
    <Navbar />
    <Route path="/popular" component={Popular} />
    <Route path="/recent" component={Recent} />
    <Route path="/privacy-policy" component={Policy} />
    <Route exact path="/" component={Home} />
  </Router>
);
