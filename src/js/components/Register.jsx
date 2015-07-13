'use strict';

import React from 'react';

import actions from '../actions.js';

class Register extends React.Component {
  constructor(props) {
    console.debug('Register:constructor', props);
    super(props);
    this.state = {
      valid: true,
      errorMessage: "",
      disabledSubmit: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRegisterComplete = this.onRegisterComplete.bind(this);
  }

  componentDidMount() {
    console.debug('Register:componentDidMount');
    this.unsubscribers = [
      actions.register.completed.listen(this.onRegisterComplete)
    ];
  }

  componentWillUnmount() {
    console.debug('Register:componentWillUnmount');
    this.unsubscribers.map(u => u());
  }


  onRegisterComplete(resp) {
    console.debug('Register:onRegisterComplete', resp);
    if (resp.success === true) {
      window.location.hash = '#/dashboard';
    }
  }

  handleSubmit(e) {
    console.debug('Register:handleSubmit', e);
    e.preventDefault();

    this.setState({
      disabledSubmit: true
    });

    const username = this.refs.username.getDOMNode().value.trim();
    const email = this.refs.email.getDOMNode().value.trim();
    const password = this.refs.password.getDOMNode().value;

    actions.register(username, email, password);
  }

  render() {
    console.debug('Register:render');
    let btn_class = this.state.disabledSubmit ? 'disabled': '';
    btn_class = btn_class + ' button';

    return (
      <div className="row">
        <div className="large-12 columns">
          <h3>Create new account</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="large-12 columns">
                <input type="text"
                  ref='username'
                  placeholder="Enter username..." />
              </div>
            </div>

            <div className="row">
              <div className="large-12 columns">
                <input type="email"
                  ref='email'
                  placeholder="Enter email..." />
              </div>
            </div>

            <div className="row">
              <div className="large-12 columns">
                <input type="password"
                  ref='password' placeholder="Enter password..." />
              </div>
            </div>

            <div className="row show-for-small-only">
              <div className="large-12 columns">
                <input type="submit" className={btn_class + ' expand'} value="Register" />
              </div>
            </div>

            <div className="row hide-for-small-only">
              <div className="small-12 columns">
                <input type="submit" className={btn_class} value="Register" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
