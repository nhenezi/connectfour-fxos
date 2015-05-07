'use strict';

import React from 'react';
import Router from 'react-router';
import actions from '../actions.js';

import Header from './Header.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
    this.onAuth = this.onAuth.bind(this);
    this.unsubscribers = [];
  }

  onAuth(resp) {
    console.debug('App:onAuth', resp);
  }

  componentDidMount() {
    console.debug('App:componentDidMount');

    this.unsubscribers = [
      actions.auth.completed.listen(this.onAuth)
    ];

    actions.auth();
  }

  componentWillUnmount() {
    this.unsubscribers.map(unsubscribe => unsubscribe());
  }

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
