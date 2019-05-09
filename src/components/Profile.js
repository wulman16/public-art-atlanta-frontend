import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return(
      <div className="user-info">
        <div className="username">Welcome, {this.props.userName}</div>
        <div className="seen-ratio">Seen: <br/> {this.props.numSeen} / {this.props.numArtworks}</div>
      </div>
    )
  }
}

export default Profile