'use strict';

import React from 'react';


class Login extends React.Component {
  render() {
    console.debug('Login:render');
    return (
      <div className="row">
        <div className="large-12 columns">
          <h3>Login</h3>
          <form>
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
                <a href="#" className="button expand">Login</a>
              </div>
            </div>

            <div className="row hide-for-small-only">
              <div className="small-12 columns">
                <a href="#" className="button">Login</a>
              </div>
            </div>

          </form>
        </div>
      </div>

    );
  }
}

export default Login;
