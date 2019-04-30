import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Index from './components/Index'

class App extends Component {
  
  state = {
    user: {
      id: null,
      name: null,
      seen: []
    },
    artworks: [],
    currentLocation: {
      lat: null,
      lng: null
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/artworks`)
      .then(response => response.json())
      .then(data => this.setState({
        artworks: data,
        filteredArtworks: data
      }))
    // get user's location if geolocation is supported/enabled by browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
      })
    }
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

  handleSort = category => {
    console.log(category)
  }

  render() {
    // handle filter functionality here
    const desiredArtworks = this.state.artworks
    return (
      <Router>
        <Route exact path="/login"
               render={props => (<Login {...props} userId={this.state.user.id}
                                                   userName={this.state.user.name}
                                                   handleLogin={this.handleLogin}
                                                   handleSignup={this.handleSignup} />)} />
        <Route exact path="/(index|)"
               render={props => (<Index {...props} userId={this.state.user.id}
                                                   userName={this.state.user.name}
                                                   seen={this.state.user.seen}
                                                   artworks={desiredArtworks}
                                                   handleSort={this.handleSort} />)} />
      </Router>
    );
  }
}

export default App;
