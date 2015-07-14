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
      finding_partner: false,
      stats: {}
    };

    this.playNewGame = this.playNewGame.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.onMatchFound = this.onMatchFound.bind(this);
    this.onNewStatistics = this.onNewStatistics.bind(this);
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
      actions['match found'].completed.listen(this.onMatchFound),
      actions.getStatistics.completed.listen(this.onNewStatistics)
    ];

    actions.getStatistics();
  }

  onNewStatistics(data) {
    console.debug('Dashboard:onNewStatistics', data);
    this.setState({
      stats: data
    });
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

    let statistics = [];
    if (this.state.stats.games) {
      statistics.push(
        <h2>Dashboard</h2>
      )
      statistics.push(
        <table id="stats_table">
          <tbody>
            <tr>
              <td><strong>Matches played</strong></td>
              <td>{this.state.stats.total_games}</td>
            </tr>
            <tr>
              <td><strong>Games Won</strong></td>
              <td>{this.state.stats.won_games}</td>
            </tr>
            <tr>
              <td><strong>Games Tied</strong></td>
              <td>{this.state.stats.tied_games}</td>
            </tr>
            <tr>
              <td><strong>Games Lost</strong></td>
              <td>{this.state.stats.lost_games}</td>
            </tr>
            <tr>
              <td><strong>Win percentage</strong></td>
              <td>{Math.round(
                ((this.state.stats.won_games / this.state.stats.total_games) * 100)
              )/100}</td>
            </tr>
          </tbody>
        </table>
      );
      statistics.push(
        <h2>Latest Matches</h2>
      );
      let matches_html = [];
      this.state.stats.games.map((game) => {
        let color = 'info';
        let result = 'Tied';
        if (game.winner === UserStore.data.id) {
          color = 'success';
          result = 'Won';
        } else if (game.winner !== 0) {
          color = 'error';
          result = 'Lost';
        }
        matches_html.push(
          <tr className={color}>
            <td>{game.partner.name}</td>
            <td>{game.start_time}</td>
            <td>{result}</td>
            <td>{game.number_of_moves}</td>
          </tr>
        );
      });

      let latest_matches_table = (
        <table id="matches-table">
          <thead>
            <th>VS</th>
            <th>Date</th>
            <th>Result</th>
            <th>Number of moves</th>
          </thead>
          <tbody>
            {matches_html}
          </tbody>
        </table>
          );


      statistics.push(latest_matches_table);
    }
    console.info("WWW", statistics, this.state.stats);

    return (
      <div className="row">
        <div className="row text-center">
          <div className="text-center small-12 columns">
            {statistics}
          </div>
        </div>
        <div className="row text-center">
        {text}
        </div>
      </div>
    );
  }
}


export default Dashboard;
