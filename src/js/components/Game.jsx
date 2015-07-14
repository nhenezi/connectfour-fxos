'use strict';

import React from 'react';
import Konva from 'konva';
import ReactKonva from 'react-konva';
import UserStore from '../stores/User.jsx';

import actions from '../actions.js';

class Game extends React.Component {
  constructor(props) {
    console.debug('Game:constructor');
    super(props);

    this.state = {
      board: [
        [1, 2, 0, 0, 0, 0],
        [1, 2, 0, 0, 0, 0],
        [2, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [2, 1, 2, 0, 0, 0],
        [2, 1, 1, 0, 0, 2],
        [1, 2, 1, 1, 1, 2],
      ]
    };
    this.square = 50;
    this.board_width = 400;
    this.board_height = 300;

    this.getCircles = this.getCircles.bind(this);
  }

  componentDidMount() {
    console.debug('Game:componentDidMount');
  }

  getCircles() {
    const colors = {
      1: 'red',
      2: 'blue'
    };

    let circles = [];
    this.state.board.forEach((column, i) => {
      column.forEach((elem, j) => {
        if (this.state.board[i][j] !== 0) {
          circles.push(<ReactKonva.Circle
            x={i * this.square + 25}
            y={250 - j * this.square + 25}
            radius={20}
            fill={colors[this.state.board[i][j]]} stroke='black' strokeWidth={1}
            >
            </ReactKonva.Circle>);
        }
      });
    });

    return circles;
  }

  render() {
    console.debug('Game:render');

    let vertical_lines = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<ReactKonva.Line
      points={[this.square * i, 0, this.square * i, 300]}
      stroke={'black'} strokeWidth={1}>
    </ReactKonva.Line>));

    let horizontal_lines = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<ReactKonva.Line
      points={[0, this.square * i, 350, this.square * i]}
      stroke={'black'} strokeWidth={1}>
    </ReactKonva.Line>));

    let circles = this.getCircles();

    return (
      <div className="row">
        <div className="row">
          <div className="small-4 columns">Player 1</div>
          <div className="small-4 columns">Player 2</div>
        </div>
        <div className="row" id="game">
          <ReactKonva.Stage height={this.board_height}
            width={this.board_width}>
            <ReactKonva.Layer>
              {vertical_lines}
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
