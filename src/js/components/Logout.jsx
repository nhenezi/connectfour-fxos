'use strict';

import React from 'react';
import actions from '../actions';

class Logout extends React.Component {
  constructor(props) {
    console.debug('Logout:constructor');
    super(props);
  }

  componentDidMount() {
    console.debug('Logout:componentDidMount');
    actions.logout();
  }

  render() {
    console.debug('Logout:render');
    return (
      <div className="row">
        <h3>You have been logged out</h3>
      </div>
    );
  }
}

export default Logout;
