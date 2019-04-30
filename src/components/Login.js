import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

class Login extends Component {
  render() {
    if (this.props.userId) {
      return (<Redirect to="/" />)
    } else {
      return(
        <Fragment>
          <h1 className="login-site-name">Public Art Atlanta</h1>
          <div className="login-container">
            <div className="error-message"></div>
            <LoginForm handleLogin={this.props.handleLogin}/>
            <SignupForm handleSignup={this.props.handleSignup}/>
          </div>
        </Fragment>
      )
    }
  }
}

export default Login
