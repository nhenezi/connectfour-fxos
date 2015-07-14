'use strict';

import React from 'react';
import actions from '../actions.js';


class Login extends React.Component {
  constructor(props) {
    console.debug('Login:constructor');
    super(props);

    this.state = {
      valid: true,
      errorMessage: '',
      disabledSubmit: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLoginComplete = this.onLoginComplete.bind(this);
  }

  componentDidMount() {
    console.debug('Login:componentDidMount');
    this.unsubscribers = [
      actions.login.completed.listen(this.onLoginComplete)
    ];
  }

  componentWillUnmount() {
    console.debug('Login:componentWillUnmount');
    this.unsubscribers.map(u => u());
  }



  onLoginComplete(resp) {
    console.debug('Login:onLoginComplete');
    if (resp.success === false) {
      this.setState({
        valid: false,
        errorMessage: resp.error,
        disabledSubmit: false
      });
    } else {
      this.setState({
        valid: true,
        disabledSubmit: false
      });
      window.location.hash = '#/dashboard';
    }
  }

  handleSubmit(e) {
    console.debug('Login:HandleSubmit', e);
    e.preventDefault();

    this.setState({
      disabledSubmit: true
    });

    const email = this.refs.email.getDOMNode().value;
    const password = this.refs.password.getDOMNode().value;

    actions.login(email, password);
  }

  render() {
    console.debug('Login:render');
    let btn_class = this.state.disabledSubmit ? 'disabled' : '';
    btn_class += ' button';

    let error_message = this.state.valid ? '' : (
      <div className="alert alert-danger error">
        {this.state.errorMessage}
      </div>
    );


    return (
      <div className="row">
        <div className="large-12 columns">
          <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
            {error_message}
            <div className="row">
              <div className="large-12 columns">
                <input type="email" ref="email"
                  placeholder="Enter email..." />
              </div>
            </div>

            <div className="row">
              <div className="large-12 columns">
                <input type="password" ref="password"
                  placeholder="Enter password..." />
              </div>
            </div>

            <div className="row show-for-small-only">
              <div className="large-12 columns">
                <input type="submit" className={btn_class + "expand"} value="Login" />
              </div>
            </div>

            <div className="row hide-for-small-only">
              <div className="small-12 columns">
                <input type="submit" className={btn_class} value="Login" />
              </div>
            </div>

          </form>
        </div>
      </div>

    );
  }
}

export default Login;
