'use strict';

import Reflux from 'reflux';
import Cookies from 'cookies-js';
import actions from './actions.js';

const base_url = 'http://c4/.lc/';

let Http = Reflux.createStore({
  init: function() {
    actions.login.completed.listen(this.onLogin);
    actions.register.completed.listen(this.onLogin);
    actions.auth.completed.listen(this.onAuth);

    $.ajaxSetup( {
      xhr: function() {
        return new window.XMLHttpRequest( {
          mozSystem: true
        });
      }
    });
  },

  access_token: false,
  authCompleted: false,
  requestQueue: [],

  processRequestQueue: function() {
    // We collect all requests to API until auth is completed
    console.debug("processing request queue", this.requestQueue);
    for (let key in this.requestQueue) {
      this.requestQueue[key]();
    }

    this.requestQueue = [];
  },

  onAuth: function(resp) {
    console.debug('Auth completed', resp);
    this.authCompleted = true;
    if (resp.success === true) {
      this.access_token = Cookies.get('access_token');
    } else {
      window.location.hash = '#/Login';
    }

    this.processRequestQueue();
  },

  onLogin: function(resp) {
    console.debug('Utils resp', resp, resp.s);
    this.authCompleted = true;
    if (resp.success === true) {
      console.debug('Util: Login successful - setting cookie', Cookies);
      Cookies.set('access_token', resp.user.access_token);
      this.access_token = resp.user.access_token;
      this.processRequestQueue();
    }
  },

  post: function(url, data, success, error) {
    let exec = function() {
      if (this.access_token) {
        data.access_token = this.access_token;
      }

      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: base_url + url,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        success: success,
        error: error
      });
    }.bind(this);

    if (this.authCompleted || url.indexOf('login') === 0) {
      exec();
    } else {
      this.requestQueue.push(exec);
    }
  },

  put: function(url, data, success, error) {
    let exec = function() {
      if (this.access_token) {
        data.access_token = this.access_token;
      }

      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: base_url + url,
        type: 'PUT',
        dataType: 'json',
        data: JSON.stringify(data),
        success: success,
        error: error
      });
    }.bind(this);

    if (this.authCompleted || url.indexOf('login') === 0) {
      exec();
    } else {
      this.requestQueue.push(exec);
    }
  },


  get: function(url, success, error) {
    let exec = function() {
      if (this.access_token) {
        let contractor = url.indexOf('?') > -1 ? '&' : '?';
        url += contractor + 'access_token=' + this.access_token;
      }

      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: base_url + url,
        type: 'GET',
        dataType: 'json',
        success: success,
        error: error
      });
    }.bind(this);

    console.debug('GET ', url, this.authCompleted);
    if (this.authCompleted || url.indexOf('auth') === 0 ) {
      console.debug('Executing GET');
      exec();
    } else {
      console.debug('Adding to requestQueue');
      this.requestQueue.push(exec);
    }
  },

  delete: function(url, success, error) {
    let exec = function() {
      if (this.access_token) {
        let contractor = url.indexOf('?') > -1 ? '&' : '?';
        url += contractor + 'access_token=' + this.access_token;
      }

      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: base_url + url,
        type: 'DELETE',
        dataType: 'json',
        success: success,
        error: error
      });
    }.bind(this);

    console.debug('DELETE ', url, this.authCompleted);
    if (this.authCompleted || url.indexOf('auth') === 0 ) {
      console.debug('Executing DELETE');
      exec();
    } else {
      console.debug('Adding to requestQueue');
      this.requestQueue.push(exec);
    }
  }
});

let deepValue = function(obj, path){
  for (let i = 0, path = path.split('.'), len = path.length; i < len; i++){
    obj = obj[path[i]];
  }
  return obj;
};

const Utils = {Http, deepValue};
export default Utils;
