import React, { Component } from 'react'

class SignupForm extends Component {

  handleSignupSubmit = event => {
    event.preventDefault()
    this.props.handleSignup(event.target.name.value)
  }

  render() {
    return(
      <form onSubmit={e => this.handleSignupSubmit(e)}>
        <label>Signup</label>
        <input type="text" placeholder="Username" name="name"></input>
        <input type="submit" />
      </form>
    )
  }
}

export default SignupForm