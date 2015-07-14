'use strict';

import React from 'react';

class Landing extends React.Component {
  render() {
    console.debug('Landing:render');
    return (
      <div className="row">
        <div className="small-12">
          <h1>ConnectFour</h1>
          <p> Connect Four is a two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to connect four of one's own discs of the same color next to each other vertically, horizontally, or diagonally before your opponent. </p>
          <h3>Strategy to win Connect Four</h3>
          <p>
            One strategy to win this game is to prepare two chances to connect four discs at once, therefore setting up a double bind. This will consequently lead to the victory, since the player can only avoid one of the two chances.
          </p>
          <p>
            A perfect solution for a Connect4 game with 7 rows is already mathematically proven. Assuming a perfect play and best defense by both players the beginning player will always win by starting with the middle row. The decision to start at any other row will ultimately lead to a draw, if both players play perfect. Therefore it is also possible to play the game with 8 rows, a modus which is not solved mathematically yet.
          </p>

          A further variation of this game is the so called Limetris, which is derived from the game Tetris. If the bottom row is completely filled with discs, it will disappear, making draws impossible.
          <p>

            To put it in a nutshell, Connect 4 is a game which offers a lot of varieties in number of players, size of the grid and rules. Because of this the game won’t get boring after a few matches and is always fun to play with family and friends.
          </p>
        </div>
        <a className="button" href="#/Register">Register now</a> or <a href="/#Login">login with existing account</a>
      </div>
    );
  }
}

export default Landing;
