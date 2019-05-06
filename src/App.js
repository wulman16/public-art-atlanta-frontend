import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import Index from './components/Index'
import { createHashHistory } from 'history'

export const history = createHashHistory()

const initialState = {
  user: {
    id: null,
    name: null,
    userArtworks: [],
    seen: []
  },
  artworks: [],
  currentLocation: {
    lat: null,
    lng: null
  },
  filter: `all`,
  seenFilter: `all`
}

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  reset() {
    this.setState(initialState);
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

  handleLogin = (name, password) => {
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user: {name: name, password: password} })
    })
      .then(response => response.json())
      .then(data => this.lookupLogin(data))
  }

  lookupLogin = data => {
    if (data.user) {
      localStorage.setItem(`name`, data.user.name)
      localStorage.setItem(`userId`, data.user.id)
      localStorage.setItem(`token`, data.jwt)
      this.setState({
        user: {
          ...this.state.user,
          userArtworks: this.state.user.userArtworks.concat(data.user.user_artworks),
          seen: this.state.user.seen.concat(data.user.user_artworks.map(ua => ua.artwork_id))
        }
      })
      history.push("/index")
    } else {
        document.querySelector('.login-error-message').textContent = `Invalid login credentials!`
    }
  }

  handleSignup = (userName, password) => {
    fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        password: password
      })
    }).then(response => response.json())
      .then(data => {
      localStorage.setItem(`name`, data.user.name)
      localStorage.setItem(`userId`, data.user.id)
      localStorage.setItem(`token`, data.jwt)
      history.push("/index")
      })
  }

  handleLogout = () => {
    this.reset()
    localStorage.clear()
    this.props.history.push("/login")
  }

  handleSeen = artworkID => {
    if (this.state.user.seen &&
      this.state.user.seen.includes(artworkID)) {
      this.handleRemoveFromSeen(artworkID)
    } else {
      this.handleAddToSeen(artworkID)
    }
  }

  handleAddToSeen = artworkID => {
    fetch(`http://localhost:3000/user_artworks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: localStorage.userId,
        artwork_id: artworkID
      })
    }).then(response => response.json())
      .then(data => this.handleEmptySeen(data))
  }

  handleEmptySeen = data => {
    console.log(data)
    if (this.state.user.seen) {
      this.setState({
        user: {
          ...this.state.user,
          seen: this.state.user.seen.concat([data.artwork_id]),
          userArtworks: this.state.user.userArtworks.concat(data)
        }
      })
    } else {
      this.setState({
        user: {
          ...this.state.user,
          seen: [data.artwork_id],
          userArtworks: [data]
        }
      })
    }
  }

  handleRemoveFromSeen = artworkID => {
    const userArtworkID = this.state.user.userArtworks.find(ua => {
      return ua.artwork_id === artworkID
    }).id
    fetch(`http://localhost:3000/user_artworks/${userArtworkID}`, {
      method: 'DELETE'
    }).then(data => this.setState({
      user: {
        ...this.state.user,
        seen: this.state.user.seen.filter(a => {
          return a !== artworkID
        }),
        userArtworks: this.state.user.userArtworks.filter(ua => {
          return ua.artwork_id !== artworkID
        })
      }
    }))
  }

  getMilesFromCoords = (lat1, lng1, lat2, lng2) => {
    const R = 3958.8 // radius of Earth in miles
    const dLat = this.degreesToRadians(lat2 - lat1)
    const dLng = this.degreesToRadians(lng2 - lng1)
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  degreesToRadians = degrees => {
    return degrees * (Math.PI / 180)
  }

  sortByDistance = (a, b) => {
    let userLat = this.state.currentLocation.lat
    let userLng = this.state.currentLocation.lng
    // use default location if user location is unavailable
    if (userLat === null) {
      userLat = 33.7871877
      userLng = -84.3826425
    }
    const distanceA = this.getMilesFromCoords(a.lat, a.lng, userLat, userLng)
    const distanceB = this.getMilesFromCoords(b.lat, b.lng, userLat, userLng)
    if (distanceA < distanceB) {
      return -1
    } else if (distanceA > distanceB) {
      return 1
    } else {
      return 0
    }
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
        this.setState({
          artworks: this.state.artworks.sort((a, b) => this.sortByDistance(a, b))
        })
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
      case `oldest`:
        this.setState({
          artworks: this.state.artworks.sort((a, b) => this.sortByYear(a, b))
        })
        break
      case `newest`:
        this.setState({
          artworks: this.state.artworks.sort((a, b) => this.sortByYear(a, b)).reverse()
        })
        break  
      default:
        console.log(`Invalid category!`)
    }
  }

  handleFilter = medium => {
    this.setState({
      filter: medium
    })
  }

  handleSeenFilter = option => {
    this.setState({
      seenFilter: option
    })
  }

  handleArtworkSubmit = artwork => {
    fetch(`http://localhost:3000/artworks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(artwork)
    }).then(response => response.json())
      .then(data => this.setState({
        artworks: this.state.artworks.concat(data)
      }))
  }

  render() {
    // handle filtering by medium and seen
    let desiredArtworks
    if (this.state.filter === `all` && this.state.seenFilter === `all`) {
      desiredArtworks = this.state.artworks
    } else if (this.state.seenFilter === `all`) {
      desiredArtworks = this.state.artworks.filter(artwork => {
        return artwork.medium === this.state.filter
      })
    } else if (this.state.filter === `all`) {
      desiredArtworks = this.state.seenFilter === `seen`
        ? this.state.artworks.filter(artwork => {
          return this.state.user.seen.includes(artwork.id)
        })
        : this.state.artworks.filter(artwork => {
          return !this.state.user.seen.includes(artwork.id)
        })
    } else {
      desiredArtworks = (this.state.seenFilter === `seen`
        ? this.state.artworks.filter(artwork => {
          return this.state.user.seen.includes(artwork.id)
        })
        : this.state.artworks.filter(artwork => {
          return !this.state.user.seen.includes(artwork.id)
        })).filter(artwork => {
          return artwork.medium === this.state.filter
        })
    }
    return (
      <Router>
      <Switch>
        <Route exact path="/login"
               render={props => 
                localStorage.getItem(`token`) ? (
                  <Redirect to="/" {...props} />
                ) : (<Login {...props} userId={this.state.user.id}
                                                   userName={this.state.user.name}
                                                   handleLogin={this.handleLogin}
                                                   handleSignup={this.handleSignup} />)} />
        <Route exact path="/(index|)"
               render={props => 
                localStorage.getItem(`token`) ? (<Index {...props} userId={this.state.user.id}
                                                   userName={this.state.user.name}
                                                   seen={this.state.user.seen}
                                                   artworks={desiredArtworks}
                                                   handleSort={this.handleSort}
                                                   handleFilter={this.handleFilter}
                                                   handleSeenFilter={this.handleSeenFilter}
                                                   handleSeen={this.handleSeen}
                                                   handleArtworkSubmit={this.handleArtworkSubmit}
                                                   handleLogout={this.handleLogout} />)
                : (
                  <Redirect to="/login" {...props} />
                )} />
      </Switch>
      </Router>
    )
  }
}

export default App;
