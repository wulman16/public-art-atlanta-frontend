import React, { Component, Fragment } from 'react'
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

  render() {
    return(
      <Fragment>
        <div style={divStyle}>
          <MapContainer seen={this.props.seen}
              artworks={this.props.artworks}/>
        </div>
        <Profile userId={this.props.userId}
                 userName={this.props.userName}
                 numSeen={this.props.seen.length}
                 numArtworks={this.props.artworks.length}/>
        <button onClick={this.handleClick}>New Artwork</button>
    </Fragment>
    )
  }
}

export default Header