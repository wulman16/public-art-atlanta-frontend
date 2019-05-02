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
      userArtworks: [],
      seen: []
    },
    artworks: [],
    currentLocation: {
      lat: null,
      lng: null
    },
    filter: `all`
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
          userArtworks: data[0].user_artworks,
          seen: data[0].user_artworks.map(ua => ua.artwork_id)
        }
      })} else {
        document.querySelector('.login-error-message').textContent = `Invalid login credentials!`
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

  handleSeen = artworkID => {
    console.log(artworkID)
    if (this.state.user.seen.includes(artworkID)) {
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
        user_id: this.state.user.id,
        artwork_id: artworkID
      })
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          ...this.state.user,
          seen: this.state.user.seen.concat(data.artwork_id),
          userArtworks: this.state.user.userArtworks.concat(data)
        }
      }))
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
          return ua.id !== userArtworkID
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

  render() {
    // handle filtering by medium
    let desiredArtworks
    if (this.state.filter === `all`) {
      desiredArtworks = this.state.artworks
    } else {
      desiredArtworks = this.state.artworks.filter(artwork => {
        return artwork.medium === this.state.filter
      })
    }
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
                                                   handleSort={this.handleSort}
                                                   handleFilter={this.handleFilter}
                                                   handleSeen={this.handleSeen} />)} />
      </Router>
    )
  }
}

export default App;
