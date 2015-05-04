'use strict';

import React from 'react';


class Login extends React.Component {
  render() {
    console.debug('Login:render');
    return (
      <form>
        <p>
          <input type="text" placeholder="Placeholder" required="" />
          <button type="reset">Clear</button>
        </p>
        <p>
          <textarea placeholder="Placeholder in textarea" required=""></textarea>
        </p>
        <p>
          <input type="text" placeholder="Placeholder"
            value="Some written text" required="" />
          <button type="reset">Clear</button>
        </p>
      </form>
    );
  }
}

export default Login;
