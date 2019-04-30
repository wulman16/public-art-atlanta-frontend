import React, { Component, Fragment } from 'react'
import MapContainer from './MapContainer'
import Profile from './Profile'

class Header extends Component {
  render() {
    return(
      <Fragment>
        <MapContainer seen={this.props.seen}
             artworks={this.props.artworks}/>
        <Profile userId={this.props.userId}
                 userName={this.props.userName}
                 numSeen={this.props.seen.length}
                 numArtworks={this.props.artworks.length}/>
        <button>New Artwork</button>
      </Fragment>
    )
  }
}

export default Header