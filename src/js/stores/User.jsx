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

    actions.login.completed.listen(this.onLogin);
    actions.register.completed.listen(this.onLogin);
    actions.auth.completed.listen(this.onAuth);
    this.authenticate();

    this.access_token = false;
    this.logged_in = false;
    this.data = {};

  },

  onLogin: function(resp) {
    console.debug('UserStore:onLogin', resp);
    if ('error' in resp) {
      return;
    }

    this.access_token = resp.user.access_token;
    this.data = resp.user;
    this.logged_in = true;
  },

  onAuth: function(resp) {
    console.debug('UserStore:onAuth', resp);
    if ('error' in resp) {
      window.location.hash = '#/Login';
    } else {
      this.access_token = Cookies.get('access_token');
      this.logged_in = true;
      this.data = resp.user;
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
    console.debog('UserStore:register', data);
    Http.post('user', data, actions.register.completed,
              actions.register.failed);
  },

  authenticate: function() {
    const access_token = Cookies.get('access_token');
    console.debug('UserStore:authenticate', access_token);
    Http.get('auth/' + access_token,
             actions.auth.completed,
             actions.auth.failed);
  }
});
