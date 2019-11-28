import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Recent from '../Pages/RecentPage';
import Login from '../Pages/LoginPage';
import Home from '../Pages/HomePage';
import Popular from '../Pages/PopularPage';
// eslint-disable-next-line import/no-cycle
import Navbar from './Navbar';
import Player from '../Pages/PlayerPage';
import { NavbarContext } from '../contexts/NavbarContext';

const Routes = () => {
  const { showNav } = useContext(NavbarContext);

  return (
    <Router>
      {showNav && <Navbar />}
      <Route path="/Popular" component={Popular} />
      <Route path="/Recent" component={Recent} />
      <Route path="/Login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route path="/Player/:videoId" component={Player} />
    </Router>
  );
};

export default Routes;
