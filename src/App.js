import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Index from './components/Index'
import New from './components/New'

class App extends Component {
  
  state = {
    user: {
      id: null,
      name: null,
      seen: []
    },
    artworks: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/artworks`)
      .then(response => response.json())
      .then(data => this.setState({
        artworks: data
      }))
  }

  handleLogin = name => {
    fetch(`http://localhost:3000/users/${name}`)
      .then(response => response.json())
      .then(data => this.lookupLogin(data))
  }

  lookupLogin = data => {
    if (data.length > 0) {
      this.setState({
        user: {
          id: data[0].id,
          name: data[0].name,
          seen: data[0].user_artworks.map(ua => ua.artwork_id)
        }
      })} else {
        document.querySelector('.error-message').textContent = `Invalid login credentials!`
    }
  }

  handleSignup = userName => {
    fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName
      })
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          id: data.id,
          name: data.name
        }
      }))
  }

  render() {
    return (
      <Router>
        <Route exact path="/(login|)"
               render={props => (<Login {...props} userId={this.state.user.id}
                                                   userName={this.state.user.name}
                                                   handleLogin={this.handleLogin}
                                                   handleSignup={this.handleSignup} />)} />
        <Route exact path="/index"
               render={props => (<Index {...props} userId={this.state.user.id}
                                                   userName={this.state.user.name}
                                                   seen={this.state.user.seen}
                                                   artworks={this.state.artworks} />)} />
        <Route exact path="/new"
               render={props => (<New {...props} />)} />
      </Router>
    );
  }
}

export default App;
