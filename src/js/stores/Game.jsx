'use strict';

import Reflux from 'reflux';
import Utils from '../Utils.js';
import UserStore from './User.jsx';

import actions from '../actions.js';

const Http = Utils.Http;


let GameStore = Reflux.createStore({
  init() {
    this.listenTo(actions.makeMove, this.makeMove);

    this.data = {};
    actions['match found'].completed.listen(this.onMatchFound);
    actions.makeMove.completed.listen(this.onMakeMove);
    actions.move.completed.listen(this.onMakeMove);
  },

  onMatchFound(data) {
    console.debug('GameStore:onMatchFound', data);
    this.data = data;
  },

  onMakeMove(data) {
    console.debug('GameStore:onMakeMove', data);
    this.data.next_move = data.next_move;
  },

  makeMove(column) {
    console.debug('GameStore:makeMove', column);
    if (!this.data.game || !this.data.game.id) {
      console.error('Cannot make move - game.id undefined', this);
      return;
    }

    if (this.data.next_move !== UserStore.data.id) {
      console.error('Not your turn', this, UserStore);
      return;
    }

    Http.post('move/' + this.data.game.id + '/' + UserStore.access_token,
              {move: column}, actions.makeMove.completed,
              actions.makeMove.failed);
  }
});

export default GameStore;
