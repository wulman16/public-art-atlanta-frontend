import React, { Component } from 'react'
import { Redirect } from 'react-router'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

class Login extends Component {
  render() {
    if (this.props.userId) {
      return (<Redirect to="/" />)
    } else {
      return(
        <div className="outer-login-container">
          <div className="middle-login-container">
            <div className="inner-login-container">
              <div className="site-name-container">
                <h1 className="site-name">Public Art Atlanta</h1>
              </div>
              <div className="login-form-container">
                <div className="login-error-message"></div>
                <LoginForm handleLogin={this.props.handleLogin}/>
                <div className="signup-error-message"></div>
                <SignupForm handleSignup={this.props.handleSignup}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Login
