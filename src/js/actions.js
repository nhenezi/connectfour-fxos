'use strict';

import Reflux from 'reflux';

const async_actions = [
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
