'use strict';

import React from 'react';
import UserStore from '../stores/User.jsx';
import GameStore from '../stores/Game.jsx';

import actions from '../actions.js';

class Dashboard extends React.Component {
  constructor(props) {
    console.debug('Dashboard:constructor', props);
    super(props);

    this.state = {
      finding_partner: false
    };

    this.playNewGame = this.playNewGame.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.onMatchFound = this.onMatchFound.bind(this);
  }

  playNewGame(e) {
    console.debug('Dashboard:playNewGame', e);
    e.preventDefault();

    actions['find partner']();
    this.setState({
      finding_partner: true
    });
  }

  onMatchFound(data) {
    console.debug('Dashboard:onMatchFound', data);
    window.location.hash = '#/Game';
  }

  componentDidMount() {
    console.debug('Dashboard:componentDidMount');

    this.unsubscribers = [
      actions['match found'].completed.listen(this.onMatchFound)
    ];
  }

  componentWillUnmount() {
    console.debug('Dashboard:componentWillUnmount');
    this.unsubscribers.map(u => u());
  }


  cancelSearch(e) {
    console.debug('Dashboard:cancelSearch');
    e.preventDefault();

    this.setState({
      finding_partner: false
    });
  }

  render() {
    console.debug('Dashboard:render');
    let text = this.state.finding_partner ? (
      <button onClick={this.cancelSearch}>
        Searching for match... Click here to cancel
      </button>
    ) : (
        <button onClick={this.playNewGame}>Play new game</button>
    );
    return (
      <div className="row">
        {text}
      </div>
    );
  }
}


export default Dashboard;
