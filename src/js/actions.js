'use strict';

import Reflux from 'reflux';

const async_actions = [
  'register',
  'login',
  'logout',
  'auth',
  'find partner',
  'makeMove',

  // websocket actions
  'move',
  'game over',
  'match found'
];

const actions = [
];

exports = {};
async_actions.map(action => {
  exports[action] = Reflux.createAction({asyncResult: true});
});

actions.map(action => {
  exports[action] = Reflux.createAction();
});

export default exports;
