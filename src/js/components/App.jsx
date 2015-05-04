'use strict';

import React from 'react';
import Router from 'react-router';

import Header from './Header.jsx';


class App extends React.Component {
  render() {
    console.debug('Rendering App');
    return (
      <div>
        <Header />
        <Router.RouteHandler />
      </div>
    );
  }
}

export default App;
