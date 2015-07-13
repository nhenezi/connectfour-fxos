'use strict';

import React from 'react';
import actions from '../actions.js';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.onAuth = this.onAuth.bind(this);
  }

  componentDidMount() {
    console.debug('Header:componentDidMount');

    this.unsubscribers = [
      actions.auth.completed.listen(this.onAuth)
    ];
  }

  onAuth(resp) {
    console.debug('Header:onAuth', resp);
    if (resp.success === true) {
      this.setState({
        loggedIn: true
      });
    }
  }

  componentWillUnmount() {
    console.debug('Header:componentWillUnmount');
    this.unsubscribers.map(u => u());
  }

  render() {
    console.debug('Header:render');

    let menu = this.state.loggedIn ? (
      <ul className="left">
        <li><a href="/#Dashboard">Dashboard</a></li>
        <li><a href="/#/Logout">Logout</a></li>
      </ul>
    ) : (
      <ul className="left">
        <li><a href="#/Login">Login</a></li>
        <li><a href="#/Register">Register</a></li>
      </ul>
    );

    return (
      <nav className="top-bar" data-topbar="" role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#">ConnectFour</a></h1>
          </li>
          <li className="toggle-topbar menu-icon"><a href=""><span>Menu</span></a></li>
        </ul>

        <section className="top-bar-section">
          {menu}
        </section>
      </nav>
    );
  }
}

export default Header;
