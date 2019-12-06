import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Recent from '../Pages/Recent';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Popular from '../Pages/Popular';
// eslint-disable-next-line import/no-cycle
import Navbar from './Navbar';
import Player from '../Pages/Player';
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
