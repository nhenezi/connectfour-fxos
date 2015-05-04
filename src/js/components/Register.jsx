'use strict';

import React from 'react';

import actions from '../actions.js';

class Register extends React.Component {
  render() {
    console.debug('Register:render');

    return (
      <div className="row">
        <div className="large-12 columns">
          <h3>Create new account</h3>
          <form>
            <div className="row">
              <div className="large-12 columns">
                <input type="text" placeholder="Enter username..." />
              </div>
            </div>

            <div className="row">
              <div className="large-12 columns">
                <input type="email" placeholder="Enter email..." />
              </div>
            </div>

            <div className="row">
              <div className="large-12 columns">
                <input type="password" placeholder="Enter password..." />
              </div>
            </div>

            <div className="row show-for-small-only">
              <div className="large-12 columns">
                <a href="#" className="button expand">Register</a>
              </div>
            </div>

            <div className="row hide-for-small-only">
              <div className="small-12 columns">
                <a href="#" className="button">Register</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
