import React, { Component, Fragment } from 'react'
import Map from './Map'
import Profile from './Profile'

class Header extends Component {
  render() {
    return(
      <Fragment>
        <Map seen={this.props.seen}
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