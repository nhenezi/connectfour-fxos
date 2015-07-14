'use strict';

import Reflux from 'reflux';
import Cookies from 'cookies-js';
import Utils from '../Utils.js';

import actions from '../actions.js';

const Http = Utils.Http;


var UserStore = Reflux.createStore({
  init: function() {
    this.listenTo(actions.login, 'login');
    this.listenTo(actions.register, 'register');
    this.listenTo(actions.logout, 'logout');
    this.listenTo(actions['find partner'], 'findPartner');

    actions.login.completed.listen(this.onLogin);
    actions.register.completed.listen(this.onLogin);
    actions.auth.completed.listen(this.onAuth);
    this.authenticate();

    this.access_token = false;
    this.logged_in = false;
    this.data = {};
    this.socket = null;
  },

  initializeSocket() {
    console.debug('UserStore:initializeSocket');
    if (!this.socket) {
      this.socket = io();
      this.socket.on('match found', (data) => {
        data.game = JSON.parse(data.game);
        data.partner = JSON.parse(data.partner);
        actions['match found'].completed(data);
      });
      this.socket.on('move', (data) => {
        console.debug('WS:MOVE', data);
        actions.move.completed(data);
      });
      this.socket.on('game over', actions['game over'].completed);
      console.debug('UserStore:initializeSocker Success: Subscribed to events');
    } else {
      console.debug('UserStore:initializeSocket Failed: Socket already initialized');
    }
  },

  findPartner() {
    console.debug('UserStore:findPartner');
    Http.post( 'match/' + this.access_token, {},
              actions['find partner'].completed,
              actions['find partner'].failed);
  },

  onLogin: function(resp) {
    console.debug('UserStore:onLogin', resp);
    if ('error' in resp) {
      return;
    }

    this.access_token = resp.user.access_token;
    this.data = resp.user;
    this.logged_in = true;
    this.initializeSocket();
    console.debug('UserStore:onLogin done');
  },

  onAuth: function(resp) {
    console.debug('UserStore:onAuth', resp);
    if ('error' in resp) {
      console.debug('RR');
      window.location.hash = '#/Login';
    } else {
      this.access_token = Cookies.get('access_token');
      this.logged_in = true;
      this.data = resp.user;
      this.initializeSocket();
    }
  },

  login: function(email, password) {
    const data = {email, password};
    console.debug('UserStore:Login', data);
    Http.post('auth', data, actions.login.completed,
             actions.login.failed);
  },

  logout: function() {
    console.debug('UserStore:logout');
    Cookies.expire('access_token');
    actions.logout.completed();
    window.location.hash = '#/Login';
  },

  register: function(name, email, password) {
    const data = {name, email, password};
    console.debug('UserStore:register', data);
    Http.post('user', data, actions.register.completed,
              actions.register.failed);
  },

  authenticate: function() {
    const access_token = Cookies.get('access_token');
    console.debug('UserStore:authenticate', access_token);
    if (access_token === undefined) {
      actions.auth.completed({
        error: 'No access token'
      });
      return;
    }
    Http.get('auth/' + access_token,
             actions.auth.completed,
             actions.auth.failed);
  }
});

export default UserStore;
