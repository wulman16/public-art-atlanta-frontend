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

  sortByTitle = (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1
    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1
    } else {
      return 0
    }
  }

  getArtistLastName = artwork => {
    return artwork.artist.split(` `).splice(-1)[0].toLowerCase()
  }

  sortByArtist = (a, b) => {
    const artistA = this.getArtistLastName(a)
    const artistB = this.getArtistLastName(b)
    if (artistA < artistB) {
      return -1
    } else if (artistA > artistB) {
      return 1
    } else {
      return 0
    }
  }

  parseYear = artwork => {
    return parseInt(artwork.year.split(`-`).map(text => text.match(/\d+/g))[0])
  }

  sortByYear = (a, b) => {
    const yearA = this.parseYear(a)
    const yearB = this.parseYear(b)
    console.log(yearA)
    if (yearA < yearB) {
      return -1
    } else if (yearA > yearB) {
      return 1
    } else {
      return 0
    }
  }

  handleSort = category => {
    switch (category) {
      case `nearest`:
      // TODO: handle distance functionality
        break
      case `title`:
        this.setState({
          artworks: this.state.artworks.sort((a, b) => this.sortByTitle(a, b))
        })
        break
      case `artist`:
        this.setState({
          artworks: this.state.artworks.sort((a, b) => this.sortByArtist(a, b))
        })
        break
      case `year`:
        this.setState({
          artworks: this.state.artworks.sort((a, b) => this.sortByYear(a, b))
        })
        break
      default:
        console.log(`Invalid category!`)
    }
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
