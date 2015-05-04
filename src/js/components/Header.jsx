'use strict';

import React from 'react';

class Header extends React.Component {
  render() {
    console.debug('Header:render');
    return (
      <nav className="top-bar" data-topbar="" role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#">ConnectFour</a></h1>
          </li>
          <li className="toggle-topbar menu-icon"><a href=""><span>Menu</span></a></li>
        </ul>

        <section className="top-bar-section">
          <ul className="left">
            <li><a href="#/Login">Login</a></li>
            <li><a href="#/Register">Register</a></li>
          </ul>
        </section>
      </nav>
    );
  }
}

export default Header;
