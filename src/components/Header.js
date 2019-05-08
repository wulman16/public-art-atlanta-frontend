import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MapContainer from './MapContainer'
import Profile from './Profile'

// const divStyle = {
//   position: 'relative',
//   height: `75vh`,
//   // backgroundColor: `grey`
// }

class Header extends Component {

  handleClick = () => {
    this.props.openNew()
  }

  handleNumSeen = (seen) => {
    if (seen) {
      return seen.length
    } else {
      return 0
    }
  }

  calculateZoom = () => {
    console.log(window.innerWidth)
    console.log(Math.floor(window.innerWidth * 0.01))
    return Math.floor(window.innerWidth * 0.01)
  }

  render() {
    return(
      <div className="header-container">
        <div className="header-map-container">
          <MapContainer seen={this.props.seen}
              artworks={this.props.artworks}
              zoom={this.calculateZoom()} />
        </div>
        <div className="profile-container">
          <Profile userId={this.props.userId}
                  userName={this.props.userName}
                  numSeen={this.handleNumSeen(this.props.seen)}
                  numArtworks={this.props.artworks.length}/>
          <button onClick={this.handleClick}>New Artwork</button>
          <button onClick={this.props.toggleSort}>Sort and Filter Artworks</button>
          <Link to="/login" replace onClick={this.props.handleLogout}>Logout</Link>
        </div>
    </div>
    )
  }
}

export default Header