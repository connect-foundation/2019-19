import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recent from '../Pages/Recent';
import Home from '../Pages/Home';
import Popular from '../Pages/Popular';
import Policy from '../Pages/Policy';
import MyVideos from '../Pages/MyVideos';
// eslint-disable-next-line import/no-cycle
import Navbar from './Navbar';

export default () => (
  <Router>
    <Navbar />
    <Route path="/popular" component={Popular} />
    <Route path="/recent" component={Home} />
    <Route path="/privacy-policy" component={Policy} />
    <Route path="/my-videos" component={MyVideos} />
    <Route exact path="/" component={MyVideos} />
  </Router>
);
