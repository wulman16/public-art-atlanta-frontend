import React, { Component } from 'react'

class LoginForm extends Component {

  handleLoginSubmit = event => {
    event.preventDefault()
    this.props.handleLogin(event.target.name.value, event.target.password.value)
  }

  render() {
    return(
      <form onSubmit={e => this.handleLoginSubmit(e)}>
        <label>Login</label>
        <input type="text" placeholder="Username" name="name"></input>
        <input type="password" placeholder="Password" name="password"></input>
        <input type="submit" className="button" />
      </form>
    )
  }
}

export default LoginForm