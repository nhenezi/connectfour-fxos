'use strict';

import React from 'react';


class Dashboard extends React.Component {
  constructor(props) {
    console.debug('Dashboard:constructor', props);
    super(props);

    this.playNewGame = this.playNewGame.bind(this);
  }

  playNewGame(e) {
    console.debug('Dashboard:playNewGame', e);
    e.preventDefault();
  }

  render() {
    console.debug('Dashboard:render');
    return (
      <div className="row">
        <button onClick={this.playNewGame}>Play new game</button>
      </div>
    );
  }
}


export default Dashboard;
