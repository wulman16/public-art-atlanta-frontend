import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import MapContainer from './MapContainer'
import Profile from './Profile'

const divStyle = {
  position: 'relative',
  height: `75vh`,
  // backgroundColor: `grey`
}

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

  handleLogout = () => {
    localStorage.clear()
    this.props.history.push("/login")
  }

  render() {
    return(
      <Fragment>
        <div style={divStyle}>
          <MapContainer seen={this.props.seen}
              artworks={this.props.artworks}/>
        </div>
        <Profile userId={this.props.userId}
                 userName={this.props.userName}
                 numSeen={this.handleNumSeen(this.props.seen)}
                 numArtworks={this.props.artworks.length}/>
        <button onClick={this.handleClick}>New Artwork</button>
        <Link to="/login" replace onClick={this.props.handleLogout}>Logout</Link>
    </Fragment>
    )
  }
}

export default Header