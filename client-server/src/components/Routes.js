import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recent from '../Pages/Recent';
import Home from '../Pages/Home';
import Popular from '../Pages/Popular';
import MyVideos from '../Pages/MyVideos';
import SearchResults from '../Pages/SearchResults';
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
      <Route path="/my-videos" component={MyVideos} />
      <Route exact path="/" component={Home} />
      <Route path="/Player/:videoId" component={Player} />
      <Route path="/search/:keyword" component={SearchResults} />
    </Router>
  );
};

export default Routes;
