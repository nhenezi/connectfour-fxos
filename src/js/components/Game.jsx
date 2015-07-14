'use strict';

import React from 'react';
import Konva from 'konva';
import ReactKonva from 'react-konva';
import GameStore from '../stores/Game.jsx';
import UserStore from '../stores/User.jsx';

import actions from '../actions.js';

class Game extends React.Component {
  constructor(props) {
    console.debug('Game:constructor');
    super(props);

    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      disabled: GameStore.data.next_move !== UserStore.data.id,
      rect_colors: [
        'white', 'white', 'white', 'white', 'white', 'white', 'white'
      ],
      winner: undefined
    };
    this.square = 50;
    this.board_width = 400;
    this.board_height = 300;

    this.getCircles = this.getCircles.bind(this);
    this.onColumnClick = this.onColumnClick.bind(this);
    this.onColumnEnter = this.onColumnEnter.bind(this);
    this.onColumnLeave = this.onColumnLeave.bind(this);
    this.onCompletedMove = this.onCompletedMove.bind(this);
  }

  componentDidMount() {
    console.debug('Game:componentDidMount');
    this.unsubscribers = [
      actions.makeMove.completed.listen(this.onCompletedMove),
      actions.move.completed.listen(this.onCompletedMove)
    ];

  }

  onCompletedMove(data) {
    console.debug('Game:onCompletedMove', data);
    let updated_state = {
      board: data.board,
      disabled: data.next_move !== UserStore.data.id || data.winning
    };

    if (data.winning) {
      updated_state.winner = data.player_id;
    }

    this.setState(updated_state, () => {
      if (data.winning) {
        $('#game-over-modal').foundation('reveal', 'open');
      }
    });
  }

  componentWillUnmount() {
    console.debug('Game:componentWillUnmount');
    this.unsubscribers.map(u => u());
  }

  getCircles() {
    console.debug('Game:getCircles');

    let getColor = (user_id) => {
      console.debug('getCOLOR', user_id, GameStore.data.game.player_one);
      if (GameStore.data.game.player_one === user_id) {
        return 'red';
      } else {
        return 'blue';
      }
    };

    let circles = [];
    this.state.board.forEach((column, i) => {
      column.forEach((elem, j) => {
        if (this.state.board[i][j] !== 0) {
          circles.push(<ReactKonva.Circle
            x={i * this.square + 25}
            y={250 - j * this.square + 25}
            radius={20}
            fill={getColor(this.state.board[i][j])} stroke='black' strokeWidth={1}
            >
            </ReactKonva.Circle>);
        }
      });
    });

    return circles;
  }

  onColumnClick(e, a) {
    console.log('Game:onColumnClick', e, a);
    if (this.state.disabled) {
      return;
    }

    this.setState({
      disabled: true
    });
    actions.makeMove(e.target.attrs.id);
  }

  onColumnEnter(e) {
    if (this.state.disabled) {
      return;
    }

    let rect_colors = this.state.rect_colors;
    rect_colors[e.target.attrs.id] = '#DDDDDD';
    this.setState({
      rect_colors: rect_colors
    });
  }

  onColumnLeave(e) {
    if (this.state.disabled) {
      return;
    }

    let rect_colors = this.state.rect_colors;
    rect_colors[e.target.attrs.id] = 'white';
    this.setState({
      rect_colors: rect_colors
    });
  }

  render() {
    console.debug('Game:render');

    let vertical_rects = [0, 1, 2, 3, 4, 5, 6].map((i) => (<ReactKonva.Rect
      x={this.square * i} width={50}
      y={0} height={300}
      id={i}
      onClick={this.onColumnClick}
      onMouseEnter={this.onColumnEnter}
      onMouseLeave={this.onColumnLeave}
      fill={this.state.rect_colors[i]}
      stroke={'black'} strokeWidth={1}>
    </ReactKonva.Rect>));
    let double_endlines = [0, 6].map((i) => (<ReactKonva.Line
      points={[this.square * i, 0, this.square * i, 300]}
      stroke='black' strokeWidth={1}
      >
    </ReactKonva.Line>));

    let horizontal_lines = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<ReactKonva.Line
      points={[0, this.square * i, 350, this.square * i]}
      stroke={'grey'} strokeWidth={1}>
    </ReactKonva.Line>));

    let circles = this.getCircles();
    let modal_text = '';
    if (this.state.winner === UserStore.data.id) {
      modal_text = 'You win!';
    } else {
      modal_text = 'You lose! :(';
    }
    let modal = (
      <div id="game-over-modal" className="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
        <h2 id="modalTitle">Game over</h2>
        <p>{modal_text}</p>
        <a className="close-reveal-modal" aria-label="Close">&#215;</a>
      </div>
    );

    return (
      <div className="row">
        {modal}
        <div className="row">
          <div className="small-offset-3 small-3 columns">Player 1</div>
          <div className="small-3 columns">Player 2</div>
        </div>
        <div className="row" id="game">
          <ReactKonva.Stage height={this.board_height}
            width={this.board_width}>
            <ReactKonva.Layer>
              {vertical_rects}
              {double_endlines}
              {horizontal_lines}
              {circles}
            </ReactKonva.Layer>
          </ReactKonva.Stage>
        </div>
      </div>
    );
  }
}

export default Game;
